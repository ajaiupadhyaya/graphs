/**
 * D3.js Force-Directed Graph Template
 * 
 * Creates an interactive network visualization with physics simulation
 * Perfect for: Network relationships, hierarchies, connections
 */

function createForceDirectedGraph(container, data, options = {}) {
    const {
        width = 800,
        height = 600,
        nodeRadius = 8,
        linkStrength = 0.5,
        chargeStrength = -100,
        colorScheme = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']
    } = options;

    // Clear container
    d3.select(container).selectAll('*').remove();

    // Create SVG
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]);

    // Convert data to nodes and links
    const nodes = data.map((d, i) => ({
        id: i,
        label: Object.values(d)[0] || `Node ${i}`,
        value: Object.values(d)[1] || 1,
        group: i % colorScheme.length
    }));

    const links = nodes.slice(1).map((d, i) => ({
        source: i,
        target: i + 1,
        value: 1
    }));

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).strength(linkStrength))
        .force('charge', d3.forceManyBody().strength(chargeStrength))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(nodeRadius * 2));

    // Create links
    const link = svg.append('g')
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', d => Math.sqrt(d.value) * 2);

    // Create nodes
    const node = svg.append('g')
        .selectAll('g')
        .data(nodes)
        .enter().append('g')
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));

    node.append('circle')
        .attr('r', nodeRadius)
        .attr('fill', d => colorScheme[d.group]);

    node.append('text')
        .text(d => d.label)
        .attr('x', 12)
        .attr('y', 3)
        .style('font-size', '10px')
        .style('fill', '#333');

    // Add tooltips
    node.append('title')
        .text(d => d.label);

    // Update positions
    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    return { simulation, svg };
}
