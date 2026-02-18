// Data processing utilities

const DataProcessor = {
    /**
     * Parse CSV string to array of objects
     */
    parseCSV(csvString) {
        const lines = csvString.trim().split('\n');
        if (lines.length === 0) return [];

        const headers = lines[0].split(',').map(h => h.trim());
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            const row = {};
            
            headers.forEach((header, index) => {
                const value = values[index];
                // Try to convert to number
                row[header] = isNaN(value) ? value : parseFloat(value);
            });
            
            data.push(row);
        }

        return data;
    },

    /**
     * Convert array of objects to CSV
     */
    toCSV(data) {
        if (!data || data.length === 0) return '';

        const headers = Object.keys(data[0]);
        const rows = data.map(row => 
            headers.map(header => {
                const value = row[header];
                return typeof value === 'string' && value.includes(',') 
                    ? `"${value}"` 
                    : value;
            }).join(',')
        );

        return [headers.join(','), ...rows].join('\n');
    },

    /**
     * Filter data by criteria
     */
    filterData(data, criteria) {
        return data.filter(row => {
            for (const [key, value] of Object.entries(criteria)) {
                if (row[key] !== value) return false;
            }
            return true;
        });
    },

    /**
     * Sort data by column
     */
    sortData(data, column, ascending = true) {
        return [...data].sort((a, b) => {
            const aVal = a[column];
            const bVal = b[column];
            
            if (aVal < bVal) return ascending ? -1 : 1;
            if (aVal > bVal) return ascending ? 1 : -1;
            return 0;
        });
    },

    /**
     * Group data by column
     */
    groupBy(data, column) {
        return data.reduce((groups, row) => {
            const key = row[column];
            if (!groups[key]) groups[key] = [];
            groups[key].push(row);
            return groups;
        }, {});
    },

    /**
     * Aggregate data
     */
    aggregate(data, groupColumn, valueColumn, aggregation = 'sum') {
        const grouped = this.groupBy(data, groupColumn);
        const result = [];

        for (const [key, rows] of Object.entries(grouped)) {
            const values = rows.map(r => r[valueColumn]).filter(v => typeof v === 'number');
            let aggregatedValue;

            switch(aggregation) {
                case 'sum':
                    aggregatedValue = values.reduce((a, b) => a + b, 0);
                    break;
                case 'avg':
                    aggregatedValue = values.reduce((a, b) => a + b, 0) / values.length;
                    break;
                case 'count':
                    aggregatedValue = values.length;
                    break;
                case 'min':
                    aggregatedValue = Math.min(...values);
                    break;
                case 'max':
                    aggregatedValue = Math.max(...values);
                    break;
                default:
                    aggregatedValue = values.length;
            }

            result.push({
                [groupColumn]: key,
                [valueColumn]: aggregatedValue
            });
        }

        return result;
    },

    /**
     * Normalize data to 0-1 range
     */
    normalize(data, column) {
        const values = data.map(d => d[column]).filter(v => typeof v === 'number');
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min;

        return data.map(row => ({
            ...row,
            [`${column}_normalized`]: (row[column] - min) / range
        }));
    },

    /**
     * Calculate moving average
     */
    movingAverage(data, column, window = 3) {
        const result = [];
        
        for (let i = 0; i < data.length; i++) {
            const start = Math.max(0, i - Math.floor(window / 2));
            const end = Math.min(data.length, i + Math.ceil(window / 2));
            const slice = data.slice(start, end);
            const values = slice.map(d => d[column]).filter(v => typeof v === 'number');
            const avg = values.reduce((a, b) => a + b, 0) / values.length;
            
            result.push({
                ...data[i],
                [`${column}_ma${window}`]: avg
            });
        }

        return result;
    },

    /**
     * Detect outliers using IQR method
     */
    detectOutliers(data, column) {
        const values = data.map(d => d[column]).filter(v => typeof v === 'number');
        const sorted = [...values].sort((a, b) => a - b);
        
        const q1 = sorted[Math.floor(sorted.length * 0.25)];
        const q3 = sorted[Math.floor(sorted.length * 0.75)];
        const iqr = q3 - q1;
        const lowerBound = q1 - 1.5 * iqr;
        const upperBound = q3 + 1.5 * iqr;

        return data.map(row => ({
            ...row,
            isOutlier: row[column] < lowerBound || row[column] > upperBound
        }));
    },

    /**
     * Sample data randomly
     */
    sample(data, size) {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, size);
    }
};
