export const CONTROL_PACKET_TYPE = "CONTROLS";
export const INSTRUMENTATION_PACKET_TYPE = "INSTRUMENTATION";
export const INFO_PACKET_TYPE = "INFO";

export enum PacketType {
    CONTROLS = CONTROL_PACKET_TYPE,
    INSTRUMENTATION = INSTRUMENTATION_PACKET_TYPE,
    INFO = INFO_PACKET_TYPE
}

interface IBasePacket {
    identifier: PacketType;
}

/*------------ Controls -------------*/

enum ControlsValveTypes {
    MEV = "MEV",
    PRIME = "PRIME",
    N2OFlow = "N2OF",
    N2OVent = "N2OV",
    N2Flow = "N2F",
    N2Vent = "N2V",
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
    CONTROL = "CTRL",
    ABORT = "ABORT",
    RESET = "RESET",
    SET = "SET"
}

export interface IControlsPacket extends IBasePacket {
    valve?: ControlsValveTypes;
    action?: ControlsActionTypes;
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
