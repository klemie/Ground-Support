import express from 'express';
import controller from '../controllers/Generic';
import { RocketSimModel } from '../models/RocketSimModel'; 

const router = express.Router();

// GET all data config 
router.get('/', controller.getAll(RocketSimModel));

// GET single data config 
router.get('/:id', controller.get(RocketSimModel));

// POST new data config
router.post('/', controller.create(RocketSimModel));

// UPDATE a data config
router.patch('/:id', controller.update(RocketSimModel));

// DELETE a data config
router.delete('/:id', controller.deleteOne(RocketSimModel));

export = router;