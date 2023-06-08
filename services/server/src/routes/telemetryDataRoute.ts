import express from 'express';
import controller from '../controllers/Generic';
import TelemetryData from '../models/TelemetryData';

const router = express.Router();

// GET all data config 
router.get('/', controller.getAll(TelemetryData));

// GET single data config 
router.get('/:id', controller.get(TelemetryData));

// POST new data config
router.post('/', controller.create(TelemetryData));

export = router;