import React from 'react';

interface MissionReplayViewProps {
    rocketID: string;
    toDataConfig: (id: string) => void;
    setActiveView: () => void;
    openActiveMission: (id: string) => void;
}

const MissionReplayView: React.FC<MissionReplayViewProps> = ({
    rocketID,
    toDataConfig,
    setActiveView,
    openActiveMission
}) => {
    const a = rocketID
    const b = toDataConfig
    const c = setActiveView
    const d = openActiveMission
    return <div className="blank-screen" style={{ width: '100vw', height: '100vh', backgroundColor: 'white' }}>hi</div>;
};

export default MissionReplayView;