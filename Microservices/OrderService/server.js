const express = require('express');
const WebSocket = require('ws');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Orders, Meals, Sandwiches } = require('./models/models');



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



wss.on('connection', (ws) => {

    // here we are adding clients to clint list
    clients.push(ws);

    console.log('Client connected');
    
    ws.send('Hello, WebSocket client!');

    ws.send(JSON.stringify(
        {
            action:Actions.ORDER_LIST_UPDATE,
            data: Orders
        }
    ))
    ws.send(JSON.stringify(
        {
            action:Actions.UPDATE_MEALS,
            data: Meals
        }
    ))
    ws.send(JSON.stringify(
        {
            action:Actions.UPDATE_SANDWICH,
            data: Sandwiches
        }
    ))


    ws.on('message', (data) => {

        const message = JSON.parse(data);

        if(message.action == Actions.NEW_ORDER){

            try{

                OrderNumber =  OrderNumber + 1 > 999 ? 1 : OrderNumber + 1

                const order = {

                    orderNumber: OrderNumber, 
                    items: message.data.items,
                    status: OrderStatus.WAITING,
                }

                ws.send(JSON.stringify(
                    {
                        action:Actions.ORDER_CREATION,
                        data:order
                    }
                ))

            
                Orders.push(order)

                let broadcastMessage = {
                    action:Actions.ORDER_LIST_UPDATE,
                    data: Orders
                }

                // reading order items
                message.data.items.forEach((item)=>{

                    let Sandwich = Sandwiches.find(s => s.name == item.name)

                    if(Sandwich){
                        Sandwich.required += item.quantity

                    }else{
                        let Meal = Meals.find(m => m.name == item.name)

                        if(Meal){
                            Meal.required += item.quantity
                        }

               }
    
                
            })

            // to kitchen
            const broadcastMeal = {
                action: Actions.UPDATE_MEALS,
                data: Meals
            }

            const broadcastSandwich = {
                action: Actions.UPDATE_SANDWICH,
                data: Sandwiches
            }

            broadcast(broadcastMessage)

            broadcast(broadcastMeal)

            broadcast(broadcastSandwich)
        

            }catch (error)  {
                console.log(error)

            }

        }

        else if(message.action == Actions.UPDATE_ORDER_STATE){

            console.log(message.data)

            let order = Orders.find(o => o.orderNumber == message.data)

            if(order){
                console.log("hi")
                order.status = OrderStatus.SERVED
                let broadcastMessage = {
                    action:Actions.ORDER_LIST_UPDATE,
                    data: Orders
                }
                broadcast(broadcastMessage)
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

const port = 3000;
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
