import DataConfigModel from "../models/DataConfigModel"

const retrieveDataConfig = async (id: string) => {
    try {
        const dataConfig = await DataConfigModel.findById(id);
        return dataConfig;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const FieldDataConstructor = (dataConfigId: string) => {
    const dataConfig = retrieveDataConfig(dataConfigId);
    // loop through data config and construct a fieldData entity.
}