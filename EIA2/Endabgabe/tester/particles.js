//window.onload = function() {
(function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const colorInput = document.getElementById("colorInput");
    const sizeInput = document.getElementById("sizeInput");
    const shapeInput = document.getElementById("shapeInput");
    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;
    //   class Particle {
    //     x: number;
    //     y: number;
    //     color: string;
    //     size: number;
    //     xSpeed: number;
    //     ySpeed: number;
    //     opacity: number;
    //     prevX: number;
    //     prevY: number;
    //     constructor(x: number, y: number, color: string, size: number) {
    //         this.x = x;
    //         this.y = y;
    //         this.color = color;
    //         this.size = size;
    //         this.xSpeed = (Math.random() - 0.5) * 20;
    //         this.ySpeed = (Math.random() - 0.5) * 20;
    //         this.opacity = 1;
    //         this.prevX = x;
    //         this.prevY = y;
    //     }
    //     update() {
    //         this.prevX = this.x;
    //         this.prevY = this.y;
    //         this.x += this.xSpeed;
    //         this.y += this.ySpeed;
    //         this.ySpeed += 0.2;
    //         this.opacity -= 0.005;
    //     }
    //     draw() {
    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    //         ctx.fillStyle = this.color;
    //         ctx.globalAlpha = this.opacity;
    //         ctx.fill();
    //         ctx.closePath();
    //         ctx.restore();
    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.arc(this.x, this.y, this.size * 1.2, 0, 2 * Math.PI);
    //         ctx.fillStyle = this.color;
    //         ctx.globalAlpha = this.opacity * 0.8;
    //         ctx.fill();
    //         ctx.closePath();
    //         ctx.restore();
    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.arc(this.x, this.y, this.size * 1.5, 0, 2 * Math.PI);
    //         ctx.fillStyle = this.color;
    //         ctx.globalAlpha = this.opacity * 0.6;
    //         ctx.fill();
    //         ctx.closePath();
    //         ctx.restore();
    //    }
    //   }
    class Particle {
        constructor(x, y, color, size, shape) {
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
            this.trail.push({ x: this.x, y: this.y, opacity: this.opacity });
            for (let i = 0; i < this.trail.length; i++) {
                this.trail[i].opacity -= 0.02;
            }
        }
        draw() {
            for (let i = 0; i < this.trail.length; i++) {
                ctx.beginPath();
                if (this.shape === "circle") {
                    ctx.arc(this.trail[i].x, this.trail[i].y, this.size, 0, 2 * Math.PI);
                }
                else if (this.shape === "square") {
                    ctx.rect(this.trail[i].x - this.size, this.trail[i].y - this.size, this.size * 2, this.size * 2);
                }
                else if (this.shape === "triangle") {
                    ctx.moveTo(this.trail[i].x, this.trail[i].y - this.size);
                    ctx.lineTo(this.trail[i].x - this.size, this.trail[i].y + this.size);
                    ctx.lineTo(this.trail[i].x + this.size, this.trail[i].y + this.size);
                    ctx.lineTo(this.trail[i].x, this.trail[i].y - this.size);
                }
                else if (this.shape === "star") {
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
})();
//# sourceMappingURL=particles.js.map