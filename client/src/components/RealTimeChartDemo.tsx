import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface DataPoint {
  time: string;
  value: number;
}

const RealTimeChart: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    // Simulating real-time data updates
    const interval = setInterval(() => {
      // Generate a random data point
      const newDataPoint: DataPoint = {
        time: new Date().toLocaleTimeString(),
        value: Math.floor(Math.random() * 100),
      };

      // Update the chart data by keeping only the last 10 data points
      setData((prevData) => [...prevData.slice(-9), newDataPoint]);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} isAnimationActive={false} />
      </LineChart>
    </div>
  );
};

export default RealTimeChart;