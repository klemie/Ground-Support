import express from 'express';
import request from 'request';
import axios from 'axios';

const ENDPOINT = 'http://127.0.0.1:5000/gateway';
const router = express.Router();

const getData = async () => {
    const telemetryResponse = await axios.get(ENDPOINT);
    return telemetryResponse;
};

router.get('/', (req, res) => {
    console.log(ENDPOINT);
    // request(ENDPOINT, (err, response, body) => {
    //     console.log('error', err);
    //     console.log('Response:', response);
    //     console.log('Status Code:', response.statusCode);
    //     console.log('body:', body);
    //     res.send(body);
    // })
});

export = router;