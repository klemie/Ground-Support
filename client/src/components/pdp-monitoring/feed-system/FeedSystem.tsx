import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, Background, useReactFlow, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import PAndIDNode from './Nodes';
import { Box, Button, Chip, Divider, Drawer, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField, ToggleButton, Tooltip, Typography } from '@mui/material';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useMeasure } from 'react-use';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { 
  ValveTypes,
  ValveTypeStrings,
  ValveTypeKeys
} from '../../../static/valves/ValveTypes';
import Add from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';


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
    id: 'horizontal-2',
    type: 'valveNode',
    data: { label: 'MEC' },
    position: { x: 250, y: 0 },
    ...NodeDefaults

  },
  {
    id: 'horizontal-3',
    type: 'valveNode',
    data: { label: 'NVC' },
    position: { x: 250, y: 160 },
    ...NodeDefaults
  },
  {
    id: 'horizontal-4',
    type: 'valveNode',
    data: { label: 'RTV' },
    position: { x: 500, y: 0 },
    ...NodeDefaults
  },
  {
    id: 'horizontal-5',
    type: 'valveNode',
    data: { label: 'EEV' },
    position: { x: 500, y: 100 },
    ...NodeDefaults
  },
  {
    id: 'horizontal-6',
    type: 'valveNode',
    data: { label: 'N2OF' },
    position: { x: 500, y: 230 },
    ...NodeDefaults
  },
  {
    id: 'horizontal-7',
    type: 'valveNode',
    data: { label: 'N2F' },
    position: { x: 750, y: 50 },
    ...NodeDefaults
  },
  {
    id: 'horizontal-8',
    type: 'valveNode',
    data: { label: 'N2OV' },
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

const drawerWidth = 300;

const nodeTypes = {
  valveNode: PAndIDNode
};

const snapGrid = [20, 20] as [number, number];

const FeedSystem = () => {
  const theme = useTheme();
  const useStyles = makeStyles((theme: Theme) => createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

  const classes = useStyles();
  const [measureRef, { height }] = useMeasure();
  const divRef = measureRef as React.RefObject<HTMLDivElement>; // Assign measureRef to a variable of type RefObject<HTMLDivElement>
  const [selected, setSelected] = useState(false);
  const [valveType, setValveType] = useState(ValveTypeKeys[0]);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const onAdd = useCallback(() => {
    const newNode = {
      id: 'horizontal-9',
      type: 'valveNode',
      data: { valveType: valveType },
      position: {
        x: 100,
        y: 100,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          flexShrink: 0,
          position: "relative",
          '& .MuiDrawer-paper': {
            position: "absolute", //imp
            transition: "none !important",
            width: drawerWidth,
            height: `fit-content`,
            borderRadius: 2,
            boxSizing: 'border-box',
            backgroundColor: '#33373E',
          }
        }}
        transitionDuration={{ enter: 3000, exit: 3000 }}
        variant="persistent"
        open={drawerOpen}
      >
        <div className={classes.drawerContainer}>
          <div className={classes.drawer}>
            <Paper
              sx={{
                width: drawerWidth,
                height: 'fit-content',
                borderRadius: 2,
                boxSizing: 'border-box',
                backgroundColor: '#2E333A',
                padding: 2,
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                  <Typography variant="h5" sx={{ color: 'white' }}>P&ID Node Builder</Typography>
                  <IconButton onClick={() => setDrawerOpen(false)} >
                    <CloseIcon />
                  </IconButton>
                </Stack>
                <Stack spacing={1}>
                  <Typography variant="subtitle1">Node Type</Typography>
                  <Stack direction="row" spacing={2}>
                    <Chip label="Valve" sx={{ fontWeight: 600 }} onClick={() => {}} color='primary'/>
                    <Chip label="Tank" sx={{ fontWeight: 600 }} onClick={() => {}}/>
                    <Chip label="Instrumentation" sx={{ fontWeight: 600 }} onClick={() => {}}/>
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <FormControl 
                    fullWidth                     
                    size='small'
                  >
                    <InputLabel id="valve-type-select-label">Valve Type</InputLabel>
                    <Select
                      labelId="valve-type-select-label"
                      id="valve-type-select"
                      value={valveType}
                      onChange={(event: SelectChangeEvent) => {
                        setValveType(event.target.value as typeof ValveTypeKeys[number]);
                      }}
                      label="Valve Type"
                    >
                      {ValveTypeStrings.map((key: string, index: number) => {
                        return (
                          <MenuItem value={ValveTypeKeys[index]}>{key}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <Tooltip title={'Controllable'} placement='top'>
                    <ToggleButton
                      value="check"
                      selected={selected}
                      onChange={() => {
                        setSelected(!selected);
                      }}
                      size='small'
                    >
                      <CheckIcon />
                    </ToggleButton>
                  </Tooltip>
                </Stack>
                <TextField 
                    id="node-label" 
                    label="Valve Label" 
                    variant="outlined"
                    size='small'
                    fullWidth
                  />
                <img 
                  src={ValveTypes[valveType]} 
                  alt={valveType} 
                  width={'100%'}
                />
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" onClick={onAdd} fullWidth>Add</Button>
                </Stack>
              </Stack>
            </Paper>
          </div>
        </div>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: drawerOpen ? 40 : 0, // Adjust the margin based on the state of the drawer
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Paper 
          component="div"
          ref={divRef} // Use the divRef variable instead of casting measureRef
          sx={{
            height: 'calc(100vh - 20vh)',
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
            defaultEdgeOptions={{
              type: 'smoothstep',
              deletable: true,
              animated: false,
              style: { stroke: '#fff', strokeWidth: 1.5 },
              markerStart: {
                type: MarkerType.ArrowClosed,
                color: '#fff',
                strokeWidth: 1.5,
              },
            }}
          >
            <Button 
              sx={{ zIndex: 4 }}
              variant='contained' 
              onClick={() => setDrawerOpen(drawerOpen => !drawerOpen)}
            >
              <Stack direction={'row'} gap={1}>
                <Add /> 
                Node
              </Stack>
            </Button>
            <Controls />
            <Background />
          </ReactFlow>
        </Paper>
      </Box>
    </Box>
  );
};

export default FeedSystem;

