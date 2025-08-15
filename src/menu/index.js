import { UserOutlined, PieChartOutlined } from '@ant-design/icons';
import Link from 'next/link';

const menu = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: (<Link href="/customerData">Müşteri Verileri</Link>),
    },
    {
        key: '2',
        icon: <PieChartOutlined />,
        label: (<Link href="/graphics">Grafikler</Link>)
    }
];

export default menu;