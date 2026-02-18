# API Documentation

## Table of Contents
1. [Data Processing API](#data-processing-api)
2. [AI Tools API](#ai-tools-api)
3. [Utilities API](#utilities-api)
4. [Export API](#export-api)
5. [Template API](#template-api)

## Data Processing API

### DataProcessor.parseCSV(csvString)
Converts CSV string to array of objects.

**Parameters:**
- `csvString` (string): CSV formatted text

**Returns:** Array of objects

**Example:**
```javascript
const data = DataProcessor.parseCSV("name,value\nA,10\nB,20");
// Returns: [{name: "A", value: 10}, {name: "B", value: 20}]
```

### DataProcessor.toCSV(data)
Converts array of objects to CSV string.

**Parameters:**
- `data` (Array): Array of objects

**Returns:** String (CSV formatted)

### DataProcessor.filterData(data, criteria)
Filters data based on criteria.

**Parameters:**
- `data` (Array): Array of objects
- `criteria` (Object): Key-value pairs to filter by

**Example:**
```javascript
const filtered = DataProcessor.filterData(data, { category: "Electronics" });
```

### DataProcessor.sortData(data, column, ascending)
Sorts data by column.

**Parameters:**
- `data` (Array): Data to sort
- `column` (string): Column name
- `ascending` (boolean): Sort direction (default: true)

### DataProcessor.groupBy(data, column)
Groups data by column value.

**Returns:** Object with grouped arrays

### DataProcessor.aggregate(data, groupColumn, valueColumn, aggregation)
Aggregates data with sum, avg, count, min, or max.

**Parameters:**
- `aggregation` (string): "sum" | "avg" | "count" | "min" | "max"

### DataProcessor.normalize(data, column)
Normalizes values to 0-1 range.

### DataProcessor.movingAverage(data, column, window)
Calculates moving average.

**Parameters:**
- `window` (number): Window size (default: 3)

### DataProcessor.detectOutliers(data, column)
Detects outliers using IQR method.

**Returns:** Data with `isOutlier` boolean field

## AI Tools API

### AITools.linearRegression(data, xColumn, yColumn)
Performs linear regression analysis.

**Returns:** Object with `{ slope, intercept, predict }` function

**Example:**
```javascript
const model = AITools.linearRegression(data, 'x', 'y');
const predicted = model.predict(10);
```

### AITools.analyzeTrends(data, column)
Analyzes trends in time series data.

**Returns:**
```javascript
{
  trend: "increasing" | "decreasing" | "stable",
  slope: number,
  confidence: number, // R-squared value
  prediction: function
}
```

### AITools.predict(data, column, steps)
Generates future predictions.

**Parameters:**
- `steps` (number): Number of future points to predict (default: 5)

**Returns:** Array of predictions

### AITools.kMeansClustering(data, xColumn, yColumn, k, maxIterations)
Performs K-means clustering.

**Parameters:**
- `k` (number): Number of clusters (default: 3)
- `maxIterations` (number): Max iterations (default: 100)

**Returns:**
```javascript
{
  points: Array, // Points with cluster assignments
  centroids: Array // Cluster centers
}
```

### AITools.summarizeData(data)
Generates statistical summary of all columns.

**Returns:**
```javascript
{
  columnName: {
    type: "numeric" | "categorical",
    count: number,
    min: number,
    max: number,
    mean: number,
    median: number,
    stdDev: number,
    // For categorical:
    unique: number,
    frequencies: Object,
    mode: any
  }
}
```

### AITools.detectAnomalies(data, column, threshold)
Detects anomalies using z-score method.

**Parameters:**
- `threshold` (number): Z-score threshold (default: 2)

**Returns:** Data with `isAnomaly` and `zScore` fields

### AITools.correlationMatrix(data)
Calculates correlation matrix for numeric columns.

**Returns:** Object with correlation coefficients

### AITools.scrapeWebsite(url)
Placeholder for web scraping (requires backend).

**Note:** Implement with your backend service.

### AITools.queryLLM(prompt, context)
Placeholder for LLM integration.

**Note:** Connect to OpenAI, Anthropic, or similar API.

## Utilities API

### Utils.randomColor()
Generates random hex color.

**Returns:** String (hex color code)

### Utils.getColorScheme(schemeName)
Gets predefined color scheme.

**Parameters:**
- `schemeName` (string): "default" | "vibrant" | "pastel" | "dark" | "monochrome"

**Returns:** Array of color strings

### Utils.formatNumber(num)
Formats number with thousands separators.

**Example:**
```javascript
Utils.formatNumber(1234567); // "1,234,567"
```

### Utils.downloadFile(content, filename, contentType)
Downloads content as file.

### Utils.canvasToImage(canvas, filename)
Converts canvas to downloadable image.

### Utils.debounce(func, wait)
Creates debounced function.

### Utils.calculateStats(data)
Calculates basic statistics.

**Returns:**
```javascript
{
  sum: number,
  mean: number,
  median: number,
  min: number,
  max: number,
  count: number
}
```

### Utils.lerp(start, end, t)
Linear interpolation between two values.

### Utils.mapRange(value, inMin, inMax, outMin, outMax)
Maps value from one range to another.

## Export API

### ExportTools.exportPNG(elementId)
Exports visualization as PNG image.

**Parameters:**
- `elementId` (string): ID of container element

### ExportTools.exportSVG(elementId)
Exports SVG as downloadable file.

### ExportTools.exportHTML(elementId)
Exports as standalone HTML file.

### ExportTools.exportJSON(data)
Exports data as JSON file.

### ExportTools.exportCSV(data)
Exports data as CSV file.

### ExportTools.exportPDF(elementId)
Exports as PDF (requires jsPDF library).

## Template API

### D3.js Templates

#### createForceDirectedGraph(container, data, options)
Creates force-directed network graph.

**Options:**
```javascript
{
  width: 800,
  height: 600,
  nodeRadius: 8,
  linkStrength: 0.5,
  chargeStrength: -100,
  colorScheme: Array
}
```

**Returns:** `{ simulation, svg }`

### P5.js Templates

#### createParticleVisualization(data, containerWidth, containerHeight)
Creates particle system visualization.

**Returns:** P5.js sketch function

### Three.js Templates

#### create3DBarChart(container, data, options)
Creates 3D bar chart.

**Options:**
```javascript
{
  width: 800,
  height: 600,
  barSpacing: 1.5,
  colorScheme: Array
}
```

**Returns:** `{ scene, camera, renderer }`

## Integration Examples

### Complete Workflow
```javascript
// 1. Load data
const data = await fetch('data.csv')
  .then(r => r.text())
  .then(DataProcessor.parseCSV);

// 2. Process data
const normalized = DataProcessor.normalize(data, 'value');
const summary = AITools.summarizeData(normalized);

// 3. Analyze trends
const trends = AITools.analyzeTrends(data, 'value');

// 4. Create visualization
const container = document.getElementById('viz');
createForceDirectedGraph(container, data, {
  width: 800,
  height: 600,
  colorScheme: Utils.getColorScheme('vibrant')
});

// 5. Export
ExportTools.exportPNG('viz');
```

### Real-time Updates
```javascript
function updateVisualization(newData) {
  const processed = DataProcessor.movingAverage(newData, 'value', 5);
  renderChart(processed);
}

// Update every second
setInterval(() => {
  fetch('/api/data')
    .then(r => r.json())
    .then(updateVisualization);
}, 1000);
```

### Machine Learning Pipeline
```javascript
// 1. Prepare data
const normalized = DataProcessor.normalize(data, 'sales');

// 2. Detect patterns
const outliers = AITools.detectAnomalies(normalized, 'sales_normalized');
const clusters = AITools.kMeansClustering(data, 'x', 'y', 3);

// 3. Make predictions
const model = AITools.linearRegression(data, 'time', 'sales');
const predictions = AITools.predict(data, 'sales', 10);

// 4. Visualize results
visualizePredictions(predictions);
```

## Events

### Application Events

The main application emits events you can listen to:

```javascript
// Listen for data load
window.app.on('dataLoaded', (data) => {
  console.log('Data loaded:', data);
});

// Listen for visualization rendered
window.app.on('visualizationRendered', (template) => {
  console.log('Rendered:', template);
});
```

## Error Handling

All functions include error handling. Wrap in try-catch:

```javascript
try {
  const data = DataProcessor.parseCSV(csvString);
  const trends = AITools.analyzeTrends(data, 'value');
} catch (error) {
  console.error('Error:', error.message);
  // Handle error
}
```

## Best Practices

1. **Data Validation**: Always validate data before processing
2. **Performance**: Use sampling for large datasets (>10,000 rows)
3. **Memory**: Clear visualizations before creating new ones
4. **Async Operations**: Use async/await for file operations
5. **Color Accessibility**: Test color schemes for accessibility
6. **Export**: Wait for visualization to render before exporting

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Dependencies

All dependencies loaded via CDN:
- D3.js v7
- Chart.js v4.4
- Plotly v2.27
- P5.js v1.7
- Three.js r128
