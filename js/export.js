// Export functionality

const ExportTools = {
    /**
     * Export as PNG
     */
    async exportPNG(elementId) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error('Element not found');
            return;
        }

        // For canvas elements
        const canvas = element.querySelector('canvas');
        if (canvas) {
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'graph-export.png';
                a.click();
                URL.revokeObjectURL(url);
            });
            return;
        }

        // For SVG elements - would use html2canvas or similar library
        console.log('PNG export for SVG requires additional library (html2canvas)');
    },

    /**
     * Export as SVG
     */
    exportSVG(elementId) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error('Element not found');
            return;
        }

        const svg = element.querySelector('svg');
        if (!svg) {
            console.error('No SVG found');
            return;
        }

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);
        
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'graph-export.svg';
        a.click();
        URL.revokeObjectURL(url);
    },

    /**
     * Export as HTML
     */
    exportHTML(elementId) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error('Element not found');
            return;
        }

        const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Graph Export</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <script src="https://cdn.plot.ly/plotly-2.27.0.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background: #f9fafb;
        }
        #visualization {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div id="visualization">
        ${element.innerHTML}
    </div>
</body>
</html>
        `;

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'graph-export.html';
        a.click();
        URL.revokeObjectURL(url);
    },

    /**
     * Export as JSON
     */
    exportJSON(data) {
        if (!data) {
            console.error('No data to export');
            return;
        }

        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data-export.json';
        a.click();
        URL.revokeObjectURL(url);
    },

    /**
     * Export as CSV
     */
    exportCSV(data) {
        if (!data || !Array.isArray(data) || data.length === 0) {
            console.error('No data to export');
            return;
        }

        const csv = DataProcessor.toCSV(data);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data-export.csv';
        a.click();
        URL.revokeObjectURL(url);
    },

    /**
     * Export as PDF (placeholder - requires library like jsPDF)
     */
    exportPDF(elementId) {
        console.log('PDF export requires jsPDF library');
        alert('PDF export would be implemented using jsPDF library. Add the library and implement the conversion.');
    }
};
