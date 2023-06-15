import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface DataPoint {
  time: string;
  acceleration_x: number;
  acceleration_y: number;
  acceleration_z: number;
}

const Graph: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    // Simulating real-time data updates
    const interval = setInterval(() => {
      // Generate random data points for multiple series
      const newDataPoint: DataPoint = {
        time: new Date().toLocaleTimeString(),
        acceleration_x: Math.floor(Math.random() * 100),
        acceleration_y: Math.floor(Math.random() * 100),
        acceleration_z: Math.floor(Math.random() * 100),
      };

      // Update the chart data
      setData((prevData) => [...prevData.slice(-9), newDataPoint]);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <LineChart width={350} height={150} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend align='center' />
      <Line type="monotone" dataKey="acceleration_x" stroke="rgba(255, 197, 87, 1)" strokeWidth={3} activeDot={{ r: 8 }} isAnimationActive={false} />
      <Line type="monotone" dataKey="acceleration_y" stroke="rgba(214, 91, 79, 1)" strokeWidth={3} activeDot={{ r: 8 }} isAnimationActive={false} />
      <Line type="monotone" dataKey="acceleration_z" stroke="rgba(0, 94, 184, 1)" strokeWidth={3} activeDot={{ r: 8 }} isAnimationActive={false} />
    </LineChart>
  );
};

export default Graph;