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
	module: IModule;
	fieldsToRender: string[];
	staticData: any[];
	realTime: boolean;
}

const Graph: React.FC<GraphProps> = (props: GraphProps) => {
	const { realTime, module, staticData, fieldsToRender } = props;
	console.log(`Fields to render: ${fieldsToRender}`);
	const fieldNames: string[] = module?.FieldGroups.flatMap((fieldGroup) => {
		return fieldGroup.Fields.map((field) => {
			return `${fieldGroup.Name !== field.Name ? fieldGroup.Name : ''} ${field.Name}`;
		});
	});
	const [data, setData] = useState<any[]>([]);

	useEffect(() => {
		if (realTime) {
			//TODO: change to socket connection
		} else {
			// setData(staticData);
			setData(staticData.map((dataPoint) => {
				const dataPointObject: any = {};
				for (const [i, dp] of dataPoint.entries()) {
					Object.assign(dataPointObject, {[fieldNames[i]]: dp});
				}
				return dataPointObject;
			}));
		}

	}, [realTime, staticData]);

	return (
		<LineChart width={900} height={400} data={data}>
		<CartesianGrid strokeDasharray="3 3" />
		<XAxis dataKey="Time" />
		<YAxis />
		<Tooltip />
		<Legend align='center' />
		{module && module.FieldGroups.map((FieldGroup) => {
			console.log(data);
			return FieldGroup.Fields.map((Field, index) => {
				if (fieldsToRender.find((fieldName) => fieldName === Field.Name)) {
					return (
						<Line 
							key={index} 
							type="monotone" 
							dataKey={`${FieldGroup.Name !== Field.Name ? FieldGroup.Name : ''} ${Field.Name}`} 
							strokeWidth={3} 
							activeDot={{ r: 8 }} 
							isAnimationActive={!realTime} 
						/>
					);
				}
			});

		})}
		{/* <Line type="monotone" dataKey="acceleration_x" stroke="rgba(255, 197, 87, 1)" strokeWidth={3} activeDot={{ r: 8 }} isAnimationActive={false} />
		<Line type="monotone" dataKey="acceleration_y" stroke="rgba(214, 91, 79, 1)" strokeWidth={3} activeDot={{ r: 8 }} isAnimationActive={false} />
		<Line type="monotone" dataKey="acceleration_z" stroke="rgba(0, 94, 184, 1)" strokeWidth={3} activeDot={{ r: 8 }} isAnimationActive={false} /> */}
		</LineChart>
	);
};

export default Graph;