import React, { useEffect, useState } from 'react';
import LoadingButton from '@mui/material/Button';
import { Button } from '@mui/material';
import api from '../../services/api'
import { IRocketSimModel } from '../../utils/entities';



const RocketSimulationTab: React.FC = () => {
    // state
    const [data, setData] = useState<any>([{Name: 'None'}]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.getRocketSims();
            const d = result.data as IRocketSimModel[];
            setData(d);
        }
        fetchData();
        
    }, []);

    return (
        <>
            {data.map((sim: IRocketSimModel) => () => (
                <>
                    {sim.Name}
                </>    
            ))}
        </>
    );
};

export default RocketSimulationTab;