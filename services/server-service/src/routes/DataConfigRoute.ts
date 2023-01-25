import express from 'express';
import controller from '../controllers/Generic';
import DataConfigModel from '../models/DataConfigModel';

const router = express.Router();

router.get('/', controller.getAll(DataConfigModel));

router.get('/:id', controller.get(DataConfigModel));

router.post('/', controller.create(DataConfigModel));

router.patch(':/id', controller.update(DataConfigModel));

router.delete('/:id', controller.deleteOne(DataConfigModel));

export = router;