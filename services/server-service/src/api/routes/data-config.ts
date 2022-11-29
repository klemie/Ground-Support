const express = require('express');
import {
    getDataConfigs,
    getDataConfig,
    createDataConfig
} from '../../controllers/dataConfigController';

const router = express.Router();

// GET all data config 
router.get('/', getDataConfigs);

// GET single data config 
router.get('/:id', getDataConfig);

// POST new data config
router.post('/', createDataConfig);

// DELETE a data config
router.delete('/:id', (req:any, res:any) => {
    res.json({ message: 'DELETE a single data config' });
});

// UPDATE a data config
router.patch('/:id', (req:any, res:any) => {
    res.json({ message: 'PATCH a single data config' });
});

export {};
module.exports = router;