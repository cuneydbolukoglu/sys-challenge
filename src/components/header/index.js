import { Layout, theme } from 'antd';

const { Header } = Layout;

const GlobalHeader = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Header style={{ padding: 0, background: colorBgContainer }} />
    );
};

export default GlobalHeader;