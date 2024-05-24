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
import AccountTreeIcon from '@mui/icons-material/AccountTree';

import { 
  ValveTypes,
  ValveTypeStrings,
  ValveTypeKeys
} from '../../../static/valves/ValveTypes';
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
    position: { x: 250, y: 0 },
    ...NodeDefaults
  },
  {
    id: 'horizontal-1',
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

const drawerWidth = 300;

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
      }
    },
    {
      icon: <HelpIcon />,
      name: 'How to guide',
      onClick: () => {
        console.log('help clicked');
        setHelpDrawer(helpDrawer => !helpDrawer);
        setSpeedDialOpen(false);
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
                    {/* <AccountTreeIcon /> */}
                    <Typography  variant="h6" sx={{ color: 'white', fontWeight: 600 }}>P&ID Node Builder</Typography>
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
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>Help</Typography>
              <IconButton onClick={() => setHelpDrawer(false)} >
                <CloseIcon />
              </IconButton>
            </Stack>
            <Divider />
              <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>Keyboard Commands</Typography>
            <Divider />
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Chip label={'Backspace'} />
              <Typography variant="body1" sx={{ color: 'white' }}>Delete selected Node/Edge</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Stack direction={'row'}>
                <Chip label={'Ctrl'} />
                +
                <Chip label={'mouse wheel'} />
              </Stack>
              <Typography variant="body1" sx={{ color: 'white' }}>zoom</Typography>
            </Stack>
            <Divider />
              <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>Guides</Typography>
            <Divider />
            <Link href={'https://reactflow.dev/'} target='_blank'>
              <Typography variant="link">React Flow Documentation</Typography>
            </Link>
            <Link href={''} target='_blank'>
              <Typography variant="link">UVR P&ID FeedSystem </Typography>
            </Link>
          </Stack>
        </Drawer>
        <Drawer
          sx={{
            // marginTop: 15,
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
          open={legendDrawer}
        >
          <Stack 
            direction="row" 
            spacing={2} 
            alignItems={'center'} 
            justifyContent={'space-between'} 
            width={'100%'} 
            padding={2}
          >
            <Stack direction='row' alignItems={'center'} gap={1}>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>P&ID Legend</Typography>
            </Stack>
            <IconButton onClick={() => setLegendDrawer(false)} >
              <CloseIcon />
            </IconButton>
          </Stack>
          <Grid container gap={2} padding={2}>
            {[...Array(10).keys()].map((i) => (
              <Grid item alignContent={'center'} justifyItems={'center'}>
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
        </Drawer>
      </Stack>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: nodeBuilderDrawer || legendDrawer || helpDrawer ? 40 : 0, // Adjust the margin based on the state of the drawer
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
            <Controls 
              showInteractive={true}
              style={{
                borderRadius: '10px !important',
              }}
            >
              <Tooltip title={'P&ID Legend and info'} placement='right'>
                <ControlButton onClick={()=>{}}>
                  <InfoIcon />
                </ControlButton>
              </Tooltip>
            </Controls>
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

