const express = require('express');
const router = express.Router();
const Mission = require("../../schemas/missionSchema");
// GET all mission 
router.get('/', (req:any, res:any) => {
    res.json({ message: 'GET all missions' });
});

// GET single mission 
router.get('/:id', (req:any, res:any) => {
    res.json({ message: 'GET a single missions' });
});

// POST new mission
router.post('/', async (req:any, res:any) => {
    const { name, dataConfigId } = req.body
    try {
        const mission = await Mission.create({
            Name: name,
            // Coordinates: coordinates,
            DataConfigId: dataConfigId
        });
        await mission.save();
        res.status(200).json(mission)
    } catch (err: any) {
        res.status(400).json({ error: err.message })
    }
});

// DELETE a mission
router.delete('/:id', (req:any, res:any) => {
    res.json({ message: 'DELETE a single missions' });
});

// UPDATE a mission
router.patch('/:id', (req:any, res:any) => {
    res.json({ message: 'PATCH a single missions' });
});

export {};
module.exports = router;