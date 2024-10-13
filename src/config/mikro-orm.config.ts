import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import * as dotenv from 'dotenv';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

dotenv.config();

const mikroOrmConfig: Options = {
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    driver: PostgreSqlDriver,
    dbName: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    metadataProvider: TsMorphMetadataProvider,
    entities: ['./dist/**/*.entity.js'],
    entitiesTs: ['./src/**/*.entity.ts'],

    // entities: [Contact, Account],
    // entitiesTs: [Contact, Account],

    /** TODO
    * - Check and adjust the relative path for entities, according to the environment:
    * - Use 'entities' with the.js file path for the production environment(after transpilation).
    * -  Use 'entitiesTs' with the.ts file path for the development environment(before transpilation).
    */

    extensions: [
        Migrator,
    ],
    migrations: {
        path: './dist/migrations',
        pathTs: './src/migrations',
    },


};



export default mikroOrmConfig;