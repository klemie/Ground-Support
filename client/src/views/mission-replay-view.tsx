import React from 'react';

interface MissionReplayViewProps {
    toDataConfig: (id: string) => void;
    setActiveView: () => void;
    openActiveMission: (id: string) => void;
}

const MissionReplayView: React.FC<MissionReplayViewProps> = ({
    toDataConfig,
    setActiveView,
    openActiveMission
}) => {
    const a = toDataConfig
    const b = setActiveView
    const c = openActiveMission
    return <div className="blank-screen" style={{ width: '100vw', height: '100vh', backgroundColor: 'white' }}>hi</div>;
};

export default MissionReplayView;