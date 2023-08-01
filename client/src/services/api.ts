import axios from 'axios';
import {
    IRocketPopulated,
    IMissionPopulation,
    IDataConfig,
    IRocket,
    IComponentPopulated,
    IComponent
} from '../utils/entities';

const api = axios.create({
    baseURL: 'http://127.0.0.1:9090'
});

/**
* --------------------------------------------------------
* |                      Rocket CRUD                     |
* -------------------------------------------------------- 
*/

/**
 * @returns All rockets
 * 
 * @description Gets all rockets
 */
export async function getRockets(): Promise<IRocketPopulated[]> {
    const response = await api.get('/rockets');
    return response.data;
}

/**
 * @param id Id of a rocket
 * @returns The rocket
 */
export async function getRocket(id: string): Promise<IRocketPopulated> {
    const response = await api.get(`/rockets/${id}`);
    return response.data;
}

/**
 * @param payload The rocket to create type IRocket
 * @returns The created rocket
 * 
 * @description Creates a rocket
 */
export async function createRocket(payload: IRocket): Promise<IRocket> {
    const response = await api.post('/rockets', payload);
    return response.data;
}

/**
 * @param id Id of a rocket
 * @param payload The rocket to update type IRocket
 * @returns The updated rocket
 */
export async function updateRocket(id: string, payload: IRocket): Promise<IRocket> {
    const response = await api.patch(`/rockets/${id}`, payload);
    return response.data;
}
/**
 * @param id Id of a rocket
 * @returns The deleted rocket
 * 
 * @description Deletes a rocket
 */
export async function deleteRocket(id: string): Promise<IRocket> {
    const response = await api.delete(`/rockets/${id}`);
    return response.data;
}

/**
* --------------------------------------------------------
* |                     Mission CRUD                     |
* -------------------------------------------------------- 
*/

/**
 * @returns All missions
 * 
 * @description Gets all missions
 */
export async function getMissions(): Promise<IMissionPopulation[]> {
    const response = await api.get('/missions');
    return response.data;
}

/**
 * @param id Id of a mission
 * @returns The mission
 */
export async function getMission(id: string): Promise<IMissionPopulation> {
    const response = await api.get(`/missions/${id}`);
    return response.data;
}

/**
 * @param payload The mission to create type IMissionPopulation
 * @returns The created mission
 */
export async function createMission(payload: IMissionPopulation): Promise<IMissionPopulation> {
    const response = await api.post('/missions', payload);
    return response.data;
}

/**
 * @param id Id of a mission
 * @param payload The mission to update type IMissionPopulation
 * @returns The updated mission
 */
export async function updateMission(id: string, payload: IMissionPopulation): Promise<IMissionPopulation> {
    const response = await api.patch(`/missions/${id}`, payload);
    return response.data;
}

/**
 * @param id Id of a mission
 * @returns The deleted mission
 */
export async function deleteMission(id: string): Promise<IMissionPopulation> {
    const response = await api.delete(`/missions/${id}`);
    return response.data;
}

/**
* --------------------------------------------------------
* |                   Component CRUD                     |
* -------------------------------------------------------- 
*/

/**
 * @returns All components
 * 
 * @description Gets all components
 */
export async function getComponents(): Promise<IComponentPopulated[]> {
    const response = await api.get('/components');
    return response.data;
}

/**
 * @param id Id of a component
 * @returns The component
 * 
 * @description Gets a component by id
 */
export async function getComponent(id: string): Promise<IComponentPopulated> {
    const response = await api.get(`/components/${id}`);
    return response.data;
}

/**
 * @param payload The component to create type IComponent
 * @param rocketId The id of the rocket to attach the component to
 * @returns The created component
 * 
 * @description Creates a component and attaches it to a rocket if rocketId is provided
 */
export async function createComponent(payload: IComponent, rocketId?: string): Promise<IComponent> {
    const response = await api.post('/components', payload);
    const componentId = response.data._id;
    const rId = rocketId ? rocketId : ''; 

    //attach to rocket
    if (rId !== '') {
        await api.patch(`/rockets/${rId}`, { Components: [componentId] });
    }

    return response.data;
}

/**
 * @param id Id of a component
 * @param payload The component to update type IComponent
 * @returns The deleted component
 */
export async function updateComponent(id: string, payload: IComponent): Promise<IComponent> {
    const response = await api.patch(`/components/${id}`, payload);
    return response.data;
}

export async function deleteComponent(id: string, rocket?: IRocket): Promise<IComponent> {
    const response = await api.delete(`/components/${id}`);
    const r = rocket ? rocket : {} as IRocket;

    // remove component from rocket
    const rocketComponentList: string[] = r.Components.filter((cId, idx, arr) => {
        if (cId === id) {
            arr.splice(idx, 1);
            return true;
        } 
        return false;
    });

    // detach from rocket
    if (r !== {} as IRocket) {
        await api.patch(`/rockets/${r._id}`, { Components: rocketComponentList });
    }
    return response.data;
}

/**
* --------------------------------------------------------
* |                  DataConfig CRUD                     |
* -------------------------------------------------------- 
*/

/**
 * @returns All data configs
 * 
 * @description Gets all data configs
 */
export async function getDataConfigs(): Promise<IDataConfig[]> {
    const response = await api.get('/dataconfig');
    return response.data;
}

/**
 * @param id Id of a data config
 * @returns The data config
 * 
 * @description Gets a data config by id
 */
export async function getDataConfig(id: string): Promise<IDataConfig> {
    const response = await api.get(`/dataconfig/${id}`);
    return response.data;
}

/**
 * @param payload The data config to create type IDataConfig
 * @param componentId The id of the component to attach the data config to
 * @returns The created data config
 * 
 * @description Creates a data config and attaches it to a component if componentId is provided
 */
export async function createDataConfig(payload: IDataConfig, componentId?: string): Promise<IDataConfig> {
    const response = await api.post('/dataconfig', payload);
    const dataConfigId = response.data._id;
    const cId = componentId ? componentId : '';

    //attach to component
    if (cId !== '') {
        await api.patch(`/components/${cId}`, { DataConfig: [dataConfigId] });
    }
    return response.data;
}

/**
 * 
 * @param id Id of a data config
 * @param payload The data config to update
 * @returns The updated data config
 */
export async function updateDataConfig(id: string, payload: IDataConfig): Promise<IDataConfig> {
    const response = await api.patch(`/dataconfig/${id}`, payload);
    return response.data;
}

/**
 * @param id Id of a data config
 * @returns The deleted data config
 * 
 * @description Deletes a data config
 */
export async function deleteDataConfig(id: string, componentId: string): Promise<IDataConfig> {
    const response = await api.delete(`/dataconfig/${id}`);
    const cId = componentId ? componentId : '';;

    // remove data config from component
    if (cId !== '') {
        await api.patch(`/components/${cId}`, { DataConfig: [] });
    }

    return response.data;
}