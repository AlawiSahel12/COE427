// src/pages/QueuePage.jsx
import React, { useEffect, useState } from 'react';
import { Layout, List, Typography, Badge, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function QueuePage() {
  // Sample orders data; in a real app, fetch this from your backend
  const [orders, setOrders] = useState([
    { orderId: 101, status: 'Preparing' },
    { orderId: 102, status: 'Ready' },
    { orderId: 103, status: 'Preparing' },
    { orderId: 104, status: 'Ready' },
    { orderId: 105, status: 'Preparing' },
    // ...more orders
  ]);

  // Function to simulate real-time updates (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate order status updates
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.status === 'Preparing' && Math.random() > 0.7
            ? { ...order, status: 'Ready' }
            : order
        )
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Separate orders by status
  const preparingOrders = orders.filter(
    (order) => order.status === 'Preparing'
  );
  const readyOrders = orders.filter((order) => order.status === 'Ready');

  return (
    <Layout>
      <Header>
        <Title level={2} style={{ color: 'white', textAlign: 'center' }}>
          Order Status
        </Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Title level={3}>Preparing Orders</Title>
            <List
              bordered
              dataSource={preparingOrders}
              renderItem={(order) => (
                <List.Item>
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    <Badge status="processing" />
                    <strong>Order #{order.orderId}</strong>
                  </div>
                </List.Item>
              )}
              style={{ maxHeight: '400px', overflowY: 'auto' }}
            />
          </Col>
          <Col xs={24} md={12}>
            <Title level={3}>Ready Orders</Title>
            <List
              bordered
              dataSource={readyOrders}
              renderItem={(order) => (
                <List.Item>
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    <Badge status="success" />
                    <strong>Order #{order.orderId}</strong>
                  </div>
                </List.Item>
              )}
              style={{ maxHeight: '400px', overflowY: 'auto' }}
            />
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Al Baik ©2024</Footer>
    </Layout>
  );
}

export default QueuePage;
