import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, Background, useReactFlow, MarkerType, MiniMap, ControlButton, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import PAndIDValveNode from './Nodes';
import { 
  Box, 
  Button, 
  Chip, 
  Drawer, 
  FormControl, 
  IconButton, 
  InputLabel, 
  MenuItem, 
  Paper, 
  Select, 
  SelectChangeEvent, 
  SpeedDial, 
  SpeedDialAction, 
  Stack, 
  TextField, 
  ToggleButton, 
  Tooltip, 
  Typography, 
  Grid, 
  Divider, 
  Link 
} from '@mui/material';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useMeasure } from 'react-use';

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import TuneIcon from '@mui/icons-material/Tune';
import HelpIcon from '@mui/icons-material/Help';

import { 
  ValveTypes,
  ValveTypeStrings,
  ValveTypeKeys
} from '../../../static/valves/ValveTypes';
import InstrumentationLegend from '../../../static/InstrumentationLegend.svg';
import Tank from '../../../static/tanks/Tank.svg';
import GasBottle from '../../../static/tanks/Gas Bottle.svg';
import VerticalVessel from '../../../static/tanks/Vertical Vector.svg';

import Add from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import { IPAndIDNode, PAndIDNodeTypes } from '../../../utils/monitoring-system/monitoring-types';

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
    },
    position: { x: 0, y: 0 },
    ...NodeDefaults
  },
  {
    id: 'horizontal-2',
    type: 'valveNode',
    data: { 
      label: 'MEC', 
      controllable: false,
      nodeType: PAndIDNodeTypes.VALVE
    },
    position: { x: 300, y: 0 },
    ...NodeDefaults
  },

];

const drawerWidth = 310;

const nodeTypes = {
  valveNode: PAndIDValveNode
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

  const [nodeBuilderDrawer, setNodeBuilderDrawer] = useState(false);
  const [helpDrawer, setHelpDrawer] = useState(false);
  const [legendDrawer, setLegendDrawer] = useState(false);

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
      icon: 
      <InfoIcon />, 
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
      name: 'How to guide',
      onClick: () => {
        console.log('help clicked');
        setHelpDrawer(helpDrawer => !helpDrawer);
        setSpeedDialOpen(false);
        setLegendDrawer(false);
        setNodeBuilderDrawer(false);
      }
    }
  ];

  const [speedDialOpen, setSpeedDialOpen] = useState(false);

  const classes = useStyles();
  const [measureRef, { height }] = useMeasure();
  const divRef = measureRef as React.RefObject<HTMLDivElement>; // Assign measureRef to a variable of type RefObject<HTMLDivElement>
  const [selected, setSelected] = useState(false);
  const [valveType, setValveType] = useState(ValveTypeKeys[0]);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
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
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Stack>
        <Drawer
          sx={{
            maxHeight: `${height}px`,
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
          open={nodeBuilderDrawer}
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
                    <Typography  variant="h5" sx={{ color: 'white', fontWeight: 600 }}>P&ID Node Builder</Typography>
                    <IconButton onClick={() => setNodeBuilderDrawer(false)} >
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
        <Drawer
          sx={{
            // marginTop: 67,
            maxHeight: `${height}px`,
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
          open={helpDrawer}
        >
          <Stack 
            direction="column" 
            padding={2}
            gap={2}
          >
            <Stack direction="row" spacing={2} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
              {/* <HelpIcon /> */}
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>Help</Typography>
              <IconButton onClick={() => setHelpDrawer(false)} >
                <CloseIcon />
              </IconButton>
            </Stack>
            <Divider />
              <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>Keyboard Commands</Typography>
            <Divider />
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Chip label={'BackSpace'} sx={{ fontWeight: 600 }} />
              <Typography variant="body1" sx={{ color: 'white' }}>Delete selected </Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Stack direction={'row'} alignItems={'center'}>
                <Chip label={'Ctrl'} sx={{ fontWeight: 600 }} />
                <Typography p={0.5}>+</Typography>
                <Chip label={'Mouse Wheel'} sx={{ fontWeight: 600 }} />
              </Stack>
              <Typography variant="body1" sx={{ color: 'white' }}>Zoom</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Chip label={'Left Click'} sx={{ fontWeight: 600 }} />
              <Typography variant="body1" sx={{ color: 'white' }}> Select </Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Stack direction={'row'} alignItems={'center'} >
                <Chip label={'Shift'} sx={{ fontWeight: 600 }} />
                <Typography p={0.5}>+</Typography>
                <Chip label={'Left Click'} sx={{ fontWeight: 600 }} />
              </Stack>
              <Typography variant="body1" sx={{ color: 'white' }}>Drag select</Typography>
            </Stack>
            <Divider />
              <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>Guides</Typography>
            <Divider />
            <Link href={'https://reactflow.dev/'} target='_blank'>
              <Typography variant="body1">React Flow Documentation</Typography>
            </Link>
            <Link href={''} target='_blank'>
              <Typography variant="body1">UVR P&ID FeedSystem </Typography>
            </Link>
          </Stack>
        </Drawer>
        <Drawer
          sx={{
            // marginTop: 15,
            flexShrink: 0,
            position: "relative",
            maxHeight: `${height}px`,
            '& .MuiDrawer-paper': {
              position: "absolute", //imp
              transition: "none !important",
              width: drawerWidth,
              height: `fit-content`,
              borderRadius: 2,
              boxSizing: 'border-box',
              backgroundColor: '#33373E',
              maxHeight: `${height}px`,
            }
          }}
          transitionDuration={{ enter: 3000, exit: 3000 }}
          variant="persistent"
          open={legendDrawer}
        >
          <Stack          
            padding={2}
            spacing={2}
          >
            <Stack 
              direction="row" 
              spacing={1} 
              alignItems={'center'} 
              justifyContent={'space-between'} 
              width={'100%'} 
            >
              <Stack direction='row' alignItems={'center'} gap={1}>
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>P&ID Legend</Typography>
              </Stack>
              <IconButton onClick={() => setLegendDrawer(false)} >
                <CloseIcon />
              </IconButton>
            </Stack>
            <Divider />
              <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>Valves</Typography>
            <Divider />
            <Grid container gap={1} alignContent={'space-between'} justifyContent="space-between">
              {[...Array(10).keys()].map((i) => (
                <Grid item alignContent={'center'} justifyContent="center">
                  <img src={ValveTypes[ValveTypeKeys[i]]} />
                  <Typography 
                    paragraph 
                    variant="body1"
                    textAlign={'center'}
                    sx={{ color: 'white', whiteSpace: "pre-wrap" }}
                  >
                    {ValveTypeStrings[i].replace(/ /g, '\n')}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            <Divider />
              <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>Instrumentation</Typography>
            <Divider />
            <img src={InstrumentationLegend} width={'100%'} />
            <Divider />
              <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>Tanks</Typography>
            <Divider />
            <Stack direction="row" spacing={2}>
              <img src={Tank} />
              <img src={VerticalVessel} />
              <img src={GasBottle} />
            </Stack>
          </Stack>
        </Drawer>
      </Stack>
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
          ref={divRef} // Use the divRef variable instead of casting measureRef
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

