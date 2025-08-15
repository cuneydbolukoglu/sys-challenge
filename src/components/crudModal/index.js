import React, { useState, useEffect } from "react";
import { Drawer, Form, Input, InputNumber, Select, Button, Row, Col } from "antd";
import useCustomerStore from "@/zustand/store/useCustomer";
import { useGlobalNotification } from "@/helper/globalNotification";

const CrudModal = (props) => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({});
    const { modalVisible, closeModal, method, onChange, formFields, editData } = props;
    const { addCustomer, updateCustomer } = useCustomerStore();
    const notif = useGlobalNotification();

    useEffect(() => {
        if (method === 'edit' && editData) {
            setFormData(editData);
            form.setFieldsValue(editData);
        } else if (method === 'add') {
            setFormData({});
            form.resetFields();
        }
    }, [editData, method, form]);

    const Save = async () => {
        try {
            await form.validateFields();
        } catch {
            return;
        }

        if (method === 'add') {
            try {
                await addCustomer(formData);
                onChange();
                closeModal();
                notif.success({ message: 'Başarılı', description: 'Kayıt işlemi başarıyla gerçekleşti !', duration: 3 });
            } catch (error) {
                notif.error({ message: 'Hata', description: error.message, duration: 3 });
            }
        } else if (method === 'edit') {
            try {
                await updateCustomer(formData.id, formData);
                onChange();
                closeModal();
                notif.success({ message: 'Başarılı', description: 'Güncelleme işlemi başarıyla gerçekleşti !', duration: 3 });
            } catch (error) {
                notif.error({ message: 'Hata', description: error.message, duration: 3 });
            }
        }
    };

    return (
        <Drawer
            title={method.toUpperCase() + ' Modal'}
            closable={{ 'aria-label': 'Close Button' }}
            onClose={closeModal}
            open={modalVisible}
            width={700}
            style={{ padding: 20 }}
        >
            <Form layout="vertical" form={form}>
                <Row gutter={[4, 4]}>
                    {
                        formFields.map(itemField => {
                            if (itemField.type === 'string') {
                                return (
                                    <Col span={24} key={itemField.key}>
                                        <Form.Item
                                            name={itemField.key}
                                            label={itemField.label}
                                            rules={[{ required: itemField.required, message: 'Zorunlu Alan' }]}
                                        >
                                            <Input
                                                style={{ width: '100%' }}
                                                placeholder={itemField.label}
                                                onChange={(e) => {
                                                    setFormData(prevFormData => ({
                                                        ...prevFormData,
                                                        [itemField.key]: e.target.value,
                                                    }))
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                )
                            } else if (itemField.type === 'number') {
                                return (
                                    <Col span={24} key={itemField.key}>
                                        <Form.Item
                                            name={itemField.key}
                                            label={itemField.label}
                                            rules={[{ required: itemField.required, message: 'Zorunlu Alan' }]}
                                        >
                                            <InputNumber
                                                style={{ width: '100%' }}
                                                placeholder={itemField.label}
                                                onChange={(e) => {
                                                    setFormData(prevFormData => ({
                                                        ...prevFormData,
                                                        [itemField.key]: e,
                                                    }))
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                )
                            } else if (itemField.type === 'select') {
                                return (
                                    <Col span={24} key={itemField.key}>
                                        <Form.Item
                                            name={itemField.key}
                                            label={itemField.label}
                                            rules={[{ required: itemField.required, message: 'Zorunlu Alan' }]}
                                        >
                                            <Select
                                                defaultValue={itemField.default}
                                                style={{ width: '100%' }}
                                                placeholder={itemField.label}
                                                onChange={(e) => {
                                                    setFormData(prevFormData => ({
                                                        ...prevFormData,
                                                        [itemField.key]: e,
                                                    }))
                                                }}
                                                options={
                                                    itemField.choices.map(item => (
                                                        { value: item.key, label: item.value }
                                                    ))
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                )
                            }
                        })
                    }
                </Row>
            </Form>
            <Button
                type="primary"
                onClick={() => Save()}
                style={{ float: 'right', marginBottom: 10 }}
            >
                Kaydet
            </Button>
        </Drawer>
    );
};

export default CrudModal;