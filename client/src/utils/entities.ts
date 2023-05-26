enum TelemetrySource {
    lora = "LORA",
    aprs = "APRS"
};

export type Field = {
    Name: string,
    Range: [number],
    Units: string,
    TelemetryId: number
};

export type Module = {
    Name: string,
    FieldGroups: [Field]
};

export type DataConfig = {
    Modules: [Module]
};

type Coordinates = {
    Latitude: number,
    Longitude: number
}

export type Mission = {
    Name: string,
    IsTest: boolean,
    Date: Date,
    Coordinates: Coordinates,
    LaunchAltitude: Coordinates,
    Components: [],
    Published: boolean
};

enum MotorType {
    solid = "Solid",
    liquid = "Liquid",
    hybrid = "Hybrid"
};

export type Rocket = {
    Name: string,
    Missions: [],
    Components: [],
    Mass: number,
    Height: number,
    Class: string,
    MotorType: string,
    Motor: string
};

export type Component = {
    Name: string,
    telemetrySource: TelemetrySource,
    Details: string,
    DataConfig: DataConfig
};