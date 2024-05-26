import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { 
	useNodesState, 
	useEdgesState, 
	addEdge, 
	Controls, 
	Background, 
	MarkerType, 
	MiniMap, 
	Position, 
} from 'reactflow';
import 'reactflow/dist/style.css';

import {
	Box,
	Paper,
	SpeedDial,
	SpeedDialAction,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Add from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import TuneIcon from '@mui/icons-material/Tune';
import HelpIcon from '@mui/icons-material/Help';
import SaveIcon from '@mui/icons-material/Save';
import RestoreIcon from '@mui/icons-material/Restore';

import PAndIDValveNode from './Nodes';
import { IPAndIDNode, PAndIDNodeTypes } from '../../../utils/monitoring-system/monitoring-types';
import { HelpDrawer, LegendDrawer, PAndIDBuilderDrawer } from './Drawers';
import { ValveTypeKeys } from '../../../static/valves/ValveTypes';

const FLOW_KEY = 'FEED_SYSTEM_FLOW';

const NodeDefaults = {
	sourcePosition: Position.Right,
	targetPosition: Position.Left,
	style: {
		background: 'None',
		color: '#333',
		border: 'None',
		width: 'fit-content',
		height: 50,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: 'white'
	}
};

const initialNodes: IPAndIDNode[] = [
	{
		id: 'horizontal-1',
		type: 'valveNode',
		data: {
			label: 'MEC',
			controllable: false,
			nodeType: PAndIDNodeTypes.VALVE,
			valveType: ValveTypeKeys[0]
		},
		position: { x: 0, y: 0 },
		...NodeDefaults
	},
	{
		id: 'horizontal-2',
		type: 'valveNode',
		data: {
			label: 'NCV',
			controllable: false,
			nodeType: PAndIDNodeTypes.VALVE,
			valveType: ValveTypeKeys[1]
		},
		position: { x: 300, y: 0 },
		...NodeDefaults
	},
];

const nodeTypes = {
  valveNode: PAndIDValveNode
};

const snapGrid = [1, 1] as [number, number];

const FeedSystem: React.FC = () => {
	const theme = useTheme();

	// Drawers State 
	const [nodeBuilderDrawer, setNodeBuilderDrawer] = useState(false);
	const [helpDrawer, setHelpDrawer] = useState(false);
	const [legendDrawer, setLegendDrawer] = useState(false);
	
	// Speed Dial State and Handlers
	const [speedDialOpen, setSpeedDialOpen] = useState(false);
	const speedDialActions = [
		{
			icon: <Add />,
			name: 'Add Node',
			onClick : () => {
				console.log('Add Node clicked');
				setNodeBuilderDrawer(nodeBuilderDrawer => !nodeBuilderDrawer);
				setSpeedDialOpen(false);
				setHelpDrawer(false);
				setLegendDrawer(false);
			}
		},
		{
			icon: <SaveIcon />,
			name: 'Save P&ID',
			onClick : () => {
				console.log('save clicked');
				onSave();
			}
		},
		{
			icon: <RestoreIcon />,
			name: 'Restore P&ID',
			onClick: () => {
				console.log('Restore clicked');
				onRestore();
			}
		},
		{
			icon: <InfoIcon />,
			name: 'P&ID Legend',
			onClick : () => {
				console.log('info clicked');
				setLegendDrawer(legendDrawer => !legendDrawer);
				setSpeedDialOpen(false);
				setHelpDrawer(false);
				setNodeBuilderDrawer(false);
			}
		},
		{
			icon: <HelpIcon />,
			name: 'Help',
			onClick: () => {
				console.log('help clicked');
				setHelpDrawer(helpDrawer => !helpDrawer);
				setSpeedDialOpen(false);
				setLegendDrawer(false);
				setNodeBuilderDrawer(false);
			}
		}
	];

	// Flow State and Handlers
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [rfInstance, setRfInstance] = useState(null);
  	// const { setViewport } = useReactFlow();

	const onConnect = useCallback((params: any) => setEdges(
		(els) => addEdge(params, els)
	), []);

	const onSave = useCallback(() => {
		if (rfInstance) {
			const flow = rfInstance.toObject();
			localStorage.setItem(FLOW_KEY, JSON.stringify(flow));
		}
	}, [rfInstance]);

	const onRestore = useCallback(() => {
		const restoreFlow = async () => {
		  const flow = JSON.parse(localStorage.getItem(FLOW_KEY) as string);
	
		  if (flow) {
			setNodes(flow.nodes || []);
			setEdges(flow.edges || []);
		  }
		};
		restoreFlow();
	}, [setNodes ]);

	const onAdd = useCallback(() => {
		const newNode = {
			id: 'horizontal-1',
			type: 'valveNode',
			data: { 
				nodeType: PAndIDNodeTypes.VALVE, 
				label: 'Valve', 
				controllable: true, 
				valveType: ValveTypeKeys[6] 
			},
			position: {
				x: 100,
				y: 100,
			},
		};
		setNodes((nds) => nds.concat(newNode));
	}, [setNodes]);

	useEffect(() => {
		if (localStorage.getItem(FLOW_KEY)) {
			onRestore();
		}
	}, []);

	return (
		<Box sx={{ display: 'flex', height: '100%' }}>
			<PAndIDBuilderDrawer 
				onAdd={onAdd} 
				openDrawer={nodeBuilderDrawer} 
				setNodeBuilderDrawer={() => setNodeBuilderDrawer(!nodeBuilderDrawer)} 
			/>
			<HelpDrawer 
				helpDrawer={helpDrawer} 
				setHelpDrawer={() => setHelpDrawer(!helpDrawer)} 
			/>
			<LegendDrawer 
				legendDrawer={legendDrawer} 
				setLegendDrawer={() => setLegendDrawer(!legendDrawer)}
			/>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					marginLeft: nodeBuilderDrawer || legendDrawer || helpDrawer ? 42.5 : 0, // Adjust the margin based on the state of the drawer
					transition: theme.transitions.create('margin', {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.leavingScreen,
					}),
				}}
			>
				<Paper
					component="div"
					sx={{
						height: '100%',
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 2,
						boxShadow: 'none',
						border: '1px solid #333',
						padding: 2
					}}
					elevation={2}
				>
					<ReactFlow
						nodes={nodes}
						edges={edges}
						nodeTypes={nodeTypes}
						onNodesChange={onNodesChange}
						onEdgesChange={onEdgesChange}
						onConnect={onConnect}
						snapToGrid={true}
						snapGrid={snapGrid}
						fitView
						attributionPosition="bottom-left"
						onInit={setRfInstance}
						defaultEdgeOptions={{
							type: 'smoothstep',
							deletable: true,
							animated: false,
							style: { 
								stroke: '#fff', 
								strokeWidth: 1.5 
							},
							markerStart: {
								type: MarkerType.ArrowClosed,
								color: '#fff',
								strokeWidth: 1.5,
							},
						}}
					>
						<SpeedDial
							icon={<TuneIcon />}
							ariaLabel="Feed System Actions"
							direction='down'
							sx={{
								'& .MuiSpeedDial-fab': {
									borderRadius: '5px !important',
								},
								left: 10,
								top: 10,
								position: 'absolute',
							}}
							FabProps={{
								size: 'medium',
							}}
							open={speedDialOpen}
							onOpen={() => setSpeedDialOpen(true)}
							onClose={() => setSpeedDialOpen(false)}
						>
						{speedDialActions.map((action) => (
							<SpeedDialAction
								key={action.name}
								icon={action.icon}
								tooltipTitle={action.name}
								onClick={action.onClick}
								tooltipPlacement='right'
							/>
						))}
						</SpeedDial>
						<Controls />
						<MiniMap
							pannable
							zoomable
						/>
						<Background />
					</ReactFlow>
				</Paper>
			</Box>
		</Box>
	);
};

export default FeedSystem;