import { 
    createContext, 
    PropsWithChildren, 
    useContext, 
    useReducer
} from 'react';
import { 
    IMission,
    IRocketPopulated 
} from './entities';

export interface IActiveMissionContext {
    activeMission: IMission;
    activeMissionDispatch: React.Dispatch<{type: string, payload: any}>;
    rocket: IRocketPopulated;
    rocketDispatch: React.Dispatch<{type: string, payload: any}>;
    logs: string[];
    logsDispatch: React.Dispatch<{type: string, payload: any}>;
}

export const ActiveContext = createContext<IActiveMissionContext>({
    activeMission: {} as IMission,
    activeMissionDispatch: () => null,
    rocket: {} as IRocketPopulated,
    rocketDispatch: () => null,
    logs: [],
    logsDispatch: () => null
});


function rocketReducer(state: IRocketPopulated, action: {type: string, payload: any}) {
    switch (action.type) {
        case 'SET_ROCKET': 
            return action.payload;
        case 'setRocketName':
            return {
                Name: action.payload
            }
        default:
            throw Error(`Unknown action type: ${action.type}`);
    }
}

function missionReducer(state: IMission, action: {type: string, payload: any}) {
    switch (action.type) {
        case 'SET_MISSION': 
            return action.payload;
        case 'setMissionName':
            return {
                Name: action.payload
            }
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
    const [activeMission, activeMissionDispatch] = useReducer(missionReducer, {} as IMission);
    const [logs, logsDispatch] = useReducer(logsReducer, []);
    return(
        <ActiveContext.Provider 
            value={{ 
                activeMission, 
                rocket, 
                logs, 
                rocketDispatch, 
                activeMissionDispatch, 
                logsDispatch 
            }}
        >
            {children}
        </ActiveContext.Provider>
    );
};

export const useActiveMission = () => useContext<IActiveMissionContext>(ActiveContext);
