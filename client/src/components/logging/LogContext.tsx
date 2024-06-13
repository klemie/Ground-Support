import {
    createContext,
    PropsWithChildren,
    useContext,
    useState
} from 'react';

interface ILogContext {
    missionControlLogs: string[];
    addToMissionControlLogs: (log: string) => void;
    valveCartLogs: string[];
    addToValveCartLogs: (log: string) => void;
}

export const LogContext = createContext<ILogContext>({
    missionControlLogs: [],
    addToMissionControlLogs: (log: string) => {},
    valveCartLogs: [],
    addToValveCartLogs: (log: string) => {}
});

export const LogProvider = (props: PropsWithChildren<any>) => {
    const [missionControlLogs, setMissionControlLogs] = useState<string[]>([]);

    const addToMissionControlLogs = (log: string) => {
        setMissionControlLogs([...missionControlLogs, `[${new Date().toLocaleString()}] [INFO] - ${log}`]);
    }

    const [valveCartLogs, setValveCartLogs] = useState<string[]>([]);
    const addToValveCartLogs = (log: string) => {
        setValveCartLogs([...valveCartLogs, `[${new Date().toLocaleString()}] [INFO] - ${log}`]);
    }

    return (
        <LogContext.Provider value={{
            missionControlLogs, 
            addToMissionControlLogs, 
            valveCartLogs, 
            addToValveCartLogs
        }}>
            {props.children}
        </LogContext.Provider>
    )
}

export const useLogContext = () => useContext<ILogContext>(LogContext);