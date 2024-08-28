// /* eslint-disable react/no-unescaped-entities */


// import React, { useEffect, useState } from 'react';
// import { AudioOutlined } from '@ant-design/icons';
// import { Row, Col, Input, Space, Typography } from 'antd';
// import Cards from './Cards'; 

// const { Search } = Input;
// const { Title } = Typography;

// interface DataItem {
//   id: string;
//   name: string;
//   ticker: string;
// }

// const Explore: React.FC = () => {
//   const [data, setData] = useState<DataItem[]>([]);
//   const [filteredData, setFilteredData] = useState<DataItem[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [initialLoad, setInitialLoad] = useState<boolean>(true); 

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setInitialLoad(true);
//       try {
//         const response = await fetch('https://api.polygon.io/v3/reference/tickers?active=true&limit=100&apiKey=wTLX7m7P5HpNZSo2xcmoHHlh2MdbdRHS');
//         const result = await response.json();
//         setData(result.results);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//       setLoading(false);
//       setInitialLoad(false);
//     };

//     fetchData();
//   }, []);

//   const onSearch = (value: string) => {
//     setSearchTerm(value);
//     const filtered = data.filter(item =>
//       item.name.toLowerCase().includes(value.toLowerCase()) ||
//       item.ticker.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   return (
//     <Space direction="vertical" style={{ width: '100%', padding: '20px' }}>
//       <Search
//         placeholder="Search for stocks by entering ticker e.g., AAPL, MSFT"
//         allowClear
//         enterButton="Search"
//         size="large"
//         onSearch={onSearch}
//       />
//       <br />
//       {initialLoad ? (
//         <Typography.Text>Loading...</Typography.Text>
//       ) : (
//         <>
//           {searchTerm && filteredData.length === 0 && !loading ? (
//             <Title level={4}>No results found for "{searchTerm}"</Title>
//           ) : (
//             <Cards data={filteredData} loading={loading} />
//           )}
//         </>
//       )}
//     </Space>
//   );
// };

// export default Explore;


import React, { useEffect, useState } from 'react';
import { AudioOutlined, LoadingOutlined } from '@ant-design/icons';
import { Row, Col, Input, Space, Card, Avatar } from 'antd';

interface DataItem {
  id: string;
  name: string;
  ticker: string;
}

const { Search } = Input;

const Explore: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.polygon.io/v3/reference/tickers?active=true&limit=100&apiKey=wTLX7m7P5HpNZSo2xcmoHHlh2MdbdRHS');
        const result = await response.json();
        setData(result.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const onSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.ticker.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const suffix = loading ? <LoadingOutlined /> : <AudioOutlined style={{ fontSize: 16, color: '#1677ff' }} />;

  return (
    <Space direction="vertical" style={{ width: '100%', padding: '20px' }}>
      <Search
        placeholder="Search for stocks by entering ticker e.g., AAPL, MSFT"
        allowClear
        enterButton="Search"
        size="large"
        suffix={suffix}
        onSearch={onSearch}
        loading={loading}
      />
      <br />
      <Row gutter={[16, 16]} justify="center">
        {searchTerm && filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
              <Card style={{ width: '100%' }}>
                <Card.Meta
                  avatar={<Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>{item.ticker[0]}</Avatar>}
                  title={item.ticker}
                  description={item.name}
                />
              </Card>
            </Col>
          ))
        ) : (
          searchTerm && filteredData.length === 0 && !loading && <p>No results found</p>
        )}
      </Row>
    </Space>
  );
};

export default Explore;
