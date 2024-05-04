import {
    useReducer,
    useContext,
    createContext,
    PropsWithChildren
} from "react";

export enum ViewKeys {
    PLATFORM_SELECTION_KEY = 'PLATFORM_SELECTION',
    ROCKET_SELECT_KEY = 'ROCKET_SELECT',
    COMPONENT_DOCUMENT_KEY = 'COMPONENT_DOCUMENT',
    ROCKET_DETAILS_KEY = 'ROCKET_DETAILS',
    DATA_CONFIG_KEY = 'DATA_CONFIG',
    ACTIVE_FLIGHT_KEY = 'ACTIVE_FLIGHT',
    MISSION_REPLAY_KEY = 'MISSION_REPLAY',
    PDP_MONITORING_KEY = 'PDP_MONITORING'

}

export interface IViewProviderContext {
    viewKey: { view: ViewKeys; };
    updateViewKey: (view: ViewKeys) => void;
}

export const ViewProviderContext = createContext<IViewProviderContext>({
    viewKey: { view: ViewKeys.PLATFORM_SELECTION_KEY },
    updateViewKey: (view: ViewKeys) => { }
});

function viewReducer(_: any, action: any) {
    switch (action.type) {
        case ViewKeys.PLATFORM_SELECTION_KEY:
            return {
                view: ViewKeys.PLATFORM_SELECTION_KEY
            }
        case ViewKeys.ROCKET_SELECT_KEY:
            return {
                view: ViewKeys.ROCKET_SELECT_KEY
            }
        case ViewKeys.COMPONENT_DOCUMENT_KEY:
            return {
                view: ViewKeys.COMPONENT_DOCUMENT_KEY
            }
        case ViewKeys.ROCKET_DETAILS_KEY:
            return {
                view: ViewKeys.ROCKET_DETAILS_KEY
            }
        case ViewKeys.DATA_CONFIG_KEY:
            return {
                view: ViewKeys.DATA_CONFIG_KEY
            }
        case ViewKeys.ACTIVE_FLIGHT_KEY:
            return {
                view: ViewKeys.ACTIVE_FLIGHT_KEY
            }
        case ViewKeys.MISSION_REPLAY_KEY:
            return {
                view: ViewKeys.MISSION_REPLAY_KEY
            }
        case ViewKeys.PDP_MONITORING_KEY:
            return {
                view: ViewKeys.PDP_MONITORING_KEY
            }
        default:
            throw Error(`Unknown action type: ${action.type}`);
    }
}

export const ViewContextProvider = ({ children }: PropsWithChildren<any>) => {
    const [
        viewKey, 
        viewDispatch
    ] = useReducer(viewReducer, {
        view: ViewKeys.ROCKET_SELECT_KEY
    });

    const updateViewKey = (view: ViewKeys) => {
        viewDispatch({ type: viewKey });
    };

    return (
        <ViewProviderContext.Provider 
            value={{ 
                viewKey,
                updateViewKey
            }}
        >
            {children}
        </ViewProviderContext.Provider>
    );
}

export const useViewProvider = () => useContext<IViewProviderContext>(ViewProviderContext)