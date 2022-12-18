import { NextFunction, Request, Response } from 'express';
import mongoose, { Document, Model } from 'mongoose';

const create = (model: Model<any>) => (req: Request, res: Response, next: NextFunction) => {
    console.log(`Create new document for ${model.modelName}`);

    const doc = new model({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });

    return doc
        .save()
        .then((result: any) => res.status(201).json({ result }))
        .catch((error: any) => res.status(500).json({ error }));

};

const getAll = (model: Model<any>, populate?: string[]) => (req: Request, res: Response, next: NextFunction) => {
    console.log(`Getting all documents for ${model.modelName}`);

    model
        .find<Document>()
        .populate(populate || [])
        .then((results) => {
            console.log(results);
            return res.status(200).json({ results });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ error });
        });
};


const get = (model: Model<any>, populate?: string[]) => (req: Request, res: Response, next: NextFunction) => {
    console.log(`Getting all documents from ${model.modelName} by id`);

    const id = req.params.id;

    model
        .findOne<Document>({ _id: id })
        .populate(populate || [])
        .then((results) => {
            if (results) {
                console.log(results);
                return res.status(200).json({ results });
            } else {
                console.log('Not found');
                return res.status(404).json({ message: 'Not found lmao' });
            }
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ error });
        });
};

const update = (model: Model<any>, populate?: string[]) => (req: Request, res: Response, next: NextFunction) => {
    console.log(`Updating documents from ${model.modelName} by id`);

    const id = req.params.id;

    model
        .findOne<Document>({ _id: id })
        .populate(populate || [])
        .then((result) => {
            if (result) {
                result.set(req.body);
                return result.save().then((result) => {
                    console.log(result);
                    return res.status(200).json({ result })
                });

            } else {
                console.log('Not found');
                return res.status(404).json({ message: 'Not found lmao' });
            }
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ error });
        });
};

const deleteOne = (model: Model<any>) => (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    return model.findByIdAndDelete(id)
        .then((results) => (results ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not Found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default {
    create,
    getAll,
    get,
    update,
    deleteOne
};