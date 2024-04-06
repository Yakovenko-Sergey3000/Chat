import Knex from 'knex';
import {CONFIG} from "../config/env.config.mjs";
export const DB = new Knex({
    client: 'pg',
    connection: {
        user: CONFIG.DB_USER,
        password: CONFIG.DB_PASSWORD,
        host: CONFIG.DB_HOST,
        port: CONFIG.DB_PORT,
        database: CONFIG.DB_DATABASE
    }
})