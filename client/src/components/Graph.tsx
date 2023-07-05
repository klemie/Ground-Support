import { BorderAll, Padding, RotateLeftOutlined } from '@mui/icons-material';
import { time } from 'console';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

/*import above tags from recharts*/

/*data type object*/

interface DataPoint {
  time: string;
  Altitude: number;
}

const Graph: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]); 

  useEffect(() => {
    // Simulating real-time data updates
    const interval = setInterval(() => {
      // Generate random data points for multiple series
      const newDataPoint: DataPoint = {
        time: new Date().toLocaleTimeString(),
        Altitude: Math.floor(Math.random() * 100),
      };

      // Update the chart data     
      setData((prevData) => [...prevData.slice(-9), newDataPoint]);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <LineChart width={450} height={250} data={data} // modified these parameters slightly
      margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey='time'/>
      <XAxis label = {{ value: "Time (s)" }} /> {/* won't display when dataKey is in effect*/}
      <YAxis label={{ value: "Altitude (m)", angle: -90, position: 'insideLeft', style: { textAnchor: 'middle'}}}/>
      <Tooltip />
      <Line type="monotone" dataKey="Altitude" stroke="rgba(0, 94, 184, 1)" strokeWidth={3} activeDot={{ r: 8 }} isAnimationActive={false} />
    </LineChart>
  );
};

export default Graph;