// src/pages/StaffPage.jsx
import React, { useEffect, useState } from 'react';
import { Layout, List, Card, Button, Typography, Modal } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function StaffPage() {
  // Sample ready orders data; in a real app, fetch this from your backend
  const [readyOrders, setReadyOrders] = useState([
    { orderId: 1, items: ['Chicken Meal', 'Fries'] },
    { orderId: 2, items: ['Fish Meal'] },
    // ...more orders
  ]);

  // Function to handle marking an order as served
  const markOrderAsServed = (orderId) => {
    // In a real app, update the order status in the backend
    console.log(`Order ${orderId} has been served.`);
    // Remove the order from the list
    setReadyOrders((prevOrders) =>
      prevOrders.filter((order) => order.orderId !== orderId)
    );
    // Optionally, display a confirmation modal or notification
    Modal.success({
      title: 'Order Served',
      content: `Order #${orderId} has been marked as served.`,
    });
  };

  return (
    <Layout>
      <Header>
        <Title level={2} style={{ color: 'white' }}>
          Staff Dashboard
        </Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        {readyOrders.length === 0 ? (
          <Title level={4}>No orders ready to serve.</Title>
        ) : (
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={readyOrders}
            renderItem={(order) => (
              <List.Item>
                <Card
                  title={`Order #${order.orderId}`}
                  actions={[
                    <Button
                      type="primary"
                      onClick={() => markOrderAsServed(order.orderId)}
                    >
                      Mark as Served
                    </Button>,
                  ]}
                >
                  <List
                    dataSource={order.items}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
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

export default StaffPage;
