import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';

const router = express();

// Only change the connection String
mongoose.connect(config.mongo.url, { w: 'majority', retryWrites: true })
    .then(() => {
        console.log('connected')
    })
    .catch((error) => {
        console.log(error)
    });

// on startup create a new database only use this database if in local mode. Check if local database and compare with remote. Prompt a upload option.