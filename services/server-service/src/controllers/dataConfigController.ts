const DataConfig = require('../schemas/dataConfigSchema');

export const getDataConfigs = async (req: any, res: any) => {
    const dataConfigs = await DataConfig.find({}).sort({ CreatedAt: -1 });
    res.status(200).json(dataConfigs);
};

export const getDataConfig = async (req: any, res: any) => {
    const { id } = req.params;
    const dataConfigs = await DataConfig.findById(id);

    if (!dataConfigs) {
        return res.status(404).json({ error: 'Not found' });
    }

    res.status(200).json(dataConfigs);
};

export const createDataConfig = async (req: any, res: any) => {
    const { name, modules } = req.body;

    try {
        const dataConfig = await DataConfig.create({ name, modules });
        res.status(200).json(dataConfig);
    } catch (error: any) {  
        res.status(400).json({ error: error.message });
    }
};

