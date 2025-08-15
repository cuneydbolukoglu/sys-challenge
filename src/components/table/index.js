import { useState, useEffect } from "react";
import { Table, Input } from "antd";

const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
};

const GlobalTable = (props) => {
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(props.data || []);

    useEffect(() => {
        setFilteredData(props.data || []);
    }, [props.data]);

    const handleSearch = (value) => {
        setSearchText(value);

        const searchValue = value.toLocaleLowerCase("tr");

        const newData = props.data.filter(item =>
            Object.entries(item).reduce((found, [key, field]) => {
                if (found) return true;

                let fieldValue = String(field);

                if (key === 'Gender') {
                    fieldValue = field === 'M' ? 'Erkek' : 'Kadın';
                }

                if (key === 'Segment') {
                    if (field === 'A') fieldValue = 'Aile';
                    else if (field === 'E') fieldValue = 'Emekli';
                    else if (field === 'G') fieldValue = 'Genç';
                }

                if (Array.isArray(fieldValue)) {
                    return fieldValue.some(f => f.toLocaleLowerCase("tr").includes(searchValue));
                }

                return fieldValue.toLocaleLowerCase("tr").includes(searchValue);

            }, false)
        );

        setFilteredData(newData);
    };

    return (
        <div>
            <Input.Search
                placeholder="Ara..."
                allowClear
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ marginBottom: 16, width: 300 }}
            />
            <Table
                columns={props.columns}
                dataSource={filteredData}
                onChange={onChange}
                rowKey={(record) => record.id}
                {...props}
            />
        </div>
    );
};

export default GlobalTable;