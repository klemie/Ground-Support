import { memo, useEffect, useState } from 'react';
import { 
  Handle, 
  Position
} from 'reactflow';

import { ValveTypes, ValveTypeKeys } from '../../../static/valves/ValveTypes'
import ValveControl from '../ValveControlSwitch';
import { Stack, Typography } from '@mui/material';


const PAndIDValveNode = ({ data, isConnectable, selected, controllable }) => {

  // const Valve = valveMap[data.valveType];
  const [Valve, setValve] = useState(ValveTypes[ValveTypeKeys[0]]);
  const [handleMargin, setHandleMargin] = useState(5);

  useEffect(() => {
    // setValve(ValveTypes[data.valveType]);
  }, [data.valveType]);

  return (
    <>
      {/* <NodeResizer minWidth={50} minHeight={20} isVisible={selected} /> */}
      <Stack>
        <Stack direction="column" spacing={0} alignItems={'center'} justifyItems={'center'}>
          <Stack direction="row" alignItems={'center'} justifyItems={'center'}>
            <Handle 
              type="source"
              style={{ position: "relative", marginTop: handleMargin }}
              position={Position.Left}
              onConnect={(params) => console.log('handle onConnect', params)}
              isConnectable={isConnectable}
            />
            <img 
              src={Valve} 
              alt={data.valveType} 
            />
            <Handle
              style={{ position: "relative", marginTop: handleMargin }}
              type="target"
              position={Position.Right}
              id="b"
              isConnectable={isConnectable}
            />
          </Stack>
            {!data.controllable && <Typography variant="body1">{data.label}</Typography>}
            {data.controllable && (
              <ValveControl
                valveName={data.label}
              />
            )}
        </Stack>
      </Stack>
    </>
  );
};

export default memo(PAndIDValveNode);