import React, { useEffect, useState } from "react";
import { 
    CartesianGrid, 
    Legend, 
    ResponsiveContainer, 
    Scatter, 
    ScatterChart, 
    Tooltip, 
    XAxis, 
    YAxis 
} from "recharts";
import { IAprsTelemetryPacket } from "../utils/TelemetryTypes";

interface CartesianGridProps {
    packet: IAprsTelemetryPacket;
}

export const CoordinateGrid: React.FC<CartesianGridProps> = (props: CartesianGridProps) => {
    const { packet } = props;

    const [coordinates, setCoordinates] = useState<any[]>([]);

    useEffect(() => {
        if (packet?.Parsed?.latitude !== undefined && packet?.Parsed?.longitude !== undefined && packet?.Parsed.longitude !== 0) {
            setCoordinates((prev) => [
                ...prev,
                {
                    name: "packet",
                    timeStamp: packet?.Parsed?.timeStampLocal,
                    latitude: packet?.Parsed?.latitude,
                    longitude: packet?.Parsed?.longitude
                }
            ])
        }
    }, [packet]);

	return (
        <ResponsiveContainer width="100%" height={"50%"}>
            <ScatterChart
                data={coordinates}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="latitude" />
                <YAxis dataKey="longitude"/>
                <Tooltip />
                <Legend />
                <Scatter name="Packet" data={coordinates} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
	);
}