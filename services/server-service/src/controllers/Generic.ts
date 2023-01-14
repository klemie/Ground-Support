import { NextFunction, Request, Response } from 'express';
import mongoose, { Document, Model } from 'mongoose';

const create = (model: Model<any>) => async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Create new document for ${model.modelName}`);

    const doc = new model({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });

    try {
        const results = await doc.save();
        res.status(201).json({ results });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getAll = (model: Model<any>, populate?: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Getting all documents for ${model.modelName}`);
    try {
        const results = await model.find<Document>().populate(populate || []);
        console.log(results);
        return res.status(200).json({ results });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};


const get = (model: Model<any>, populate?: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Getting all documents from ${model.modelName} by id`);
    const id = req.params.id;
    try {
        const result = await model
            .findOne<Document>({ _id: id })
            .populate(populate || []);

        if (!result) {
            console.log('Not found');
            return res.status(404).json({ message: `${model.modelName} with ${id} Not found` });
        }
        return res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};

const update = (model: Model<any>, populate?: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Updating documents from ${model.modelName} by id`);

    const id = req.params.id;

    try {
        const result = await model
            .findOne<Document>({ _id: id })
            .populate(populate || []);

        if (!result) {
            console.log('Not found');
            return res.status(404).json({ message: `${model.modelName} with ${id} Not found` });
        }
        result.set(req.body);
        result.save();
        return res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};

const deleteOne = (model: Model<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const results = await model.findByIdAndDelete(id);
        if (!results) {
            res.status(404).json({ message: 'Not Found' });
        }
        res.status(201).json({ message: 'deleted' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default {
    create,
    getAll,
    get,
    update,
    deleteOne
};