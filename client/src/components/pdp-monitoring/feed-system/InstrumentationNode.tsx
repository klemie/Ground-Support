import { memo, useEffect, useState } from 'react';

import InstrumentationSymbol from '../../../static/instrumentation/instrumentationSymbol.svg';
import { Stack, Typography } from '@mui/material';


const InstrumentationNode = ({ data, isConnectable }) => {

  return (
		<Stack direction="column" spacing={0} alignItems={'center'} justifyItems={'center'}>
			<img 
				src={InstrumentationSymbol} 
				alt={InstrumentationSymbol} 
			/>
			<Stack direction={'column'} sx={{ position: 'absolute', top: 3 }} alignItems={'center'}>
				<Typography variant="body1" fontSize={10}>{data.instrumentationType}</Typography>
				<Typography variant="body1" fontSize={10}>000</Typography>
			</Stack>
		</Stack>
  );
};

export default memo(InstrumentationNode);