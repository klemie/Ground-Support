import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';

import genericRoute from './routes/genericRoute';
import gatewayRoute from './routes/telemetryDataRoute';
import RocketRoute from './routes/RocketRoute';
import ComponentRoute from './routes/ComponentRoute';
import MissionRoute from './routes/MissionRoute';
import DataConfigRoute from './routes/DataConfigRoute';

const router = express();

// Only change the connection String
mongoose.connect(config.mongo.url, { w: 'majority', retryWrites: true })
    .then(() => {
        Logging.info('Connected to database');
        StartServer();
    })
    .catch((error) => {
        Logging.error('Unable to connect:');
        Logging.error(error);
    });

// on startup create a new database only use this database if in local mode. Check if local database and compare with remote. Prompt a upload option.

const StartServer = () => {
    router.use((req, res, next) => {
        /** Log the req */
        Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the res */
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */
    router.use('/generic', genericRoute);
    router.use('/rocket', RocketRoute);
    router.use('/component', ComponentRoute);
    router.use('/dataConfig', DataConfigRoute);
    router.use('/mission', MissionRoute);
    router.use('/gateway', gatewayRoute);

    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ ping: 'pong' }));

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');

        Logging.error(error);

        res.status(404).json({
            message: error.message
        });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};