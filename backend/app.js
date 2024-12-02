const express = require('express');
const WebSocket = require('ws');
const app = express();
const http = require('http');
const server = http.createServer(app);
let { Orders, Meals, Sandwiches } = require('./models/models');
const fs = require('fs');

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



// function saveState() {
//     const state = {
//         Orders: Orders,
//         Meals: Meals,
//         Sandwiches: Sandwiches
//     };
    
//     fs.writeFileSync('state.json', JSON.stringify(state), 'utf-8');
//     console.log('State saved!');
// }

// function loadState() {
//     if (fs.existsSync('state.json')) {
//         const data = fs.readFileSync('state.json', 'utf-8');
//         const state = JSON.parse(data);

//         Orders = state.Orders || [];
//         Meals = state.Meals || [];
//         Sandwiches = state.Sandwiches || [];
//         console.log('State loaded from file!');
//     } else {
//         console.log('No previous state found, starting with empty data.');
//     }
// }

// loadState();







function broadcastAll(ws){

    
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

}


wss.on('connection', (ws) => {

    // here we are adding clients to clint list
    clients.push(ws);

    console.log('Client connected');
    
    ws.send('Hello, WebSocket client!');

    broadcastAll(ws)


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

            saveState()
        

            }catch (error)  {
                console.log(error)

            }

        }

        else if(message.action == Actions.ADD_PREPARED_MEAL){
            let Meal = Meals.find(m => m.name == message.data)

            if(Meal){
                Meal.prepared += 1

                broadcast({
                    action:Actions.UPDATE_MEALS,
                    data:Meals
                })
            }
            saveState()


        }
        else if(message.action == Actions.ADD_PREPARED_SANDWICH){
            let Sandwich = Sandwiches.find(s => s.name == message.data)

            if(Sandwich){
                Sandwich.prepared += 1

                broadcast({
                    action:Actions.UPDATE_SANDWICH,
                    data:Sandwiches
                })

                saveState()
            }


        }
        else if(message.action == Actions.UPDATE_ORDER_STATE){

            console.log(message.data)

            let order = Orders.find(o => o.orderNumber == message.data)

            if(order){
                order.status = OrderStatus.SERVED
                let broadcastMessage = {
                    action:Actions.ORDER_LIST_UPDATE,
                    data: Orders
                }
                broadcast(broadcastMessage)

                setTimeout(() => {
                    // Remove the served order after 20 seconds
                    Orders = Orders.filter(o => o.orderNumber !== order.orderNumber);
        
                    // Broadcast the updated list of orders (with the served order removed)
                    broadcast({
                        action: Actions.ORDER_LIST_UPDATE,
                        data: Orders
                    });

                    saveState()
        
                    console.log(`Order ${order.orderNumber} removed after 20 seconds`);
                }, 20000);
            }

        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');

        clients = clients.filter((client) => client !== ws);

    });
});


let websocketClient;

const connectWebSocket = () => {
  // Create a new WebSocket client
  websocketClient = new WebSocket('ws://10.83.203.9:3000');

  websocketClient.on('open', () => {
    console.log('Connected to the remote WebSocket server.');

    // Send a message to the remote WebSocket server
    websocketClient.send('Hello from Express WebSocket client!');
  });

  websocketClient.on('message', (data) => {
    const message = JSON.parse(data);

    if (message.action === Actions.UPDATE_MEALS) {
      Meals = message.data;
    } else if (message.action === Actions.UPDATE_SANDWICH) {
      Sandwiches = message.data;
    } else if (message.action === Actions.ORDER_LIST_UPDATE) {
      if (message.data != null) {
        OrderNumber = message.data.pop().orderNumber;
      }
      Orders = message.data;
    }
  });

  websocketClient.on('close', () => {
    setTimeout(connectWebSocket, 3000); // Retry connection after 3 seconds
  });

  websocketClient.on('error', (error) => {
    setTimeout(connectWebSocket, 3000); // Retry connection after 3 seconds
  });
};

// Initial connection attempt
connectWebSocket();


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


app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });

function broadcast(message) {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
}
