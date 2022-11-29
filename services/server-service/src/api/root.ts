require('dotenv').config();
const express = require('express');

//import endpoints here
const dataConfigs = require('./routes/data-config');
const missions = require('./routes/mission')
const base = require('./routes/')
const server = express();

//middleware
server.use(express.json());

server.use((req: any, res: any, next: Function) => {
    console.log(req.path, req.method);
    next();
});

// Routes (must be imported)
server.use('/api/missions', missions);
server.use('/api/dataConfigs', dataConfigs);

server.listen(5000, () => {
    console.log("listing on port 5000");
});

export {};