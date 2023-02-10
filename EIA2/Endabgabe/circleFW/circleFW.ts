(function() {

const myCanvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = myCanvas.getContext("2d");

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
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
  }
}

// Event listener for mouse click
myCanvas.addEventListener("click", (event) => {
  // Get the mouse click position
  const rect = myCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  // Generate the particles for the explosion
  for (let i = 0; i < 50; i++) {
    particles.push(new RndColour(x, y));
  }
});

// Animation loop to update and draw the particles
function xpldAnimate() {
  requestAnimationFrame(xpldAnimate);
  context.clearRect(0, 0, myCanvas.width, myCanvas.height);
  
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    
    if (particles[i].y > myCanvas.height) {
      particles.splice(i, 1);
      i--;
    }
  }
}

xpldAnimate();

})();