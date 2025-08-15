import { Layout } from 'antd';
import GlobalFooter from '../footer';
import GlobalHeader from '../header';
import Sidebar from '../sidebar';
import GlobalContent from '../content';

const GlobalLayout = ({ children, pageTitle }) => {

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout>
                <GlobalHeader />
                <GlobalContent children={children} pageTitle={pageTitle} />
                <GlobalFooter />
            </Layout>
        </Layout>
    );
};

export default GlobalLayout;