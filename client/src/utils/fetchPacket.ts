import axios from 'axios';

// interface packet {
//     header: object;
//     BME: object;
//     LSM: object;
//     strainGauges: object;
//     rocketStatus: object;
// }

const getTelemetryData = async () => {
    try {
        let response = await axios.get("http://127.0.0.1:5000/gateway");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export default getTelemetryData;