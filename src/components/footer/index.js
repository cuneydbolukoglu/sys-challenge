import { Layout } from 'antd';

const { Footer } = Layout;

const GlobalFooter = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>
            Sys Challenge © {new Date().getFullYear()}
        </Footer>
    );
};

export default GlobalFooter;