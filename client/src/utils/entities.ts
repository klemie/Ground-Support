export interface IField {
    _id?: string;
    Name: string,
    Range: number[],
    Units: string,
    TelemetryId: number
}

export interface IModule {
    _id?: string;
    Name: string;
    FieldGroups: IFieldGroup[];
}

export interface IDataConfig {
    _id?: string;
    Modules: IModule[];
}

interface ICoordinates {
    Latitude: number;
    Longitude: number;
}

export interface IMission {
    _id?: string;
    Name: string;
    IsActive: boolean;
    IsTest: boolean
    Date: Date;
    Coordinates: ICoordinates;
    LaunchAltitude: Number;
    Components: string[];
    Published: boolean;
}

export interface IMissionPopulated {
    _id?: string;
    Name: string;
    IsTest: boolean
    Date: Date;
    Coordinates: ICoordinates;
    LaunchAltitude: Number;
    Components: IComponentPopulated[];
    Published: boolean;
}

enum MotorType {
    solid = "Solid",
    liquid = "Liquid",
    hybrid = "Hybrid"
};


export interface IRocket{
    _id?: string;
    Name: string;
    Missions: string[];
    Components: string[];
    Mass: number;
    Height: number;
    Class: string;
    MotorType: MotorType;
    Motor: string;
}

export interface IRocketPopulated {
    _id?: string;
    Name: string;
    Missions: IMission[];
    Components: IComponent[];
    Mass: number;
    Height: number;
    Class: string;
    MotorType: MotorType;
    Motor: string;
}

export interface IComponent {
    _id?: string;
    Name: string;
    TelemetrySource: string;
    Details: string,
    DataConfigId: string;
}

export interface IComponentPopulated {
    _id?: string;
    Name: string;
    TelemetrySource: string;
    Details: string,
    DataConfigId: IDataConfig;
}

export interface IFieldGroup {
    _id?: string;
    Name: String;
    Fields: IField[];
}

interface IDataPoint {
    Value: number,
    timeStamp: Date
}

export interface IFieldData {
    _id?: string;
    Name: string;
    Range: number[];
    Units: string;
    ParentModuleName: string;
    ParentFieldGroupName: string;
    TelemetryId: Buffer;
    Data: IDataPoint[];
}

/* ------- Skilldev ------ */

enum NoseConeShape {
    Elliptical = "Elliptical",
    Conical = "Conical",
    Parabolic = "Parabolic",
    PowerSeries = "PowerSeries"
};

interface IAeroDimensions {
    NoseCone: {
        Length: number;
        Diameter: number;
        TipRadius: number;
        Shape: NoseConeShape;
    },
    BoatTail: {
        Length: number;
        ForeDiameter: number;
        AftDiameter: number;
    },
    Fins: {
        Count: number;
        Span: number;
        RootChord: number;
        TipChord: number;
        Sweep: number;
        Thickness: number;
    }
}

export interface IRocketSimModel {
    _id?: string;
    Name: string;
    DryMass: number;
    WetMass: number;
    CenterOfGravity: number;
    CenterOfPressure: number;
    RocketLength: number;
    FuselageLength: number;
    FuselageDiameter: number;
    AeroDimensions?: IAeroDimensions;
};

/* ------- Skilldev ------ */