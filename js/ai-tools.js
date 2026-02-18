// AI and ML tools for data analysis

const AITools = {
    /**
     * Simple linear regression for predictions
     */
    linearRegression(data, xColumn, yColumn) {
        const points = data.map(d => ({
            x: d[xColumn],
            y: d[yColumn]
        })).filter(p => typeof p.x === 'number' && typeof p.y === 'number');

        const n = points.length;
        const sumX = points.reduce((sum, p) => sum + p.x, 0);
        const sumY = points.reduce((sum, p) => sum + p.y, 0);
        const sumXY = points.reduce((sum, p) => sum + p.x * p.y, 0);
        const sumX2 = points.reduce((sum, p) => sum + p.x * p.x, 0);

        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        return {
            slope,
            intercept,
            predict: (x) => slope * x + intercept
        };
    },

    /**
     * Analyze trends in time series data
     */
    analyzeTrends(data, column) {
        const values = data.map((d, i) => ({ x: i, y: d[column] }))
            .filter(p => typeof p.y === 'number');

        if (values.length < 2) {
            return { trend: 'insufficient data' };
        }

        const regression = this.linearRegression(
            values.map((v, i) => ({ x: i, y: v.y })),
            'x',
            'y'
        );

        const trend = regression.slope > 0 ? 'increasing' : 
                     regression.slope < 0 ? 'decreasing' : 'stable';

        // Calculate R-squared
        const meanY = values.reduce((sum, p) => sum + p.y, 0) / values.length;
        const ssTotal = values.reduce((sum, p) => sum + Math.pow(p.y - meanY, 2), 0);
        const ssResidual = values.reduce((sum, p, i) => 
            sum + Math.pow(p.y - regression.predict(i), 2), 0);
        const rSquared = 1 - (ssResidual / ssTotal);

        return {
            trend,
            slope: regression.slope,
            confidence: rSquared,
            prediction: regression
        };
    },

    /**
     * Generate future predictions
     */
    predict(data, column, steps = 5) {
        const values = data.map((d, i) => ({ x: i, y: d[column] }))
            .filter(p => typeof p.y === 'number');

        const regression = this.linearRegression(
            values.map((v, i) => ({ x: i, y: v.y })),
            'x',
            'y'
        );

        const predictions = [];
        const startIndex = values.length;

        for (let i = 0; i < steps; i++) {
            predictions.push({
                step: startIndex + i,
                predicted: regression.predict(startIndex + i)
            });
        }

        return predictions;
    },

    /**
     * Clustering using K-means (simplified)
     */
    kMeansClustering(data, xColumn, yColumn, k = 3, maxIterations = 100) {
        const points = data.map(d => ({
            x: d[xColumn],
            y: d[yColumn],
            cluster: 0
        })).filter(p => typeof p.x === 'number' && typeof p.y === 'number');

        // Initialize centroids randomly (ensure unique points)
        let centroids = [];
        const shuffled = [...points].sort(() => Math.random() - 0.5);
        for (let i = 0; i < Math.min(k, points.length); i++) {
            centroids.push({ x: shuffled[i].x, y: shuffled[i].y });
        }

        // Iterate
        for (let iter = 0; iter < maxIterations; iter++) {
            // Assign points to nearest centroid
            points.forEach(point => {
                let minDist = Infinity;
                let nearestCluster = 0;

                centroids.forEach((centroid, i) => {
                    const dist = Math.sqrt(
                        Math.pow(point.x - centroid.x, 2) +
                        Math.pow(point.y - centroid.y, 2)
                    );
                    if (dist < minDist) {
                        minDist = dist;
                        nearestCluster = i;
                    }
                });

                point.cluster = nearestCluster;
            });

            // Update centroids
            const newCentroids = [];
            for (let i = 0; i < k; i++) {
                const clusterPoints = points.filter(p => p.cluster === i);
                if (clusterPoints.length > 0) {
                    const sumX = clusterPoints.reduce((sum, p) => sum + p.x, 0);
                    const sumY = clusterPoints.reduce((sum, p) => sum + p.y, 0);
                    newCentroids.push({
                        x: sumX / clusterPoints.length,
                        y: sumY / clusterPoints.length
                    });
                } else {
                    newCentroids.push(centroids[i]);
                }
            }

            centroids = newCentroids;
        }

        return {
            points,
            centroids
        };
    },

    /**
     * Summarize data using statistics
     */
    summarizeData(data) {
        const summary = {};
        const columns = Object.keys(data[0] || {});

        columns.forEach(column => {
            const values = data.map(d => d[column]);
            const numericValues = values.filter(v => typeof v === 'number');

            if (numericValues.length > 0) {
                const sorted = [...numericValues].sort((a, b) => a - b);
                const sum = numericValues.reduce((a, b) => a + b, 0);
                const mean = sum / numericValues.length;
                const median = sorted[Math.floor(sorted.length / 2)];
                
                // Standard deviation
                const variance = numericValues.reduce((sum, val) => 
                    sum + Math.pow(val - mean, 2), 0) / numericValues.length;
                const stdDev = Math.sqrt(variance);

                summary[column] = {
                    type: 'numeric',
                    count: numericValues.length,
                    min: Math.min(...numericValues),
                    max: Math.max(...numericValues),
                    mean: mean,
                    median: median,
                    stdDev: stdDev,
                    sum: sum
                };
            } else {
                // Categorical data
                const unique = [...new Set(values)];
                const frequencies = {};
                values.forEach(v => {
                    frequencies[v] = (frequencies[v] || 0) + 1;
                });

                summary[column] = {
                    type: 'categorical',
                    count: values.length,
                    unique: unique.length,
                    frequencies: frequencies,
                    mode: Object.keys(frequencies).reduce((a, b) => 
                        frequencies[a] > frequencies[b] ? a : b)
                };
            }
        });

        return summary;
    },

    /**
     * Detect anomalies using statistical methods
     */
    detectAnomalies(data, column, threshold = 2) {
        const values = data.map(d => d[column]).filter(v => typeof v === 'number');
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const variance = values.reduce((sum, val) => 
            sum + Math.pow(val - mean, 2), 0) / values.length;
        const stdDev = Math.sqrt(variance);

        return data.map(row => ({
            ...row,
            isAnomaly: Math.abs(row[column] - mean) > threshold * stdDev,
            zScore: (row[column] - mean) / stdDev
        }));
    },

    /**
     * Placeholder for web scraping (would require backend)
     */
    async scrapeWebsite(url) {
        // This is a placeholder. Real implementation would require a backend service
        console.log('Scraping:', url);
        return {
            status: 'placeholder',
            message: 'Web scraping requires a backend service. Integrate with your API.',
            url: url
        };
    },

    /**
     * Placeholder for LLM integration
     */
    async queryLLM(prompt, context) {
        // This is a placeholder. Real implementation would call an LLM API
        console.log('LLM Query:', prompt);
        return {
            status: 'placeholder',
            message: 'LLM integration requires an API key. Connect to OpenAI, Anthropic, or similar.',
            prompt: prompt,
            suggestion: 'Use the data summary and analysis features for automated insights.'
        };
    },

    /**
     * Generate correlation matrix
     */
    correlationMatrix(data) {
        const numericColumns = Object.keys(data[0] || {}).filter(col => 
            typeof data[0][col] === 'number'
        );

        const matrix = {};
        
        numericColumns.forEach(col1 => {
            matrix[col1] = {};
            numericColumns.forEach(col2 => {
                const values1 = data.map(d => d[col1]);
                const values2 = data.map(d => d[col2]);
                
                const n = values1.length;
                const mean1 = values1.reduce((a, b) => a + b, 0) / n;
                const mean2 = values2.reduce((a, b) => a + b, 0) / n;
                
                let numerator = 0;
                let denom1 = 0;
                let denom2 = 0;
                
                for (let i = 0; i < n; i++) {
                    const diff1 = values1[i] - mean1;
                    const diff2 = values2[i] - mean2;
                    numerator += diff1 * diff2;
                    denom1 += diff1 * diff1;
                    denom2 += diff2 * diff2;
                }
                
                const correlation = numerator / Math.sqrt(denom1 * denom2);
                matrix[col1][col2] = correlation;
            });
        });

        return matrix;
    }
};
