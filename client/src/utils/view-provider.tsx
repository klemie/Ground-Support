import { useEffect, useReducer, useState } from 'react';

import '../root/App.css'

import { ViewContextProvider, useViewProvider } from './viewProviderContext';


export default function ViewProvider() {
	const viewProviderContext = useViewProvider();
	useEffect(() => {
		console.log(`view key: ${viewProviderContext.viewState.viewKey}`);
	}, [viewProviderContext.viewState.viewKey]);
    return (
		<div className='app'>
			<ViewContextProvider />
        </div>
    );
}