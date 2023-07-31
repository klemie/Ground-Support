import axios from 'axios';
import { IRocketPopulated, IMissionPopulation, IDataConfig, IRocket, IComponentPopulated } from '../utils/entities';

const api = axios.create({
    baseURL: 'http://127.0.0.1:9090'
});


// Rocket CRUD
export async function getRockets(): Promise<IRocketPopulated[]> {
    const response = await api.get('/rockets');
    return response.data;
}

export async function getRocket(id: string): Promise<IRocketPopulated> {
    const response = await api.get(`/rockets/${id}`);
    return response.data;
}

export async function createRocket(payload: IRocket): Promise<IRocket> {
    const response = await api.post('/rockets', payload);
    return response.data;
}

export async function updateRocket(id: string, payload: IRocket): Promise<IRocket> {
    const response = await api.patch(`/rockets/${id}`, payload);
    return response.data;
}

export async function deleteRocket(id: string): Promise<IRocket> {
    const response = await api.delete(`/rockets/${id}`);
    return response.data;
}

// Mission CRUD
export async function getMissions(): Promise<IMissionPopulation[]> {
    const response = await api.get('/missions');
    return response.data;
}

export async function getMission(id: string): Promise<IMissionPopulation> {
    const response = await api.get(`/missions/${id}`);
    return response.data;
}

export async function createMission(payload: IMissionPopulation): Promise<IMissionPopulation> {
    const response = await api.post('/missions', payload);
    return response.data;
}

export async function updateMission(id: string, payload: IMissionPopulation): Promise<IMissionPopulation> {
    const response = await api.patch(`/missions/${id}`, payload);
    return response.data;
}

// Component CRUD
export async function getComponents(): Promise<IComponentPopulated[]> {
    const response = await api.get('/components');
    return response.data;
}

export async function getComponent(id: string): Promise<IComponentPopulated> {
    const response = await api.get(`/components/${id}`);
    return response.data;
}

export async function createComponent(payload: IComponentPopulated, rocketId: string): Promise<IComponentPopulated> {
    const response = await api.post('/components', payload);
    const componentId = response.data._id;

    //attach to rocket
    const rocketResponse = await api.patch(`/rockets/${rocketId}`, { Components: [componentId] });
    return response.data;
}

export async function updateComponent(id: string, payload: IComponentPopulated): Promise<IComponentPopulated> {
    const response = await api.patch(`/components/${id}`, payload);
    return response.data;
}



// DataConfig CRUD
export async function getDataConfigs(): Promise<IDataConfig[]> {
    const response = await api.get('/dataconfig');
    return response.data;
}

export async function getDataConfig(id: string): Promise<IDataConfig> {
    const response = await api.get(`/dataconfig/${id}`);
    return response.data;
}