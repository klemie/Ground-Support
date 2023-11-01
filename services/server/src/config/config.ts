import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_DB_STRING = process.env.MONGO_DB_STRING || '';
const MONGO_LOCAL = process.env.MONOG_LOCAL || 'True';

const Local_DB = (MONGO_LOCAL == 'True');

const MONGO_URL_REMOTE = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@groundsupport.${MONGO_DB_STRING}.mongodb.net/`;
const MONGO_URL_LOCAL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@db:27017/${MONGO_DB_STRING}?authSource=admin`;
const MONGO_URL = Local_DB ? MONGO_URL_LOCAL : MONGO_URL_REMOTE

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};