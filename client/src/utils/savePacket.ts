import { IMission, IDataPoint } from "./entities";
import { IAprsTelemetryPacket } from "./TelemetryTypes";
import api from "../services/api";

export const saveAprsPacket = async (mission: IMission , packet: IAprsTelemetryPacket, packetNumber: number) => {
    console.log('in save packet:', packet)
    let missionId: string = '';

    if (!mission._id) {
        return 'No mission Id attached';
    } else {
        missionId = mission._id;
    } 

    const longPayload: IDataPoint = {
        TimeSinceLaunch: Number(packet.Parsed.timeStampUnix),
        Value: (packet.Parsed.longitude) as number,
        PacketNumber: packetNumber,
        FieldId: '64e931e35a8391d54367af01',
        FieldName: 'Longitude'
    };

    const latPayload: IDataPoint = {
        TimeSinceLaunch: Number(packet.Parsed.timeStampUnix),
        Value: packet.Parsed.latitude,
        FieldId: '64e931e35a8391d54367af02',
        PacketNumber: packetNumber,
        FieldName: 'Latitude'
    };

    const altPayload: IDataPoint = {
        TimeSinceLaunch: Number(packet.Parsed.timeStampUnix),
        Value: packet.Parsed.altitude,
        FieldId: '64e931e35a8391d54367aeff',
        PacketNumber: packetNumber,
        FieldName: 'Longitude'
    };

    const packetPayload = [longPayload, latPayload, altPayload];
    console.log(packetPayload, missionId)

    const response = await api.upsertMissionData(missionId, packetPayload);
    console.log(response.error.message)

    if (response.error.status !== 200) {
        return response.error.message;
    }

    return 'successful'
};