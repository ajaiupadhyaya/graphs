/**
 * P5.js Particle System Template
 * 
 * Creates an artistic particle-based data visualization
 * Perfect for: Dynamic data, real-time updates, artistic presentations
 */

class ParticleSystem {
    constructor(data, options = {}) {
        this.data = data;
        this.particles = [];
        this.options = {
            particleCount: Math.min(data.length * 5, 200),
            maxSpeed: 2,
            maxForce: 0.1,
            colorScheme: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'],
            ...options
        };
        this.initParticles();
    }

    initParticles() {
        for (let i = 0; i < this.options.particleCount; i++) {
            const dataPoint = this.data[i % this.data.length];
            const value = Object.values(dataPoint)[1] || Math.random() * 100;
            
            this.particles.push(new Particle(
                Math.random() * width,
                Math.random() * height,
                value,
                this.options.colorScheme[i % this.options.colorScheme.length]
            ));
        }
    }

    update() {
        this.particles.forEach(particle => {
            particle.update();
            particle.checkEdges();
        });
    }

    display() {
        this.particles.forEach(particle => {
            particle.display();
        });
    }
}

class Particle {
    constructor(x, y, value, color) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = createVector(0, 0);
        this.value = value;
        this.color = color;
        this.size = map(value, 0, 100, 2, 10);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(2);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    checkEdges() {
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
    }

    display() {
        noStroke();
        fill(this.color);
        circle(this.pos.x, this.pos.y, this.size);
    }
}

// P5.js sketch
function createParticleVisualization(data, containerWidth, containerHeight) {
    let particleSystem;

    const sketch = (p) => {
        p.setup = () => {
            p.createCanvas(containerWidth, containerHeight);
            particleSystem = new ParticleSystem(data);
        };

        p.draw = () => {
            p.background(255, 255, 255, 25); // Fade effect
            particleSystem.update();
            particleSystem.display();
        };
    };

    return sketch;
}
