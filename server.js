const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let ballState = {
    x: 400,
    y: 300,
    velocityX: (Math.random() - 0.5) * 10,
    velocityY: (Math.random() - 0.5) * 10
};

wss.on('connection', (ws) => {
    ws.send(JSON.stringify(ballState));

    ws.on('message', (message) => {
        ballState = JSON.parse(message);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(ballState));
            }
        });
    });
});

console.log('WebSocket server running on ws://localhost:8080');
