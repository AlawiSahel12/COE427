const express = require('express');
const WebSocket = require('ws');
const app = express();
const http = require('http');
const server = http.createServer(app);
const wsClient = new WebSocket('ws://example.com:8080');

const { Orders, Meals, Sandwiches } = require('./models/models');
const { send } = require('process');
const { error } = require('console');

const os = require('os');

const wss = new WebSocket.Server({ server });

let OrderNumber = 0

const OrderStatus = Object.freeze({
    WAITING: 'Waiting',
    SERVED: 'Served'
  });

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
  

let clients = []


wsClient.on('message', (data) => {

    const message = JSON.parse(data);

    if(message.action == Actions.UPDATE_MEALS){

        Meals = message.data

        broadcast(
            {
                action:Actions.UPDATE_MEALS,
                data: Meals
            }
        )
    }

});


wss.on('connection', (ws) => {

    // here we are adding clients to clint list


    ws.send(JSON.stringify(
        {
            action:Actions.UPDATE_MEALS,
            data: Meals
        }
    ))

    clients.push(ws);

    console.log('Client connected');
    
    ws.send('Hello, WebSocket client!');

    ws.on('message', (data) => {

        const message = JSON.parse(data);
        if(message.action == Actions.ADD_PREPARED_MEAL){
            let Meal = Meals.find(m => m.name == message.data)

            if(Meal){
                Meal.prepared += 1

                broadcast({
                    action:Actions.UPDATE_MEALS,
                    data:Meals
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

const port = 5000;
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
