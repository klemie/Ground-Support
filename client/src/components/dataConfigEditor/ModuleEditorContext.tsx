import {
    createContext,
    PropsWithChildren,
    useContext,
    useReducer
} from 'react';
import { IModule } from '../../utils/entities';

export interface IModuleEditorContext {
    module: IModule;
    moduleDispatch: React.Dispatch<{type: string, payload: any}>;
}