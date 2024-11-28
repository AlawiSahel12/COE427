const express = require('express');
const WebSocket = require('ws');
const app = express();
const http = require('http');
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');
    
    // Send a message to the client
    ws.send('Hello, WebSocket client!');

    // Receive messages from the client
    ws.on('message', (message) => {
        console.log('Received:', message);
        // Optionally, send a response back
        ws.send(`Server received: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

app.get('/', (req, res) => {
    res.send('WebSocket server is running!');
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
