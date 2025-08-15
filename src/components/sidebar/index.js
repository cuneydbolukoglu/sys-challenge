import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import menu from '@/menu';

const { Sider } = Layout;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
            <div style={{ fontSize: 20, color: '#fff', padding: 20, textAlign: 'center' }}>Challenge</div>
            <Menu theme="dark" defaultSelectedKeys={['']} mode="inline" items={ menu } />
        </Sider>
    );
};

export default Sidebar;