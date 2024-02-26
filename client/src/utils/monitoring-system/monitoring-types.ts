export const CONTROL_PACKET_TYPE = "CONTROLS";
export const INSTRUMENTATION_PACKET_TYPE = "INSTRUMENTATION";

export enum PacketType {
    CONTROLS = CONTROL_PACKET_TYPE,
    INSTRUMENTATION = INSTRUMENTATION_PACKET_TYPE
}

interface IBasePacket {
    identifier: PacketType;
}

/*------------ Controls -------------*/

enum ControlsValveTypes {
    MEV = "MEV",
    N2OFlow = "N2O Flow",
    N2OVent = "N2O Vent",
    N2Flow = "N2 Flow",
    N2Vent = "N2 Vent",
    RTV = "RTV",
    NCV = "NCV",
    EVV = "EVV"
}

enum ControlsActionTypes {
    OPEN = "OPEN",
    CLOSE = "CLOSE"
}

enum ControlsCommandTypes {
    STATUS = "STATUS",
    CONTROL = "CONTROL",
    ABORT = "ABORT",
    RESET = "RESET"
}

export interface IControlsPacket extends IBasePacket {
    valve: ControlsValveTypes;
    action: ControlsActionTypes;
    command: ControlsCommandTypes;
}

/*------------ Instrumentation -------------*/

enum InstrumentationCommandTypes {
    STATUS = "STATUS",
    RESET_SENSOR = "RESET_SENSOR",
    STREAM_SENSORS = "STREAM_SENSORS",
    SAMPLE_SENSORS = "SAMPLE_SENSORS"
}

export interface IInstrumentationPacket extends IBasePacket {
    command: InstrumentationCommandTypes
}

export { 
    ControlsValveTypes, 
    ControlsActionTypes, 
    ControlsCommandTypes
};
