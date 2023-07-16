enum TelemetrySource {
    lora = "LORA",
    aprs = "APRS"
}

export interface IField {
    Id: string;
    Name: string,
    Range: number[],
    Units: string,
    TelemetryId: number
}

export interface IModule {
    Name: string;
    FieldGroups: IFieldGroup[];
}

export interface IDataConfig {
    Id: string;
    Modules: IModule[];
}

interface ICoordinates {
    Latitude: number;
    Longitude: number;
}

export interface IMission {
    Id: string;
    Name: string;
    IsTest: boolean
    Date: Date;
    Coordinates: ICoordinates;
    LaunchAltitude: Number;
    Components: [];
    Published: boolean;
}

enum MotorType {
    solid = "Solid",
    liquid = "Liquid",
    hybrid = "Hybrid"
};

export interface IRocket{
    Id: string;
    Name: string;
    Missions: [];
    Components: string[] | IComponent[];
    Mass: number;
    Height: number;
    Class: string;
    MotorType: MotorType;
    Motor: string;
}

export interface IComponent {
    Id: string;
    Name: string;
    TelemetrySource:  string;
    Details: string,
    DataConfig: string;
}
export interface IFieldGroup {
    Name: String;
    Fields: IField[];
}

interface IDataPoint {
    Value: number,
    timeStamp: Date
}

export interface IFieldData {
    Id: string;
    Name: string;
    Range: number[];
    Units: string;
    ParentModuleName: string;
    ParentFieldGroupName: string;
    TelemetryId: Buffer;
    Data: IDataPoint[];
}