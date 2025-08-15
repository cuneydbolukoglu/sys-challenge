import { useEffect, useState } from "react";
import GlobalTable from "@/components/table";
import utils from "@/utils";
import { Button, Tooltip, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import CrudModal from "@/components/crudModal";
import useCustomerStore from "@/zustand/store/useCustomer";
import { useGlobalNotification } from "@/helper/globalNotification";

const CustomerData = () => {
    const notif = useGlobalNotification();
    const { customerData, getCustomer, deleteCustomer, isLoading } = useCustomerStore();
    const [filters, setFilters] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [crudMethod, setCrudMethod] = useState('add');

    const formFields = [
        { key: 'Fullname', label: 'Ad Soyad', type: 'string', required: true },
        { key: 'Age', label: 'Yaş', type: 'number', required: true },
        { key: 'City', label: 'Şehir', type: 'string' },
        {
            key: 'Gender',
            label: 'Cinsiyet',
            type: 'select',
            choices: [
                { key: 'M', value: 'Erkek' },
                { key: 'F', value: 'Kadın' }
            ],
            required: true
        },
        {
            key: 'Segment',
            label: 'Müşteri Grubu',
            type: 'select',
            choices: [
                { key: 'G', value: 'Genç' },
                { key: 'A', value: 'Aile' },
                { key: 'E', value: 'Emekli' }
            ]
        },
        { key: 'TotalAmount', label: 'Toplam Tutar', type: 'number' },
    ];

    useEffect(() => {
        getCustomer();
    }, [getCustomer]);

    useEffect(() => {
        const tableFilters = utils.generateFilters(columns, customerData);
        setFilters(tableFilters);
    }, [customerData]);

    const handleAdd = () => {
        setCrudMethod('add');
        setModalVisible(true);
    };
    
    const handleEdit = (record) => {
        setCrudMethod('edit');
        setModalData(record);
        setModalVisible(true);
    };

    const handleDelete = async (record) => {
        try {
            await deleteCustomer(record.id);
            notif.success({ message: 'Başarılı', description: 'Kayıt silindi', duration: 3 });
        } catch (error) {
            notif.error({ message: 'Hata', description: error.message, duration: 3 });
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setCrudMethod('add');
        setModalData(null);
    };

    const columns = [
        { title: 'ID', dataIndex: 'id' },
        {
            title: 'Ad Soyad',
            dataIndex: 'Fullname',
            filters: filters.Fullname || [],
            filterSearch: true,
            onFilter: (value, record) => record.Fullname.includes(value),
        },
        {
            title: 'Yaş',
            dataIndex: 'Age',
            filters: filters.Age || [],
            filterSearch: true,
            onFilter: (value, record) => record.Age === value,
        },
        {
            title: 'Şehir',
            dataIndex: 'City',
            filters: filters.City || [],
            filterSearch: true,
            onFilter: (value, record) => record.City.includes(value),
        },
        {
            title: 'Cinsiyet',
            dataIndex: 'Gender',
            filters: filters.Gender || [],
            filterSearch: true,
            render: (value) => utils.getGenderIcon(value),
            onFilter: (value, record) => record.Gender.includes(value),
        },
        {
            title: 'Müşteri Grubu',
            dataIndex: 'Segment',
            filters: filters.Segment || [],
            filterSearch: true,
            render: (value) => utils.getSegment(value),
            onFilter: (value, record) => record.Segment.includes(value),
        },
        {
            title: 'Toplam Tutar',
            dataIndex: 'TotalAmount',
            filters: filters.TotalAmount || [],
            filterSearch: true,
            onFilter: (value, record) => record.TotalAmount === value,
        },
        {
            title: 'Aksiyonlar',
            key: 'actions',
            render: (value, record) => (
                <div>
                    <Tooltip title="Düzenle">
                        <Button
                            type="primary"
                            size="small"
                            style={{ marginRight: 5 }}
                            onClick={() => handleEdit(record)}
                        >
                            <EditOutlined />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Sil">
                        <Popconfirm
                            title="Silmek istediğinize emin misin?"
                            onConfirm={() => handleDelete(record)}
                            okText="Evet"
                            cancelText="Hayır"
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        >
                            <Button danger size="small">
                                <DeleteOutlined />
                            </Button>
                        </Popconfirm>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <>
            <Button
                type="primary"
                onClick={() => handleAdd()}
                style={{ float: 'right', marginBottom: 10 }}
            >
                Müşteri Ekle
            </Button>
            <GlobalTable
                columns={columns}
                data={customerData}
                loading={isLoading}
            />
            <CrudModal
                modalVisible={modalVisible}
                closeModal={closeModal}
                formFields={formFields}
                method={crudMethod}
                onChange={getCustomer}
                editData={modalData}
            />
        </>
    );
};

export default CustomerData;

CustomerData.pageTitle = "Müşteri Verileri";