import express from 'express';
// import fileUpload from 'express-fileUpload';

const router = express.Router();

router.get('/uploadFile', (req: any, res: any) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err: any) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        res.json({ filename: file.name, filePath: `/uploads/${file.name}` });
    });

});

export = router;