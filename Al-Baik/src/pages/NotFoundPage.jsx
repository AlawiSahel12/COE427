// src/pages/NotFoundPage.jsx
import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404 - Page Not Found"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Back to Order Page
        </Button>
      }
    />
  );
}

export default NotFoundPage;
