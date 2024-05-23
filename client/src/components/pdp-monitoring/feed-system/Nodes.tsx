import { memo } from 'react';
import { 
  Handle, 
  Position, 
  NodeResizeControl, 
  NodeResizer 
} from 'reactflow';

import ValveControl from '../ValveControlSwitch';

import { 
  DefaultValve,
  CheckValve,
  HandOperatedValve,
  MotorValve,
  PneumaticValve,
  SolenoidValve,
  SpringValve,
  RegulatorValve,
  PressureRegulatorValve,
  NeedleValve
} from '../../../static/valves/ValveTypes';

import ValveDefault from '../../../static/valves/ValveDefault.svg'
import { Stack } from '@mui/material';

const valveMap = {
  default: DefaultValve,
  check: CheckValve,
  handOperated: HandOperatedValve,
  motor: MotorValve,
  pneumatic: PneumaticValve,
  solenoid: SolenoidValve,
  spring: SpringValve,
  regulator: RegulatorValve,
  pressureRegulator: PressureRegulatorValve,
  needle: NeedleValve
};

const PAndIDNode = ({ data, isConnectable, selected }) => {

  // const Valve = valveMap[data.valveType];

  return (
    <>
    
      <NodeResizer minWidth={50} minHeight={20} isVisible={selected} />
      <Stack>
        <Stack direction="row" spacing={2} alignItems={'center'} justifyItems={'center'}>
          <Handle 
            type="target" 
            position={Position.Right}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={isConnectable}
          />
          <img src={ValveDefault} alt="Default Valve" />
          <Handle
            type="source"
            position={Position.Left}
            id="b"
            isConnectable={isConnectable}
          />
        </Stack>
        <ValveControl valveName='MEC' />
      </Stack>
     
    </>
  );
};

export default memo(PAndIDNode);