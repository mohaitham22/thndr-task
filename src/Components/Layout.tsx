
    import React from 'react';
    import { Layout as AntLayout } from 'antd';
    import { theme } from 'antd';
    import Image from 'next/image';

    const { Header, Content } = AntLayout;

    const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <AntLayout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center', padding: '0px 20px' }}>
            <div className="demo-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image
                src="/image 1.png" 
                alt="Logo"
                width={120} 
                height={40} 
            />
            </div>
        </Header>
        <AntLayout style={{ flex: 1     }}>
            <AntLayout style={{ padding: '0 0px', background: colorBgContainer }}>
            <Content style={{ padding: '0px', minHeight: 'calc(100vh - 136px)' }}>
                {children}
            </Content>
            </AntLayout>
        </AntLayout>
        </AntLayout>
    );
    };

    export default Layout;
