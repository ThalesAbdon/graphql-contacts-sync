 import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config as dotenvConfig } from 'dotenv';
import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { ContactEntity } from "../entities/contact.entities";

dotenvConfig({ path: '.env' });
export const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: `${process.env.DATABASE_HOST}`,
    port: Number(`${process.env.DATABASE_PORT}`),
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: [ContactEntity],
    migrations: [join(__dirname, '/../', 'migrations/*{.ts,.js}')],
    autoLoadEntities: true,
    synchronize: false,
    migrationsRun: false,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);