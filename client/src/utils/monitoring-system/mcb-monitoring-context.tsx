
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const MCBSocketTesting = () => {
    const {
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket
    } = useWebSocket(`ws://localhost:8080`, {
        onOpen: () => console.log('Connected to MCB'),
        shouldReconnect: (closeEvent) => true
    });
};
