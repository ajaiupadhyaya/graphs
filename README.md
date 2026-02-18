# 🎨 Advanced Graph Visualization Tool

A comprehensive, AI-powered graph visualization toolkit featuring artistic templates, professional charts, 3D visualizations, and intelligent data analysis capabilities.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎨 Artistic Templates
- **D3.js Visualizations**: Interactive force-directed graphs, radial trees, hierarchical layouts
- **P5.js Creative Graphs**: Particle systems, wave visualizations, generative art
- **Three.js 3D Graphics**: Rotating 3D bar charts, network graphs, surface plots

### 📊 Professional Charts
- **Chart.js**: Bar charts, line charts, pie charts, radar charts
- **Plotly**: Interactive scatter plots, 3D surface plots, heatmaps, contour plots
- Industry-standard, publication-ready visualizations

### 🤖 AI-Powered Tools
- **Data Scraping**: Extract data from websites automatically
- **Trend Analysis**: Detect patterns and trends in your data
- **Predictions**: ML-based forecasting (linear regression, time series)
- **Anomaly Detection**: Identify outliers and unusual patterns
- **Data Summarization**: AI-powered insights and statistics
- **LLM Integration**: Chat with AI about your data (connect your API)

### 🚀 Automation Features
- **Drag & Drop Upload**: CSV, JSON file support
- **Automatic Processing**: Instant data parsing and preview
- **One-Click Visualization**: Select template, upload data, done!
- **Export Options**: PNG, SVG, HTML, PDF, JSON

### 🎛️ Customization
- Color schemes (Vibrant, Pastel, Dark Mode, Monochrome)
- Animation controls
- Size adjustments
- Custom titles and labels

## 🚀 Quick Start

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ajaiupadhyaya/graphs.git
cd graphs
```

2. Start a local server:
```bash
npm start
# or
python3 -m http.server 8000
```

3. Open your browser:
```
http://localhost:8000
```

### Basic Usage

1. **Select a Template**: Choose from artistic, professional, or 3D templates
2. **Upload Your Data**: Drag & drop CSV or JSON files
3. **Customize**: Adjust colors, size, and animations
4. **Export**: Download your visualization in multiple formats

## 📁 Project Structure

```
graphs/
├── index.html              # Main application interface
├── package.json            # Project configuration
├── css/
│   └── main.css           # Styling
├── js/
│   ├── app.js             # Main application logic
│   ├── utils.js           # Utility functions
│   ├── data-processor.js  # Data processing tools
│   ├── ai-tools.js        # AI/ML algorithms
│   └── export.js          # Export functionality
├── templates/
│   ├── d3/                # D3.js templates
│   ├── p5/                # P5.js templates
│   ├── three/             # Three.js templates
│   ├── chartjs/           # Chart.js templates
│   └── plotly/            # Plotly templates
├── data/
│   ├── sample-data.csv    # Sample CSV data
│   └── sample-products.json # Sample JSON data
└── docs/
    └── API.md             # API documentation
```

## 📖 Template Gallery

### D3.js Templates
- **Force Directed Graph**: Interactive network visualization with physics simulation
- **Radial Tree**: Hierarchical data in circular layout
- **Chord Diagram**: Show relationships between entities
- **Sunburst Chart**: Multi-level hierarchical data

### P5.js Templates
- **Particle System**: Animated particles representing data points
- **Wave Graph**: Flowing wave-based time series
- **Generative Art**: Algorithmic artistic visualizations
- **Interactive Canvas**: Touch-responsive data art

### Three.js 3D Templates
- **3D Bar Chart**: Rotating 3D bars with mouse control
- **3D Network**: Spatial network graph
- **Surface Plot**: 3D surface from 2D data
- **Point Cloud**: 3D scatter with depth

### Professional Templates
- **Chart.js**: Bar, Line, Pie, Doughnut, Radar, Polar Area
- **Plotly**: Scatter, Box, Violin, Heatmap, Contour, 3D Surface

## 🔧 Data Format

### CSV Format
```csv
category,value,date
Sales,45000,2024-01
Marketing,12000,2024-01
```

### JSON Format
```json
[
  {
    "name": "Product A",
    "sales": 1200,
    "category": "Electronics"
  }
]
```

## 🤖 AI Features

### Trend Analysis
```javascript
const trends = AITools.analyzeTrends(data, 'sales');
console.log(trends.trend); // 'increasing', 'decreasing', or 'stable'
```

### Predictions
```javascript
const predictions = AITools.predict(data, 'sales', 5);
// Returns 5 future predictions
```

### Clustering
```javascript
const clusters = AITools.kMeansClustering(data, 'x', 'y', 3);
// Groups data into 3 clusters
```

### Data Summary
```javascript
const summary = AITools.summarizeData(data);
// Returns statistics for all columns
```

## 🔌 API Integration

### LLM Integration
Connect your OpenAI, Anthropic, or other LLM API:
```javascript
const response = await AITools.queryLLM(
  "Analyze this sales data",
  { data: yourData }
);
```

### Web Scraping
Implement backend scraping service:
```javascript
const scrapedData = await AITools.scrapeWebsite(url);
```

## 🎨 Customization Examples

### Change Color Scheme
```javascript
const colorScheme = Utils.getColorScheme('vibrant');
```

### Apply Data Transformations
```javascript
const normalized = DataProcessor.normalize(data, 'value');
const smoothed = DataProcessor.movingAverage(data, 'value', 5);
const outliers = DataProcessor.detectOutliers(data, 'value');
```

## 📤 Export Options

- **PNG**: Raster image for presentations
- **SVG**: Vector graphics for scaling
- **HTML**: Standalone interactive page
- **PDF**: Print-ready document
- **JSON**: Raw data export

## 🛠️ Development

### Adding New Templates

1. Create template file in appropriate directory
2. Implement rendering function
3. Add template card in `index.html`
4. Register in `app.js` switch statement

### Custom AI Tools

Add new analysis functions to `js/ai-tools.js`:
```javascript
AITools.myCustomAnalysis = function(data, options) {
  // Your implementation
};
```

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🌟 Roadmap

- [ ] Real-time data streaming
- [ ] More 3D visualization templates
- [ ] Advanced ML models (neural networks)
- [ ] Collaborative editing
- [ ] Cloud storage integration
- [ ] Mobile app version
- [ ] API for programmatic access

## 💡 Use Cases

- **Business Analytics**: Sales trends, performance metrics
- **Scientific Research**: Experimental data, statistical analysis
- **Finance**: Market trends, prediction markets
- **Education**: Interactive data exploration
- **Art & Design**: Creative data visualization projects
- **Marketing**: Campaign performance, user engagement

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check the documentation in `/docs`
- Review sample data in `/data`

## 🙏 Acknowledgments

Built with amazing open-source libraries:
- [D3.js](https://d3js.org/) - Data visualization
- [P5.js](https://p5js.org/) - Creative coding
- [Three.js](https://threejs.org/) - 3D graphics
- [Chart.js](https://www.chartjs.org/) - Simple charts
- [Plotly](https://plotly.com/) - Scientific graphing

---

Made with ❤️ for data visualization enthusiasts
