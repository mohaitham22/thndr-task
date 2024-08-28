
import React from 'react';
import { Card, Row, Col, Typography, Spin } from 'antd';

const { Title } = Typography;

interface DataItem {
  id: string;
  ticker: string;
  name: string;
}

interface CardsProps {
  data: DataItem[];
  loading: boolean; // Add loading prop
}

const Cards: React.FC<CardsProps> = ({ data, loading }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      {loading ? (
        <Spin size="large" />
      ) : data.length > 0 ? (
        <Row gutter={[16, 16]} justify="center">
          {data.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
              <Card title={item.ticker} style={{ width: '100%' }}>
                <p>{item.name}</p>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Title level={4}>No data available</Title>
      )}
    </div>
  );
};

export default Cards;
