import express from 'express';
import controller from '../controllers/Generic';
import MissionModel from '../models/MissionModel';

const router = express.Router();

// GET all data config 
router.get('/', controller.getAll(MissionModel));

// GET single data config 
router.get('/:id', controller.get(MissionModel));

// POST new data config
router.post('/', controller.create(MissionModel));

// UPDATE a data config
router.patch('/:id', controller.update(MissionModel));

// DELETE a data config
router.delete('/:id', controller.deleteOne(MissionModel));

export = router;