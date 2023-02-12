// Get reference to canvas and its context
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

// Define particle properties
const particleCount = 50;
const particleArray: Particle[] = [];
const particleRadius = 5;
const maxSpeed = 2;

// Create particle class
class Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  color: string;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.directionX = Math.random() * maxSpeed * 2 - maxSpeed;
    this.directionY = Math.random() * maxSpeed * 2 - maxSpeed;
    this.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
  }

  update() {
    this.x += this.directionX;
    this.y += this.directionY;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, particleRadius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Create particle array
for (let i = 0; i < particleCount; i++) {
  particleArray.push(new Particle(0, 0));
}

// Listen for mouse click on canvas
canvas.addEventListener('click', (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  
  for (let i = 0; i < particleCount; i++) {
    particleArray[i].x = mouseX;
    particleArray[i].y = mouseY;
  }
});

// Animate particles
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < particleCount; i++) {
    particleArray[i].update();
    particleArray[i].draw();
  }
}

animate();