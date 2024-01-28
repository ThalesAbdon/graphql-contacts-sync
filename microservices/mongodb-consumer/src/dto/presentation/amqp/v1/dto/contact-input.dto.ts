export interface MongodbContactInputDTO {
    webhookType: string;
    data: Data[];
  }
  
  export interface Data {
    name: string;
    cellphone: string; 
  }
  