// src/pages/KitchenPage.jsx
import React, { useState } from 'react';
import { Layout, List, Card, Checkbox, Typography, Button } from 'antd';
// import { CheckOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function KitchenPage() {
  // Sample orders data; in a real app, fetch this from your backend
  const [orders, setOrders] = useState([
    {
      orderId: 1,
      items: [
        { name: 'Chicken Meal', prepared: false },
        { name: 'Fries', prepared: false },
      ],
    },
    {
      orderId: 2,
      items: [{ name: 'Fish Meal', prepared: false }],
    },
    // ...more orders
  ]);

  // Function to toggle the prepared status of an item
  const toggleItemPrepared = (orderId, itemName) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId
          ? {
              ...order,
              items: order.items.map((item) =>
                item.name === itemName
                  ? { ...item, prepared: !item.prepared }
                  : item
              ),
            }
          : order
      )
    );
  };

  // Function to check if all items in an order are prepared
  const isOrderPrepared = (order) => order.items.every((item) => item.prepared);

  // Function to handle marking an order as ready
  const markOrderAsReady = (orderId) => {
    // In a real app, update the order status in the backend
    console.log(`Order ${orderId} is ready.`);
    // Remove the order from the list
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.orderId !== orderId)
    );
  };

  return (
    <Layout>
      <Header>
        <Title level={2} style={{ color: 'white' }}>
          Kitchen Orders
        </Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        {orders.length === 0 ? (
          <Title level={4}>No orders to prepare.</Title>
        ) : (
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={orders}
            renderItem={(order) => (
              <List.Item>
                <Card
                  title={`Order #${order.orderId}`}
                  extra={
                    isOrderPrepared(order) && (
                      <Button
                        type="primary"
                        onClick={() => markOrderAsReady(order.orderId)}
                      >
                        Mark as Ready
                      </Button>
                    )
                  }
                >
                  <List
                    dataSource={order.items}
                    renderItem={(item) => (
                      <List.Item>
                        <Checkbox
                          checked={item.prepared}
                          onChange={() =>
                            toggleItemPrepared(order.orderId, item.name)
                          }
                        >
                          {item.name}
                        </Checkbox>
                      </List.Item>
                    )}
                  />
                </Card>
              </List.Item>
            )}
          />
        )}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Al Baik ©2024</Footer>
    </Layout>
  );
}

export default KitchenPage;
