import {config} from "dotenv"; config()
import Knex from 'knex';
export const DB = new Knex({
    client: 'pg',
    connection: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
    }
})