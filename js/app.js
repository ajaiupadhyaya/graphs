// Main Application Logic
class GraphApp {
    constructor() {
        this.selectedTemplate = null;
        this.currentData = null;
        this.currentVisualization = null;
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupTemplateSelection();
        this.setupFileUpload();
        this.setupCustomization();
        this.setupExport();
        this.setupAITools();
    }

    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and tabs
                navButtons.forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked button and corresponding tab
                btn.classList.add('active');
                const tabId = btn.getAttribute('data-tab') + '-tab';
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    setupTemplateSelection() {
        const templateCards = document.querySelectorAll('.template-card');
        templateCards.forEach(card => {
            const selectBtn = card.querySelector('.btn-select');
            selectBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Remove selected class from all cards
                templateCards.forEach(c => c.classList.remove('selected'));
                
                // Add selected class to clicked card
                card.classList.add('selected');
                
                // Store selected template
                this.selectedTemplate = card.getAttribute('data-template');
                
                // Show message
                this.showMessage('Template selected: ' + card.querySelector('h4').textContent, 'success');
                
                // Render if we have data
                if (this.currentData) {
                    this.renderVisualization();
                }
            });
        });
    }

    setupFileUpload() {
        const dropzone = document.getElementById('dropzone');
        const fileInput = document.getElementById('fileInput');
        const dataPreview = document.getElementById('dataPreview');

        // Click to upload
        dropzone.addEventListener('click', () => {
            fileInput.click();
        });

        // File selection
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleFile(file);
            }
        });

        // Drag and drop
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('dragging');
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('dragging');
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragging');
            const file = e.dataTransfer.files[0];
            if (file) {
                this.handleFile(file);
            }
        });
    }

    async handleFile(file) {
        const fileName = file.name;
        const fileExt = fileName.split('.').pop().toLowerCase();

        try {
            let data;
            if (fileExt === 'csv') {
                data = await this.parseCSV(file);
            } else if (fileExt === 'json') {
                data = await this.parseJSON(file);
            } else {
                throw new Error('Unsupported file format. Please use CSV or JSON.');
            }

            this.currentData = data;
            this.showDataPreview(data);
            this.showMessage('Data loaded successfully!', 'success');

            // Render if we have a template selected
            if (this.selectedTemplate) {
                this.renderVisualization();
            }
        } catch (error) {
            this.showMessage('Error loading file: ' + error.message, 'error');
        }
    }

    parseCSV(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                const data = DataProcessor.parseCSV(text);
                resolve(data);
            };
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    parseJSON(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = JSON.parse(e.target.result);
                resolve(data);
            };
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    showDataPreview(data) {
        const previewDiv = document.getElementById('dataPreview');
        const previewTable = document.getElementById('previewTable');
        
        previewDiv.style.display = 'block';
        
        // Show first 5 rows
        const preview = Array.isArray(data) ? data.slice(0, 5) : [data];
        
        let html = '<table style="width: 100%; border-collapse: collapse;">';
        
        if (preview.length > 0) {
            // Headers
            html += '<tr>';
            Object.keys(preview[0]).forEach(key => {
                html += `<th style="border: 1px solid #e5e7eb; padding: 8px; background: #f9fafb;">${key}</th>`;
            });
            html += '</tr>';
            
            // Rows
            preview.forEach(row => {
                html += '<tr>';
                Object.values(row).forEach(value => {
                    html += `<td style="border: 1px solid #e5e7eb; padding: 8px;">${value}</td>`;
                });
                html += '</tr>';
            });
        }
        
        html += '</table>';
        previewTable.innerHTML = html;
    }

    setupCustomization() {
        const sizeSlider = document.getElementById('graphSize');
        const sizeValue = document.getElementById('sizeValue');
        
        if (sizeSlider) {
            sizeSlider.addEventListener('input', (e) => {
                sizeValue.textContent = e.target.value + 'px';
                if (this.currentVisualization) {
                    this.renderVisualization();
                }
            });
        }

        // Other customization controls
        const colorScheme = document.getElementById('colorScheme');
        const enableAnimation = document.getElementById('enableAnimation');
        const graphTitle = document.getElementById('graphTitle');

        if (colorScheme) {
            colorScheme.addEventListener('change', () => {
                if (this.currentVisualization) {
                    this.renderVisualization();
                }
            });
        }
    }

    setupExport() {
        const exportButtons = document.querySelectorAll('.btn-export');
        exportButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const format = btn.getAttribute('data-format');
                this.exportVisualization(format);
            });
        });
    }

    setupAITools() {
        // This is a placeholder for AI tool implementations
        const aiButtons = document.querySelectorAll('.ai-tools-grid .btn-primary');
        aiButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const toolName = btn.parentElement.querySelector('h3').textContent;
                this.showMessage(`AI Tool "${toolName}" would be activated here. Connect to your AI/ML backend.`, 'success');
            });
        });
    }

    renderVisualization() {
        const visualizationArea = document.getElementById('visualizationArea');
        
        if (!this.selectedTemplate || !this.currentData) {
            visualizationArea.innerHTML = '<p class="placeholder-text">Select a template and upload data to see your visualization</p>';
            return;
        }

        // Clear previous visualization
        visualizationArea.innerHTML = '';

        // Get customization options
        const size = parseInt(document.getElementById('graphSize').value);
        const colorScheme = document.getElementById('colorScheme').value;
        const title = document.getElementById('graphTitle').value;

        // Create visualization based on template
        try {
            switch(this.selectedTemplate) {
                case 'd3-force':
                    this.renderD3Force(visualizationArea, size);
                    break;
                case 'd3-radial':
                    this.renderD3Radial(visualizationArea, size);
                    break;
                case 'chart-bar':
                    this.renderChartBar(visualizationArea, size);
                    break;
                case 'chart-line':
                    this.renderChartLine(visualizationArea, size);
                    break;
                case 'plotly-scatter':
                    this.renderPlotlyScatter(visualizationArea, size);
                    break;
                case 'p5-particle':
                    this.renderP5Particle(visualizationArea, size);
                    break;
                default:
                    visualizationArea.innerHTML = `<p class="placeholder-text">Template "${this.selectedTemplate}" visualization will be rendered here.</p>`;
            }
        } catch (error) {
            this.showMessage('Error rendering visualization: ' + error.message, 'error');
        }
    }

    renderD3Force(container, size) {
        // Sample D3 force-directed graph
        const svg = d3.select(container)
            .append('svg')
            .attr('width', size)
            .attr('height', size);

        // Convert data to nodes and links
        const nodes = this.currentData.slice(0, 20).map((d, i) => ({
            id: i,
            value: Object.values(d)[0]
        }));

        const links = nodes.slice(1).map((d, i) => ({
            source: i,
            target: i + 1
        }));

        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id))
            .force('charge', d3.forceManyBody().strength(-100))
            .force('center', d3.forceCenter(size / 2, size / 2));

        const link = svg.append('g')
            .selectAll('line')
            .data(links)
            .enter().append('line')
            .attr('stroke', '#999')
            .attr('stroke-width', 2);

        const node = svg.append('g')
            .selectAll('circle')
            .data(nodes)
            .enter().append('circle')
            .attr('r', 8)
            .attr('fill', '#6366f1');

        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);
        });
    }

    renderD3Radial(container, size) {
        const svg = d3.select(container)
            .append('svg')
            .attr('width', size)
            .attr('height', size);

        const radius = size / 2;
        const data = this.currentData.slice(0, 10);
        
        const pie = d3.pie().value(d => Object.values(d)[0] || 1);
        const arc = d3.arc().innerRadius(0).outerRadius(radius - 20);
        
        const g = svg.append('g')
            .attr('transform', `translate(${radius},${radius})`);

        const arcs = g.selectAll('.arc')
            .data(pie(data))
            .enter().append('g')
            .attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => d3.schemeCategory10[i % 10]);
    }

    renderChartBar(container, size) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size * 0.6;
        container.appendChild(canvas);

        const labels = this.currentData.map((d, i) => Object.values(d)[0] || `Item ${i}`);
        const values = this.currentData.map(d => Object.values(d)[1] || Math.random() * 100);

        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: labels.slice(0, 10),
                datasets: [{
                    label: 'Data',
                    data: values.slice(0, 10),
                    backgroundColor: 'rgba(99, 102, 241, 0.7)',
                    borderColor: 'rgba(99, 102, 241, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    renderChartLine(container, size) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size * 0.6;
        container.appendChild(canvas);

        const labels = this.currentData.map((d, i) => Object.values(d)[0] || `Point ${i}`);
        const values = this.currentData.map(d => Object.values(d)[1] || Math.random() * 100);

        new Chart(canvas, {
            type: 'line',
            data: {
                labels: labels.slice(0, 20),
                datasets: [{
                    label: 'Trend',
                    data: values.slice(0, 20),
                    borderColor: 'rgba(99, 102, 241, 1)',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: false
            }
        });
    }

    renderPlotlyScatter(container, size) {
        const x = this.currentData.map(d => Object.values(d)[0] || Math.random() * 100);
        const y = this.currentData.map(d => Object.values(d)[1] || Math.random() * 100);

        const trace = {
            x: x.slice(0, 50),
            y: y.slice(0, 50),
            mode: 'markers',
            type: 'scatter',
            marker: {
                size: 12,
                color: 'rgba(99, 102, 241, 0.7)'
            }
        };

        const layout = {
            width: size,
            height: size * 0.8,
            title: 'Scatter Plot'
        };

        Plotly.newPlot(container, [trace], layout);
    }

    renderP5Particle(container, size) {
        const div = document.createElement('div');
        div.id = 'p5-container';
        container.appendChild(div);
        
        // Note: P5.js sketch would be defined separately
        container.innerHTML += '<p style="margin-top: 20px; color: #6b7280;">P5.js particle visualization would render here with animated particles representing your data.</p>';
    }

    exportVisualization(format) {
        if (!this.currentVisualization && !this.selectedTemplate) {
            this.showMessage('No visualization to export. Please create a visualization first.', 'error');
            return;
        }

        this.showMessage(`Exporting as ${format.toUpperCase()}... (Implementation would handle actual export)`, 'success');
    }

    showMessage(text, type) {
        const visualizationContainer = document.querySelector('.visualization-container');
        
        // Remove existing messages
        const existingMsg = document.querySelector('.message');
        if (existingMsg) {
            existingMsg.remove();
        }

        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        
        visualizationContainer.insertBefore(message, visualizationContainer.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new GraphApp();
});
