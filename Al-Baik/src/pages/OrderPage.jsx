// src/pages/OrderPage.jsx
import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Button,
  Form,
  InputNumber,
  Select,
  Divider,
  List,
  Typography,
} from 'antd';

const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { Title } = Typography;

const menuItems = [
  { name: 'Chicken Meal', price: 20 },
  { name: 'Fish Meal', price: 18 },
  { name: 'Shrimp Meal', price: 22 },
  { name: 'Fries', price: 5 },
  { name: 'Drink', price: 3 },
];

function OrderPage() {
  const [orderItems, setOrderItems] = useState([]);

  const onFinish = (values) => {
    const item = menuItems.find((menuItem) => menuItem.name === values.item);
    const totalPrice = item.price * values.quantity;

    const newOrderItem = {
      ...values,
      price: item.price,
      totalPrice,
    };

    setOrderItems([...orderItems, newOrderItem]);
  };

  const handleSubmitOrder = () => {
    // Here you would send the order to the backend server
    // For now, we'll just reset the order items
    console.log('Order submitted:', orderItems);
    setOrderItems([]);
  };

  return (
    <Layout>
      <Header>
        <Title level={2} style={{ color: 'white' }}>
          Al Baik Order System
        </Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Form layout="inline" onFinish={onFinish}>
          <Form.Item
            name="item"
            rules={[{ required: true, message: 'Please select an item!' }]}
          >
            <Select placeholder="Select Item" style={{ width: 200 }}>
              {menuItems.map((menuItem) => (
                <Option key={menuItem.name} value={menuItem.name}>
                  {menuItem.name} - SAR {menuItem.price}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="quantity"
            rules={[{ required: true, message: 'Please input quantity!' }]}
          >
            <InputNumber min={1} placeholder="Quantity" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add to Order
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <List
          header={<div>Order Items</div>}
          bordered
          dataSource={orderItems}
          renderItem={(item) => (
            <List.Item>
              {item.quantity} x {item.item} @ SAR {item.price} each - Total: SAR{' '}
              {item.totalPrice}
            </List.Item>
          )}
        />
        <Button
          type="primary"
          onClick={handleSubmitOrder}
          disabled={orderItems.length === 0}
          style={{ marginTop: '20px' }}
        >
          Submit Order
        </Button>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Al Baik ©2024</Footer>
    </Layout>
  );
}

export default OrderPage;
