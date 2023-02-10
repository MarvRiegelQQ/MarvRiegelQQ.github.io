const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colorInput = document.getElementById("colorInput");
const sizeInput = document.getElementById("sizeInput");
const shapeInput = document.getElementById("shapeInput");
class Particle {
    constructor(x, y, color, size, shape) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.xSpeed = (Math.random() - 0.5) * 20;
        this.ySpeed = (Math.random() - 0.5) * 20;
        this.opacity = 1;
        this.shape = shape;
    }
    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.ySpeed += 0.2;
    }
    draw() {
        ctx.beginPath();
        if (this.shape === "circle") {
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        }
        else if (this.shape === "square") {
            ctx.rect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
        }
        else if (this.shape === "triangle") {
            ctx.moveTo(this.x, this.y - this.size);
            ctx.lineTo(this.x - this.size, this.y + this.size);
            ctx.lineTo(this.x + this.size, this.y + this.size);
            ctx.lineTo(this.x, this.y - this.size);
        }
        else if (this.shape === "star") {
            var angle = Math.PI / 2 * 3;
            var radius = this.size;
            var outerRadius = this.size * 2;
            ctx.moveTo(this.x, this.y - radius);
            for (var j = 0; j < 5; j++) {
                this.x = this.x + Math.cos(angle) * radius;
                this.y = this.y + Math.sin(angle) * radius;
                ctx.lineTo(this.x, this.y);
                angle += Math.PI / 5;
                this.x = this.x + Math.cos(angle) * outerRadius;
                this.y = this.y + Math.sin(angle) * outerRadius;
                ctx.lineTo(this.x, this.y);
                angle += Math.PI / 5;
            }
        }
        let particleArray = [];
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
        canvas.addEventListener("click", function (event) {
            let rect = canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            let shape = shapeInput.value;
            for (let i = 0; i < 20; i++) {
                particleArray.push(new Particle(x, y, colorInput.value, Number(sizeInput.value), shapeInput.value));
            }
        });
    }
}
//# sourceMappingURL=notrail.js.map