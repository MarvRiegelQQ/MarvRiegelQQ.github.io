const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// Set the canvas size to be the full size of the window
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

// Array to store all the particles
const particles: Particle[] = [];

// Particle class to represent each individual particle in the explosion
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.size = Math.random() * 3 + 1;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05;
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Event listener for mouse click
canvas.addEventListener("click", (event) => {
  // Get the mouse click position
  const x = event.clientX;
  const y = event.clientY;
  
  // Generate the particles for the explosion
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(x, y));
  }
});

// Animation loop to update and draw the particles
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    
    if (particles[i].y > canvas.height) {
      particles.splice(i, 1);
      i--;
    }
  }
}

animate();