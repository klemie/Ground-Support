import { useState, useEffect } from "react";

export const getData = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/gateway');
            setData(response.json());
        };
    }, []);

    return data;
};