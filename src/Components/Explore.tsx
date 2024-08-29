
// import React, { useEffect, useState, useCallback } from 'react';
// import { AudioOutlined, LoadingOutlined } from '@ant-design/icons';
// import { Row, Col, Input, Space, Card, Avatar, Button, Alert } from 'antd';

// interface DataItem {
//   id: string;
//   name: string;
//   ticker: string;
// }

// const { Search } = Input;

// const Explore: React.FC = () => {
//   const [data, setData] = useState<DataItem[]>([]);
//   const [filteredData, setFilteredData] = useState<DataItem[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [page, setPage] = useState<number>(1);
//   const [hasNextPage, setHasNextPage] = useState<boolean>(true);
//   const [fetching, setFetching] = useState<boolean>(false);
//   const [apiLimitExceeded, setApiLimitExceeded] = useState<boolean>(false);

//   const fetchData = async (pageParam: number, retry: boolean = false) => {
//     if (retry) {
//       setError(null);
//       setApiLimitExceeded(false);
//     }

//     setLoading(true);
//     setFetching(true);
//     try {
//       const response = await fetch(`https://api.polygon.io/v3/reference/tickers?active=true&limit=20&page=${pageParam}&apiKey=wTLX7m7P5HpNZSo2xcmoHHlh2MdbdRHS`);
      
//       if (!response.ok) {
//         if (response.status === 429) {
//           // API rate limit exceeded
//           setApiLimitExceeded(true);
//           throw new Error('API rate limit exceeded. Please try again later.');
//         } else {
//           throw new Error('Network response was not ok');
//         }
//       }

//       const result = await response.json();
//       setData(prevData => [...prevData, ...result.results]);
//       setFilteredData(prevFilteredData => [
//         ...prevFilteredData,
//         ...result.results.filter((item: { name: string; ticker: string; }) =>
//           item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.ticker.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       ]);
//       setHasNextPage(result.results.length > 0); // Determine if more pages are available
//     } catch (error) {
//       setError((error as Error).message || 'An error occurred');
//     } finally {
//       setLoading(false);
//       setFetching(false);
//     }
//   };

//   useEffect(() => {
//     if (!apiLimitExceeded) {
//       fetchData(page);
//     }
//   }, [page]);

//   const onSearch = (value: string) => {
//     setSearchTerm(value);
//     // Clear previous errors
//     setError(null);
//     setApiLimitExceeded(false);
//     // Reset data and page when search term changes
//     setData([]);
//     setFilteredData([]);
//     setPage(1);
//     fetchData(1);
//   };

//   const handleRetry = () => {
//     fetchData(page, true);
//   };

//   const loadMore = useCallback(() => {
//     if (!fetching && hasNextPage) {
//       setPage(prevPage => prevPage + 1);
//     }
//   }, [fetching, hasNextPage]);

//   const suffix = loading ? <LoadingOutlined /> : <AudioOutlined style={{ fontSize: 16, color: '#1677ff' }} />;

//   return (
//     <Space direction="vertical" style={{ width: '100%', padding: '20px' }}>
//       <Search
//         placeholder="Search for stocks by entering ticker e.g., AAPL, MSFT"
//         allowClear
//         enterButton="Search"
//         size="large"
//         suffix={suffix}
//         onSearch={onSearch}
//         loading={loading}
//       />
//       <br />
//       {apiLimitExceeded && (
//         <div>
//           <Alert message="Error" description="API rate limit exceeded. Please try again later." type="error" showIcon />
//           <Button type="primary" onClick={handleRetry} style={{ marginTop: '20px' }}>
//             Retry
//           </Button>
//         </div>
//       )}
//       {error && !apiLimitExceeded && (
//         <div>
//           <Alert message="Error" description={error} type="error" showIcon />
//         </div>
//       )}
//       <Row gutter={[16, 16]} justify="center">
//         {filteredData.length > 0 ? (
//           filteredData.map((item) => (
//             <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
//               <Card style={{ width: '100%' }}>
//                 <Card.Meta
//                   avatar={<Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>{item.ticker[0]}</Avatar>}
//                   title={item.ticker}
//                   description={item.name}
//                 />
//               </Card>
//             </Col>
//           ))
//         ) : (
//           searchTerm && !loading && !apiLimitExceeded && <p>No stock found</p>
//         )}
//       </Row>
//       {hasNextPage && !loading && (
//         <Button
//           type="primary"
//           onClick={loadMore}
//           loading={fetching}
//           style={{ marginTop: '20px' }}
//         >
//           Load More
//         </Button>
//       )}
//     </Space>
//   );
// };

// export default Explore;

import React, { useEffect, useState, useCallback } from 'react';
import { AudioOutlined, LoadingOutlined } from '@ant-design/icons';
import { Row, Col, Input, Space, Card, Avatar, Button, Alert } from 'antd';

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
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [fetching, setFetching] = useState<boolean>(false);
  const [apiLimitExceeded, setApiLimitExceeded] = useState<boolean>(false);

  const fetchData = async (pageParam: number, retry: boolean = false) => {
    if (retry) {
      setError(null);
      setApiLimitExceeded(false);
    }

    setLoading(true);
    setFetching(true);
    try {
      const response = await fetch(`https://api.polygon.io/v3/reference/tickers?active=true&limit=20&page=${pageParam}&apiKey=wTLX7m7P5HpNZSo2xcmoHHlh2MdbdRHS`);
      
      if (!response.ok) {
        if (response.status === 429) {
          // API rate limit exceeded
          setApiLimitExceeded(true);
          throw new Error('API rate limit exceeded. Please try again later.');
        } else {
          throw new Error('Network response was not ok');
        }
      }

      const result = await response.json();
      setData(prevData => [...prevData, ...result.results]);
      setFilteredData(prevFilteredData => [
        ...prevFilteredData,
        ...result.results.filter((item: { name: string; ticker: string; }) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.ticker.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ]);
      setHasNextPage(result.results.length > 0); // Determine if more pages are available
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!apiLimitExceeded) {
      fetchData(page);
    }
  }, [page, apiLimitExceeded]); // Added apiLimitExceeded to dependencies

  const onSearch = (value: string) => {
    setSearchTerm(value);
    // Clear previous errors
    setError(null);
    setApiLimitExceeded(false);
    // Reset data and page when search term changes
    setData([]);
    setFilteredData([]);
    setPage(1);
    fetchData(1);
  };

  const handleRetry = () => {
    fetchData(page, true);
  };

  const loadMore = useCallback(() => {
    if (!fetching && hasNextPage) {
      setPage(prevPage => prevPage + 1);
    }
  }, [fetching, hasNextPage]);

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
      {apiLimitExceeded && (
        <div>
          <Alert message="Error" description="API rate limit exceeded. Please try again later." type="error" showIcon />
          <Button type="primary" onClick={handleRetry} style={{ marginTop: '20px' }}>
            Retry
          </Button>
        </div>
      )}
      {error && !apiLimitExceeded && (
        <div>
          <Alert message="Error" description={error} type="error" showIcon />
        </div>
      )}
      <Row gutter={[16, 16]} justify="center">
        {filteredData.length > 0 ? (
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
          searchTerm && !loading && !apiLimitExceeded && <p>No stock found</p>
        )}
      </Row>
      {hasNextPage && !loading && (
        <Button
          type="primary"
          onClick={loadMore}
          loading={fetching}
          style={{ marginTop: '20px' }}
        >
          Load More
        </Button>
      )}
    </Space>
  );
};

export default Explore;


