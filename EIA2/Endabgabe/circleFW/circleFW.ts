(function() {
const myCanvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = myCanvas.getContext("2d");
const shapeInput = document.getElementById("shapeInput") as HTMLSelectElement; 

// Array to store all the particles
const particles: RndColour[] = [];

// RndColour class to represent each individual particle in the explosion
class RndColour {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  shape: string;
  
  constructor(x: number, y: number, shape: string) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.size = Math.random() * 3 + 1;
    this.shape = shape;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05;
  }
  
  draw() {
    context.fillStyle = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    
    // Draw the particle based on the selected shape
    if (this.shape === "circle") {
      context.beginPath();
      context.arc(this.x, this.y, 5, 0, 2 * Math.PI);
      context.fill();
    } else if (this.shape === "square") {
      context.fillRect(this.x - 5, this.y - 5, 10, 10);
    } else if (this.shape === "triangle") {
      context.beginPath();
      context.moveTo(this.x - 5, this.y + 5);
      context.lineTo(this.x, this.y - 5);
      context.lineTo(this.x + 5, this.y + 5);
      context.fill();
    } else if (this.shape === "star") {
      context.beginPath();
      context.moveTo(this.x, this.y - 5);
      context.lineTo(this.x + 3, this.y + 2);
      context.lineTo(this.x - 5, this.y + 2);
      context.lineTo(this.x + 2, this.y + 5);
      context.lineTo(this.x - 2, this.y + 5);
      context.lineTo(this.x - 5, this.y + 2);
      context.fill();
    }
  }
}

// Event listener for mouse click
myCanvas.addEventListener("click", (event) => {
  // Get the mouse click position
  const x = event.clientX;
  const y = event.clientY;
  let shape = shapeInput.value;
  
  // Generate the explosion
  for (let i = 0; i < 100; i++) {
    const angle = 2 * Math.PI * i / 100;
    const shape = Math.random() < 0.5 ? "circle" : Math.random() < 0.5 ? "square" : Math.random() < 0.5 ? "triangle" : "star";
    particles.push(new RndColour(x + Math.cos(angle) * 50, y + Math.sin(angle) * 50, shape));
  }
});

// Animation function
function xpldAnimate() {
  // Clear the canvas
  context.clearRect(0, 0, myCanvas.width, myCanvas.height);
  
  // Update and draw all the particles
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    particle.update();
    particle.draw();
    
    // Remove the particle if it goes off the canvas
    if (particle.x > myCanvas.width || particle.x < 0 || particle.y > myCanvas.height || particle.y < 0) {
      particles.splice(i, 1);
      i--;
    }
  }
  
  // Keep animating
  requestAnimationFrame(xpldAnimate);
}

// Start the animation
requestAnimationFrame(xpldAnimate);
})();
