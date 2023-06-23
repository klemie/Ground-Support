import React, { useState, useEffect } from 'react';
import { 
	LineChart, 
	Line, 
	XAxis, 
	YAxis, 
	CartesianGrid, 
	Tooltip, 
	Legend 
} from 'recharts';
import { IModule } from '../utils/entities';

interface GraphProps {
	dataKeys: string[];
	// fieldsToRender: string[];
	staticData: any[];
	realTime: boolean;
}

const Graph: React.FC<GraphProps> = (props: GraphProps) => {
	const { realTime, dataKeys, staticData } = props;

	const [data, setData] = useState<any[]>([]);

	useEffect(() => {
		if (realTime) {
			//TODO: change to socket connection
		} else {
			setData(staticData);
		}
		console.log('Data:', data);
		console.log(dataKeys);
	}, [realTime, staticData]);

	return (
		<LineChart width={900} height={400} data={data}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="Time" />
			<YAxis />
			<Tooltip />
			<Legend align='center' />
			{dataKeys && dataKeys.map((key, index) => {
				return (
					<Line 
						key={index} 
						type="monotone" 
						dataKey={key} 
						strokeWidth={3} 
						activeDot={{ r: 8 }} 
						isAnimationActive={!realTime} 
					/>
				);
			})}
		</LineChart>
	);
};

export default Graph;