import * as React from 'react';
import * as Entities from '../utils/entities';
import { ComponentCard } from './ComponentCard';
import { DataUpload } from './DataUpload';

interface TypeMap {
    props: {};
    Component: React.FC;
};

/**
 * ComponentCard
 */

interface IComponentCardProps {
    /**
     * The id of the component.
     */
    componentId: string;
    /**
     * The id of the rocket or the rocket object.
     */
    rocket: Entities.IRocketPopulated | Entities.IRocketPopulated;
    /**
     * event handler for when the component delete button is clicked.
     */
    onDelete: () => void;
    /**
     * event handler for when the component edit button is clicked.
     */
    updateComponent: () => void;
    /**
     * event handler for when the data config button is clicked.
     */
    onDataConfigClick: (id: string) => void;
}

export type ComponentCardTypeMap = TypeMap & {
    props: IComponentCardProps;
    Component: ComponentCard;
};

/**
 * DataUpload
 */

interface IDataUploadProps {
    /**
     * Controls whether the dialog is open or not.
     */
    isOpen: boolean;
    /**
     * event handler for when the dialog is closed.
     */
    onClose: () => void;
}

export type DataUploadTypeMap = TypeMap & {
    props: IDataUploadProps;
    Component: DataUpload;
};