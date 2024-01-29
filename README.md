# GRAPHQL CONTACTS SYNC

## Descrição

O objetivo é desenvolver uma solução que capture um ou mais contatos de celulares através de uma API REST e posteriormente integre esses dados a dois bancos de dados distintos, um utilizando a tecnologia SQL e o outro utilizando a abordagem NoSQL.

## Conteúdo
- [Desafio](#desafio)
    - 1.1 [Input](#input)
    - 1.2 [API](#api)
    - 1.3 [Clientes](#clientes)
        - 1.3.1 [Macapá](#macapá)
        - 1.3.2 [Varejão](#varejão)
- [Arquitetura](#arquitetura)
    - 1.1 [Microservices](#microservices)
      - 1.1.1 [graphql-auth](#graphql-auth)
      - 1.1.2 [mongodb-consumer](#mongodb-consumer)
      - 1.1.3 [mysql-consumer](#mysql-consumer)
    - 1.2 [Fluxo](#fluxo)
- [Instalação e Execução](#instalação-e-execução)
- [Testes da API](#testes-da-api)

## Desafio

O desafio é receber contatos de celulares via API e inseri-los nos bancos de dados de dois clientes, Macapá e Varejão. O fluxo inclui a autenticação via token JWT, a validação do cliente, e a inserção seguindo regras específicas.

### Input
  - A API GraphQL recebe dados de usuário (nome e celular).
  
  - Autenticação do cliente é feita por token JWT no Authorization Header.
  
  - O contato é inserido no banco de dados do cliente Macapá ou Varejão, conforme especificado.

### API
  - A API GraphQL recebe dados de usuário (nome e celular).
  
  - Autenticação do cliente é feita por token JWT no Authorization Header.
  
  - O contato é inserido no banco de dados do cliente Macapá ou Varejão, conforme especificado.

### CLIENTES
  - A API GraphQL recebe dados de usuário (nome e celular).
  
  - Autenticação do cliente é feita por token JWT no Authorization Header.
  
  - O contato é inserido no banco de dados do cliente Macapá ou Varejão, conforme especificado.  

#### Macapá
  - Banco: MySQL.
  - Nome em maiúsculas.
  - Formato de telefone: +55 (41) 93030-6905.
  - SQL de criação da tabela em anexo.

#### Varejão
  - Banco: MongoDB.
  - Nome em qualquer formato.
  - Formato de telefone: 554130306905.
  - SQL de criação da tabela em anexo.

## Arquitetura
![Desenho da Arquitetura](https://raw.githubusercontent.com/ThalesAbdon/graphql-contacts-sync/3acbf705c9d4847396e2ed8c0f119c30bbcdb07b/images/arc.svg)

Utilizei Rabbitmq para atuar como __Message broker__ . Garantindo assim assíncronicidade, pois caso algum serviço de __consumer__ esteja fora do ar, mesmo assim será possível consumir os dados enviados pois estarão salvos na fila, evitando assim perda de dados.

Optei por desenvolver 3 microservices: 
  - graphql-auth
  - mongodb-consumer
  - mysql-consumer

  #### graphql-auth
  - Responsável por autenticar(JWT),verificar dados e enviar uma mensagem para fila.


  #### mongodb-consumer
  - Responsável por consumir, e armazenar os contatos no banco: 
  __MONGODB__.

  #### mysql-consumer
  - Responsável por consumir, tratar os dados dos contatos e armazená-los no banco: __MYSQL__.

### Fluxo
  - O User faz uma solicitação para nossa API GraphQL 
  
  - A API GraphQL recebe os dados do usuário (nome,celular e email. __Email é um campo opcional__).
  
  - A API Graphql possui 2 Mutations, uma para cada consumer. 
  
  - Nossa Fila recebe a mensagem
  
  - As microservices de __consumer__ consomem as mensagens e armazenam nos respectivos Bancos. 

## Instalação e Execução

 Para instalar o projeto é simples:
 
### 1. Clonar o Repositório

Clone o repositório do GitHub para sua máquina local:

```bash
git clone https://github.com/ThalesAbdon/graphql-contacts-sync.git
```

### 2. Instalar Dependências
Acesse a pasta root
```
cd graphql-contacts-sync
```
Execute o comando:
```
npm install
```
### 3. Configurar Variáveis de Ambiente
Verifique as variavéis de ambiente no arquivo
```
.env
```
### 4. Execute o script do Docker
Converta o arquivo da pasta script em executavél com o seguinte comando:
```
chmod +x ./scripts/docker.sh
```
### 5. Execute as migrations do TypeORM
```
npm run migration:run
```
### 6. Execute os microservices
```
npm run start:dev:all
```
### 7. Testar a API GraphQL
Abra um navegador ou utilize uma ferramenta como Insomnia ou Postman para testar a API GraphQL. 
```
http://localhost:3000/graphql
```
### 8. Parar o Servidor
Ao terminar, pare o servidor pressionando Ctrl + C no terminal.

## Testes da API

### Token
É necessário utilizar um token.
Exemplo de token
```
{"authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.Bg_lfwDuPP4Q7Sa3ltXzEGo1XdNLYoIKvDZm3TCg9L0"}
```

Para gerar um novo token, acesse:
[https://jwt.io/](https://jwt.io/)

Após isso, cole a string da nossa JWT_SECRET,
que está dentro do arquivo .env.

No site, apague as chaves sub e name que estão dentro do Payload na área de Decoded, sobrando assim o iat.

tenha certeza de apagar o que está dentro do field na área de VERIFY SIGNATURE: your-256-bit-secret.
cole a nossa string da JWT_SECRET, Você terá algo assim:
![auth](https://raw.githubusercontent.com/ThalesAbdon/graphql-contacts-sync/main/images/jwt.png)

Agora basta copiar o que foi gerado na área de Encoded e usar no headers.

### Mutation sendContactsMongodb
Exemplo de Input válido:
```
mutation {
  sendContactsMongodb(
    input: { contacts: [{
            name: "Marina Rodrigues",
            cellphone: "5541396941919"
        },
        {
            name: "Nicolas Rodrigues",
            cellphone: "5541334122723"
        },
        {
            name: "Davi Lucca Rocha",
            cellphone: "5541979210400"
        },] }
  ) {
    ... on ContactsResponseOutput {
      valid {
        name
        cellphone
        email
      }
      invalid {
        name
        cellphone
        email
      }
    }
  }
}
```

### Mutation sendContactsMysql
```
mutation {
  sendContactsMysql(
    input: { contacts: [{
            name: "Marina Rodrigues",
            cellphone: "5541396941919"
        },
        {
            name: "Nicolas Rodrigues",
            cellphone: "5541334122723"
        },
        {
            name: "Davi Lucca Rocha",
            cellphone: "5541979210400"
        },] }
  ) {
    ... on ContactsResponseOutput {
      valid {
        name
        cellphone
        email
      }
      invalid {
        name
        cellphone
        email
      }
    }
  }
}
```
