import express from 'express';

const gateway = express();

gateway.listen(3000, () => {
    console.log("listing on port 3000");
});

gateway.get('/', (req, res) => {
    res.send('Hello World');
});
