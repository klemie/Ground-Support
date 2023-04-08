import express from 'express';
import controller from '../controllers/Generic';
import ComponentModel from '../models/ComponentModel';

const router = express.Router();

// GET all data config 
router.get('/', controller.getAll(ComponentModel));

// GET single data config 
router.get('/:id', controller.get(ComponentModel));

// POST new data config
router.post('/', controller.create(ComponentModel));

// UPDATE a data config
router.patch('/:id', controller.update(ComponentModel));

// DELETE a data config
router.delete('/:id', controller.deleteOne(ComponentModel));

export = router;
