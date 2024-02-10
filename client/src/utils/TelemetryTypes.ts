export interface IAprsParsed {
    timeStampLocal: string;
    timeStampUnix: string;
    latitude: number;
    longitude: number;
    altitude: number;
    lock: boolean;
}

export interface IAprsTelemetryPacket {
    Parsed: IAprsParsed
    Raw: string[];
}

export interface ILoggedTelemetryPacket extends IAprsTelemetryPacket {
    Log: string;
}

export const formatPacket = (packet: IAprsTelemetryPacket) => !packet.Parsed.lock 
    ? `\nPacket received [${packet.Parsed.timeStampLocal}], No GPS Lock\n` 
    : `Packet received [${packet.Parsed.timeStampLocal}], GPS Lock\n\tLatitude: ${packet.Parsed.latitude}\n\tLongitude: ${packet.Parsed.longitude}\n\tAltitude: ${packet.Parsed.altitude}\n\n`