import React, { useReducer } from 'react';

type SequenceState = 
    | { state: 'key' }
    | { state: 'prime' }
    | { state: 'ignite' }
    | { state: 'mev' }

type SequenceAction =
    | { type: 'reset' }
    | { type: 'set_prime' }
    | { type: 'set_ignite' }
    | { type: 'set_mev' }

export function sequenceReducer(state: SequenceState, action: SequenceAction): SequenceState {
    switch (action.type) {
        case 'reset':
            return { state: 'key' };
        case 'set_prime':
            return { state: 'prime' };
        case 'set_ignite':
            return { state: 'ignite' };
        case 'set_mev':
            return { state: 'mev' };
        default:
            throw new Error();
    }
}

export const updateSequence = (state: SequenceState, dispatch: React.Dispatch<SequenceAction>) => {
    if (state.state === 'key') {
        dispatch({ type: 'set_prime' });
    } else if (state.state === 'prime') {
        dispatch({ type: 'set_ignite' });
    } else if (state.state === 'ignite') {
        dispatch({ type: 'set_mev' });
    } else if (state.state === 'mev') {
        dispatch({ type: 'reset' });
    }
}