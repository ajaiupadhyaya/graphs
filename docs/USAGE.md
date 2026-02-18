# Template Usage Guide

## Overview
This guide provides detailed instructions for using each template type in the graph visualization tool.

## D3.js Templates

### Force-Directed Graph
**Best for:** Network relationships, social graphs, dependency trees

**Data Format:**
```csv
node,value
Node A,10
Node B,20
Node C,15
```

**Usage:**
1. Select "D3 Force Directed" template
2. Upload CSV or JSON with nodes
3. Customize link strength and charge
4. Interact: Drag nodes to reposition

**Customization Options:**
- `nodeRadius`: Size of nodes (4-20)
- `linkStrength`: Connection strength (0-1)
- `chargeStrength`: Repulsion force (-200 to -50)

### Radial Tree
**Best for:** Hierarchical data, organization charts

**Data Format:**
```json
{
  "name": "Root",
  "children": [
    { "name": "Child 1", "value": 10 },
    { "name": "Child 2", "value": 15 }
  ]
}
```

## P5.js Templates

### Particle System
**Best for:** Real-time data, artistic presentations, dynamic updates

**Data Format:** Any tabular data

**Features:**
- Animated particles representing data points
- Particle size based on values
- Continuous motion with physics
- Fade trail effect

**Customization:**
- Particle count
- Movement speed
- Color schemes
- Force interactions

### Wave Graph
**Best for:** Time series, music visualization, cyclical data

**Features:**
- Flowing wave animation
- Amplitude based on data values
- Smooth transitions
- Multiple wave layers

## Three.js 3D Templates

### 3D Bar Chart
**Best for:** Comparative data, impressive presentations

**Data Format:**
```csv
category,value
Q1,45000
Q2,52000
Q3,48000
Q4,61000
```

**Interaction:**
- Mouse move: Rotate camera view
- Auto-rotation: Slow spin animation
- Zoom: Mouse wheel (if enabled)

**Customization:**
- Bar spacing
- Height scaling
- Color gradient
- Camera position
- Lighting effects

### 3D Network Graph
**Best for:** Complex relationships in 3D space

**Features:**
- Spatial distribution
- Interactive rotation
- Depth perception
- Connection lines

## Chart.js Templates

### Bar Chart
**Best for:** Category comparisons, rankings

**Options:**
- Horizontal or vertical
- Stacked or grouped
- Custom bar colors
- Grid customization

### Line Chart
**Best for:** Trends over time, continuous data

**Options:**
- Multiple lines
- Filled areas
- Point markers
- Smooth curves (tension)

### Pie/Doughnut Chart
**Best for:** Proportions, percentages

**Options:**
- Slice colors
- Labels and legends
- Rotation angle
- Inner radius (doughnut)

## Plotly Templates

### Scatter Plot
**Best for:** Correlation, distribution patterns

**Features:**
- Hover tooltips
- Zoom and pan
- Marker customization
- Trend lines

### 3D Surface Plot
**Best for:** Mathematical functions, terrain data

**Data Format:**
```javascript
// Z values as 2D array
[
  [1, 2, 3],
  [2, 4, 6],
  [3, 6, 9]
]
```

### Heatmap
**Best for:** Correlation matrices, density

**Features:**
- Color gradients
- Interactive cells
- Annotations
- Custom scales

## Data Preparation Tips

### CSV Files
- First row should be headers
- Use commas to separate values
- Enclose strings with commas in quotes
- UTF-8 encoding recommended

Example:
```csv
name,value,category
"Product A",100,Electronics
"Product B",150,Home
```

### JSON Files
- Use array of objects for tabular data
- Nested objects for hierarchical data
- Numbers without quotes
- Dates as ISO strings

Example:
```json
[
  {
    "name": "Item 1",
    "value": 100,
    "date": "2024-01-01"
  }
]
```

## Customization Workflow

1. **Select Template** → Choose based on data type and purpose
2. **Upload Data** → Ensure correct format
3. **Preview** → Check data parsed correctly
4. **Customize Colors** → Select color scheme
5. **Adjust Size** → Set visualization dimensions
6. **Add Title** → Descriptive title
7. **Enable Animation** → Toggle animations
8. **Export** → Choose format (PNG, SVG, etc.)

## Performance Optimization

### Large Datasets
- **Sampling**: Use `DataProcessor.sample(data, 1000)` for >10,000 rows
- **Aggregation**: Group data before visualization
- **Simplification**: Reduce data points for complex graphs

### Animation Performance
- Disable animations for complex visualizations
- Reduce particle count in P5.js templates
- Lower frame rate for smoother performance

## Color Schemes

### When to Use Each:

**Default**: General purpose, professional
- Blue-purple gradient
- Good contrast
- Colorblind friendly

**Vibrant**: Marketing, presentations
- High saturation
- Eye-catching
- Bold colors

**Pastel**: Reports, documentation
- Soft colors
- Easy on eyes
- Professional

**Dark Mode**: Modern UI, dashboards
- Dark backgrounds
- High contrast
- Reduced eye strain

**Monochrome**: Print, formal documents
- Black to white
- No color dependency
- Universal

## Common Use Cases

### Business Dashboard
```
Templates: Chart.js Line + Bar
Data: Sales, Revenue, Metrics
Features: Real-time updates, export
```

### Scientific Research
```
Templates: Plotly Scatter + Heatmap
Data: Experimental results
Features: Precise values, statistics
```

### Network Analysis
```
Templates: D3 Force-Directed
Data: Connections, relationships
Features: Interactive exploration
```

### Creative Projects
```
Templates: P5.js Particle System
Data: Any numerical data
Features: Artistic interpretation
```

## Troubleshooting

### Data Not Showing
- Check CSV format (headers, commas)
- Verify JSON is valid
- Ensure numeric values are numbers
- Check browser console for errors

### Slow Performance
- Reduce data size
- Disable animations
- Use simpler templates
- Clear browser cache

### Export Issues
- Wait for visualization to render
- Check browser popup blockers
- Ensure sufficient data loaded
- Try different export format

## Advanced Tips

### Combining Multiple Templates
1. Create first visualization
2. Export as image
3. Create second visualization
4. Use image editing to combine

### Custom Color Palettes
```javascript
// In browser console
app.customColors = ['#FF6B6B', '#4ECDC4', '#45B7D1'];
```

### Programmatic Export
```javascript
// Export automatically after render
setTimeout(() => {
  ExportTools.exportPNG('visualizationArea');
}, 2000);
```

### Data Transformation Pipeline
```javascript
let data = originalData;
data = DataProcessor.filterData(data, {category: 'Sales'});
data = DataProcessor.normalize(data, 'value');
data = DataProcessor.movingAverage(data, 'value', 5);
// Then visualize
```

## Best Practices

1. **Choose the right template** for your data type
2. **Clean your data** before uploading
3. **Test with sample data** first
4. **Use appropriate colors** for your audience
5. **Add clear titles** and labels
6. **Export in multiple formats** for flexibility
7. **Keep visualizations simple** - avoid clutter
8. **Consider accessibility** - color contrast, text size

## Next Steps

- Explore AI tools for data analysis
- Try combining multiple visualizations
- Create custom templates
- Integrate with your backend
- Share your visualizations
