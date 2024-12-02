const express = require('express');
const WebSocket = require('ws');
const app = express();
const http = require('http');
const server = http.createServer(app);
const wsClient = new WebSocket('ws://example.com:8080');

const { Sandwiches } = require('./models/models');

const os = require('os');
const wss = new WebSocket.Server({ server });



const Actions =  Object.freeze({

    NEW_ORDER:"newOrder",
    ORDER_LIST_UPDATE:"orderListUpdate",
    ADD_PREPARED_MEAL:"addPreparedMeal",
    ADD_PREPARED_SANDWICH:"addPreparedSandwich",
    UPDATE_MEALS:"updateMeal",
    UPDATE_SANDWICH:"updateSandWich",
    UPDATE_ORDER_STATE:"updateOrderState",
    ORDER_CREATION: "orderCreation"


})


wsClient.on('message', (data) => {

    const message = JSON.parse(data);

    if(message.action == Actions.UPDATE_SANDWICH){

        Sandwiches = message.data

        broadcast(
            {
                action:Actions.UPDATE_SANDWICH,
                data: Sandwiches
            }
        )
    }

});


wss.on('connection', (ws) => {



    ws.send(JSON.stringify(
        {
            action:Actions.UPDATE_SANDWICH,
            data: Sandwiches
        }
    ))

    clients.push(ws);

    console.log('Client connected');
    
    ws.send('Hello, WebSocket client!');

    ws.on('message', (data) => {

        const message = JSON.parse(data);
        if(message.action == Actions.ADD_PREPARED_SANDWICH){
            let Sandwich = Sandwiches.find(m => m.name == message.data)

            if(Sandwich){
                Sandwich.prepared += 1

                broadcast({
                    action:Actions.UPDATE_SANDWICH,
                    data:Sandwiches
                })
            }

        }

    });

    ws.on('close', () => {
        console.log('Client disconnected');

        clients = clients.filter((client) => client !== ws);

    });
});

app.get('/', (req, res) => {
    res.send('WebSocket server is running!');
});



const interfaces = os.networkInterfaces();
let localIP = '';

for (let iface in interfaces) {
  interfaces[iface].forEach((address) => {
    if (address.family === 'IPv4' && !address.internal) {
      localIP = address.address;
    }
  });
}

const port = 4000;
server.listen(port,localIP, () => {
    console.log(`Server is running at http://${localIP}:${port}`);
});


function broadcast(message) {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
}
