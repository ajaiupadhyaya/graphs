/**
 * P5.js Particle System Template
 * 
 * Creates an artistic particle-based data visualization
 * Perfect for: Dynamic data, real-time updates, artistic presentations
 */

// P5.js sketch - instance mode
function createParticleVisualization(data, containerWidth, containerHeight) {
    const sketch = (p) => {
        let particles = [];
        const colorScheme = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
        
        class Particle {
            constructor(x, y, value, color) {
                this.pos = p.createVector(x, y);
                this.vel = p5.Vector.random2D();
                this.acc = p.createVector(0, 0);
                this.value = value;
                this.color = color;
                this.size = p.map(value, 0, 100, 2, 10);
            }

            update() {
                this.vel.add(this.acc);
                this.vel.limit(2);
                this.pos.add(this.vel);
                this.acc.mult(0);
            }

            checkEdges() {
                if (this.pos.x > p.width) this.pos.x = 0;
                if (this.pos.x < 0) this.pos.x = p.width;
                if (this.pos.y > p.height) this.pos.y = 0;
                if (this.pos.y < 0) this.pos.y = p.height;
            }

            display() {
                p.noStroke();
                p.fill(this.color);
                p.circle(this.pos.x, this.pos.y, this.size);
            }
        }

        p.setup = () => {
            p.createCanvas(containerWidth, containerHeight);
            
            // Initialize particles
            const particleCount = Math.min(data.length * 5, 200);
            for (let i = 0; i < particleCount; i++) {
                const dataPoint = data[i % data.length];
                const value = Object.values(dataPoint)[1] || Math.random() * 100;
                
                particles.push(new Particle(
                    Math.random() * p.width,
                    Math.random() * p.height,
                    value,
                    colorScheme[i % colorScheme.length]
                ));
            }
        };

        p.draw = () => {
            p.background(255, 255, 255, 25); // Fade effect
            particles.forEach(particle => {
                particle.update();
                particle.checkEdges();
                particle.display();
            });
        };
    };

    return sketch;
}
