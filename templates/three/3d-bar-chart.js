/**
 * Three.js 3D Bar Chart Template
 * 
 * Creates an interactive 3D bar chart with rotation controls
 * Perfect for: Comparative data, professional presentations, 3D visualizations
 */

function create3DBarChart(container, data, options = {}) {
    const {
        width = 800,
        height = 600,
        barSpacing = 1.5,
        colorScheme = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']
    } = options;

    // Clear container
    container.innerHTML = '';

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf9fafb);

    // Create camera
    const camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
    );
    camera.position.set(15, 15, 15);
    camera.lookAt(0, 0, 0);

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    // Create bars
    const bars = [];
    const maxValue = Math.max(...data.map(d => Object.values(d)[1] || 1));

    data.slice(0, 10).forEach((d, i) => {
        const value = Object.values(d)[1] || 1;
        const height = (value / maxValue) * 10;
        
        const geometry = new THREE.BoxGeometry(1, height, 1);
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(colorScheme[i % colorScheme.length])
        });
        
        const bar = new THREE.Mesh(geometry, material);
        bar.position.set(i * barSpacing, height / 2, 0);
        
        scene.add(bar);
        bars.push(bar);
    });

    // Add grid helper
    const gridHelper = new THREE.GridHelper(20, 20);
    scene.add(gridHelper);

    // Animation
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) / width - 0.5;
        mouseY = (e.clientY - rect.top) / height - 0.5;
        targetRotationX = mouseY * 0.5;
        targetRotationY = mouseX * 0.5;
    });

    function animate() {
        requestAnimationFrame(animate);

        // Smooth camera rotation
        camera.position.x += (targetRotationY * 30 - camera.position.x) * 0.05;
        camera.position.y += (15 - targetRotationX * 10 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        // Rotate bars slightly
        bars.forEach((bar, i) => {
            bar.rotation.y += 0.001 * (i + 1);
        });

        renderer.render(scene, camera);
    }

    animate();

    return { scene, camera, renderer };
}
