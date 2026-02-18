// Utility functions for the graph application

const Utils = {
    /**
     * Generate random color
     */
    randomColor() {
        return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    },

    /**
     * Color schemes
     */
    colorSchemes: {
        default: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'],
        vibrant: ['#ff0080', '#7928ca', '#ff0080', '#0070f3', '#50e3c2'],
        pastel: ['#ffc6d9', '#d4a5ff', '#a8e6cf', '#ffd3b6', '#ffaaa5'],
        dark: ['#1a1a1a', '#333333', '#4d4d4d', '#666666', '#808080'],
        monochrome: ['#000000', '#404040', '#808080', '#c0c0c0', '#ffffff']
    },

    /**
     * Get color scheme
     */
    getColorScheme(schemeName) {
        return this.colorSchemes[schemeName] || this.colorSchemes.default;
    },

    /**
     * Format number with commas
     */
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    /**
     * Download file
     */
    downloadFile(content, filename, contentType) {
        const a = document.createElement('a');
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = filename;
        a.click();
        URL.revokeObjectURL(a.href);
    },

    /**
     * Convert canvas to image
     */
    canvasToImage(canvas, filename) {
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        });
    },

    /**
     * Debounce function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Deep clone object
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    /**
     * Calculate statistics
     */
    calculateStats(data) {
        const numbers = data.filter(n => typeof n === 'number');
        if (numbers.length === 0) return null;

        const sum = numbers.reduce((a, b) => a + b, 0);
        const mean = sum / numbers.length;
        const sorted = [...numbers].sort((a, b) => a - b);
        const median = sorted[Math.floor(numbers.length / 2)];
        const min = Math.min(...numbers);
        const max = Math.max(...numbers);

        return { sum, mean, median, min, max, count: numbers.length };
    },

    /**
     * Linear interpolation
     */
    lerp(start, end, t) {
        return start + (end - start) * t;
    },

    /**
     * Map value from one range to another
     */
    mapRange(value, inMin, inMax, outMin, outMax) {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
};
