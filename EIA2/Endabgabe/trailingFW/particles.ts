(function() { //function um browser nicht zu verwirren
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  const colorInput = document.getElementById("colorInput") as HTMLInputElement;
  const sizeInput = document.getElementById("sizeInput") as HTMLInputElement;
  const shapeInput = document.getElementById("shapeInput") as HTMLSelectElement; 

//Klasse für einzelne Particle

class Particle {
    x: number;
    y: number;
    color: string;
    size: number;
    xSpeed: number;
    ySpeed: number;
    opacity: number;
    trail: Array<{ x: number, y: number, opacity: number }>;
    trailMaxLength: number;
    shape: string;

    constructor(x: number, y: number, color: string, size: number, shape: string) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.xSpeed = (Math.random() - 0.5) * 20;
        this.ySpeed = (Math.random() - 0.5) * 20;
        this.opacity = 1;
        this.trail = [];
        this.trailMaxLength = 20;
        this.shape = shape;
    }

    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.ySpeed += 0.2;
        this.opacity -= 0.02;
        this.trail.push({x: this.x, y: this.y, opacity: this.opacity});
    
        for (let i = 0; i < this.trail.length; i++) {
          this.trail[i].opacity -= 0.02;
        }
      }

//draw function inlklusive Trail mit for/if für die versch. Formen

    draw() {
        for (let i = 0; i < this.trail.length; i++) {
            ctx.beginPath();
            if (this.shape === "circle") {
                ctx.arc(this.trail[i].x, this.trail[i].y, this.size, 0, 2 * Math.PI);
            } else if (this.shape === "square") {
                ctx.rect(this.trail[i].x - this.size, this.trail[i].y - this.size, this.size * 2, this.size * 2);
            } else if (this.shape === "triangle") {
                ctx.moveTo(this.trail[i].x, this.trail[i].y - this.size);
                ctx.lineTo(this.trail[i].x - this.size, this.trail[i].y + this.size);
                ctx.lineTo(this.trail[i].x + this.size, this.trail[i].y + this.size);
                ctx.lineTo(this.trail[i].x, this.trail[i].y - this.size);
            } else if (this.shape === "star") {
                var angle = Math.PI / 2 * 3;
                var radius = this.size;
                var outerRadius = this.size * 2;
                ctx.moveTo(this.trail[i].x, this.trail[i].y - radius);
                for (var j = 0; j < 5; j++) {
                  this.x = this.trail[i].x + Math.cos(angle) * radius;
                  this.y = this.trail[i].y + Math.sin(angle) * radius;
                  ctx.lineTo(this.x, this.y);
                  angle += Math.PI / 5;
                  this.x = this.trail[i].x + Math.cos(angle) * outerRadius;
                  this.y = this.trail[i].y + Math.sin(angle) * outerRadius;
                  ctx.lineTo(this.x, this.y);
                  angle += Math.PI / 5;
                }
            }
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.trail[i].opacity;
            ctx.fill();
            ctx.closePath();
        }
      
    
        for (let i = 0; i < this.trail.length; i++) {
            ctx.beginPath();
            ctx.arc(this.trail[i].x, this.trail[i].y, this.size, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.trail[i].opacity;
            ctx.fill();
            ctx.closePath();
  
            this.trail[this.trail.length - i - 1].opacity -= 0.02;
        }
    }
}



  let particleArray: Particle[] = [];

  function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particleArray.length; i++) {
          particleArray[i].update();
          particleArray[i].draw();

          if (particleArray[i].opacity <= 0) {
              particleArray.splice(i, 1);
          }
      }
  }

  animate();

  canvas.addEventListener("click", function(event) {
      let rect = canvas.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;
      let shape = shapeInput.value;

      for (let i = 0; i < 20; i++) {
          particleArray.push(new Particle(x, y, colorInput.value, Number(sizeInput.value), shapeInput.value));
      }
  });
})();
