import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, Background, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import PAndIDNode from './Nodes';
import { Button } from '@mui/material';

interface Node {
    id: string;
    sourcePosition: string;
    targetPosition?: string;
    type?: string;
    data: { label: string };
    position: { x: number; y: number };
    style?: any;
}

const NodeDefaults = {
    sourcePosition: 'right',
    targetPosition: 'left',
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
    },
};

interface Edge {
    id: string;
    source: string;
    target: string;
    type: string;
    animated?: boolean;
    label?: string;
}

const initialNodes: Node[] = [
  {
    id: 'horizontal-1',
    type: 'input',
    data: { label: 'Input' },
    position: { x: 0, y: 80 },
    ...NodeDefaults
  },
  {
    id: 'horizontal-2',
    type: 'valveNode',
    data: { label: 'A Node' },
    position: { x: 250, y: 0 },
    ...NodeDefaults

  },
  {
    id: 'horizontal-3',
    type: 'valveNode',
    data: { label: 'Node 3' },
    position: { x: 250, y: 160 },
    ...NodeDefaults
  },
  {
    id: 'horizontal-4',
    type: 'valveNode',
    data: { label: 'Node 4' },
    position: { x: 500, y: 0 },
    ...NodeDefaults
  },
  {
    id: 'horizontal-5',
    type: 'valveNode',
    data: { label: 'Node 5' },
    position: { x: 500, y: 100 },
    ...NodeDefaults
  },
  {
    id: 'horizontal-6',
    type: 'valveNode',
    data: { label: 'Node 6' },
    position: { x: 500, y: 230 },
    ...NodeDefaults
  },
  {
    id: 'horizontal-7',
    type: 'valveNode',
    data: { label: 'Node 7' },
    position: { x: 750, y: 50 },
    ...NodeDefaults
  },
  {
    id: 'horizontal-8',
    type: 'valveNode',
    data: { label: 'Node 8' },
    position: { x: 750, y: 300 },
    ...NodeDefaults
  },
];

// const initialEdges: Edge[] = [
//   {
//     id: 'horizontal-e1-2',
//     source: 'horizontal-1',
//     type: 'smoothstep',
//     target: 'horizontal-2',
//     animated: true,
//   },
//   {
//     id: 'horizontal-e1-3',
//     source: 'horizontal-1',
//     type: 'smoothstep',
//     target: 'horizontal-3',
//     animated: true,
//   },
//   {
//     id: 'horizontal-e1-4',
//     source: 'horizontal-2',
//     type: 'smoothstep',
//     target: 'horizontal-4',
//     label: 'edge label',
//   },
//   {
//     id: 'horizontal-e3-5',
//     source: 'horizontal-3',
//     type: 'smoothstep',
//     target: 'horizontal-5',
//     animated: true,
//   },
//   {
//     id: 'horizontal-e3-6',
//     source: 'horizontal-3',
//     type: 'smoothstep',
//     target: 'horizontal-6',
//     animated: true,
//   },
//   {
//     id: 'horizontal-e5-7',
//     source: 'horizontal-5',
//     type: 'smoothstep',
//     target: 'horizontal-7',
//     animated: true,
//   },
//   {
//     id: 'horizontal-e6-8',
//     source: 'horizontal-6',
//     type: 'smoothstep',
//     target: 'horizontal-8',
//     animated: true,
//   },
// ];

const nodeTypes = {
  valveNode: PAndIDNode
};

const snapGrid = [20, 20] as [number, number];

const FeedSystem = () => {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  // const [rfInstance, setRfInstance] = useState(null);
  // const { setViewport } = useReactFlow();
  
  const onSave = useCallback(() => {
    console.log('save clicked');
  }, []);

  const onRestore = useCallback(() => {
    console.log('restore clicked');
  }, []);

  // useEffect(() => {
    
  // }, [nodes, edges]);
    
  const onConnect = useCallback((params: any) => setEdges(
    (els) => addEdge(params, els)
  ), []);

  return (
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
    >
      {/* <Button variant='contained' onClick={onSave}>Save</Button> */}
      <Button style={{ margin: 10 }} variant='contained' onClick={onSave}>Configure</Button>
      <Controls />
      <Background />
    </ReactFlow>
  );
};

export default FeedSystem;