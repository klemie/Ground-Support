

export const MCBSerialInterface = () => {
    const port = new SerialPort('COM3', {
        baudRate: 9600
    });

    port.on('open', () => {
        console.log('Port open');
    });

    port.on('data', (data: string) => {
        console.log('Data:', data);
    });
}