import { 
    createContext, 
    PropsWithChildren, 
    useContext, 
    useReducer
} from 'react';
import { 
    IMission,
    IMissionPopulated,
    IRocketPopulated 
} from './entities';

export interface IActiveMissionContext {
    activeMission: IMission;
    updateMission: (payload: IMissionPopulated | IMission) => void;
    rocket: IRocketPopulated;
    updateRocket: (payload: IRocketPopulated) => void;
    logs: string[];
    updateLogs: (payload: string) => void;
}

export const ActiveContext = createContext<IActiveMissionContext>({
    activeMission: {} as IMission,
    updateMission: (payload: IMissionPopulated | IMission) => null,
    rocket: {} as IRocketPopulated,
    updateRocket: (payload: IRocketPopulated) => null,
    logs: [],
    updateLogs: (payload: string) => null
});

function rocketReducer(state: IRocketPopulated, action: {type: string, payload: any}) {
    switch (action.type) {
        case 'SET_ROCKET': 
            return action.payload;
        default:
            throw Error(`Unknown action type: ${action.type}`);
    }
}

function missionReducer(state: IMissionPopulated | IMission, action: {type: string, payload: any}) {
    switch (action.type) {
        case 'SET_MISSION': 
            return action.payload;
        default:
            throw Error(`Unknown action type: ${action.type}`);
    }
}

function logsReducer(state: string[], action: {type: string, payload: any}) {
    switch (action.type) {
        case 'addLog':
            return [...state, action.payload];
        default:
            throw Error(`Unknown action type: ${action.type}`);
    }
}

export const ActiveMissionProvider = ({ children }: PropsWithChildren<any>) => {
    const [rocket, rocketDispatch] = useReducer(rocketReducer, {} as IRocketPopulated);
    const [activeMission, activeMissionDispatch] = useReducer(missionReducer, {} as IMissionPopulated);
    const [logs, logsDispatch] = useReducer(logsReducer, []);

    const updateLogs = (log: string) => {
        logsDispatch({type: 'addLog', payload: log});
    }

    const updateRocket = (rocket: IRocketPopulated) => {
        rocketDispatch({type: 'SET_ROCKET', payload: rocket});
    }

    const updateMission = (mission: IMissionPopulated | IMission) => {
        activeMissionDispatch({type: 'SET_MISSION', payload: mission});
    }

    return(
        <ActiveContext.Provider 
            value={{ 
                activeMission, 
                rocket, 
                logs, 
                updateRocket,
                updateMission,
                updateLogs
            }}
        >
            {children}
        </ActiveContext.Provider>
    );
};

export const useActiveMission = () => useContext<IActiveMissionContext>(ActiveContext);