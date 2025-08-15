import { ManOutlined, WomanOutlined } from '@ant-design/icons';

const utils = {
    generateFilters: (columns, data) => {
        const filterMap = {};
    
        columns.forEach(column => {
            const { dataIndex } = column;
            if (!dataIndex) return;
    
            const uniqueValues = Array.from(
                new Set(data.map(row => row[dataIndex]))
            );
    
            filterMap[dataIndex] = uniqueValues.map(value => {
                let text = String(value);
    
                // Gender ve Segment
                if (dataIndex === 'Gender') {
                    text = value === 'M' ? 'Erkek' : 'Kadın';
                }
    
                if (dataIndex === 'Segment') {
                    if (value === 'A') text = 'Aile';
                    else if (value === 'E') text = 'Emekli';
                    else if (value === 'G') text = 'Genç';
                }
    
                return { text, value };
            });
        });
    
        return filterMap;
    },    
    getGenderIcon: (value) => {
        if (value == 'F') {
            return <WomanOutlined style={{ color: '#eb2f96' }} />
        } else {
            return <ManOutlined style={{ color: '#1677ff' }} />
        }
    },
    getSegment: (value) => {
        if (value == 'A') {
            return 'Aile'
        } else if (value == 'E') {
            return 'Emekli'
        } else if (value == 'G') {
            return 'Genç'
        }
    }
}

export default utils;