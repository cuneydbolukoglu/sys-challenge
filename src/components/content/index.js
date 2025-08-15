import { Breadcrumb, Layout, theme } from 'antd';

const { Content } = Layout;

const GlobalContent = ({ children, pageTitle }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }} items={
                [
                    { title: 'Ana Sayfa', href: '/' },
                    { title: pageTitle }
                ]} />
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                {children}
            </div>
        </Content>
    );
};

export default GlobalContent;