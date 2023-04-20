import express from 'express';
import controller from '../controllers/Generic';
import GenericModel from '../models/GenericModel';

const router = express.Router();

// GET all data config 
router.get('/', controller.getAll(GenericModel));

// GET single data config 
router.get('/:id', controller.get(GenericModel));

// POST new data config
router.post('/', controller.create(GenericModel));

// UPDATE a data config
router.patch('/:id', controller.update(GenericModel));

// DELETE a data config
router.delete('/:id', controller.deleteOne(GenericModel));

export = router;
