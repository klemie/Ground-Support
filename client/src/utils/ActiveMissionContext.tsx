import { 
    createContext, 
    PropsWithChildren, 
    useContext, 
    useState 
} from 'react';
import { 
    IMissionPopulated, 
    IRocketPopulated 
} from './entities';

export interface IActiveMissionContext {
    rocketId?: string;
    missionId?: string;
    activeMission: IMissionPopulated;
    rocket: IRocketPopulated;
    logs: string[];
}

export const Context = createContext<IActiveMissionContext>({
    rocketId: undefined as string | undefined,
    missionId: undefined as string | undefined,
    activeMission: {} as IMissionPopulated,
    rocket: {} as IRocketPopulated,
    logs: []
});

export const ActiveMissionProvider = (props: PropsWithChildren<any>) => {
    const [rocketId, setRocketId] = useState<string>();
    const [missionId, setMissionId] = useState<string>();
    const [activeMission, setActiveMission] = useState<IMissionPopulated>({} as IMissionPopulated);
    const [rocket, setRocket] = useState<IRocketPopulated>({} as IRocketPopulated);
    const [logs, setLogs] = useState<string[]>([]);
    return(
        <Context.Provider value={{ activeMission, rocket, logs, rocketId, missionId }}>
            {props.children}
        </Context.Provider>
    );
};

export const useActiveMission = () => useContext<IActiveMissionContext>(Context);