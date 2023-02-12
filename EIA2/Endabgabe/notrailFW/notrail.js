(function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let particleArray = [];
    ;
    let selectedShape;
    class Particle {
        constructor(x, y, color, particleRadius, shape) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.particleRadius = particleRadius;
            this.shape = shape;
            this.opacity = 1;
        }
        draw() {
            ctx.beginPath();
            ctx.globalAlpha = this.opacity;
            switch (this.shape) {
                case 'circle':
                    ctx.arc(this.x, this.y, this.particleRadius, 0, Math.PI * 2, false);
                    break;
                case 'square':
                    ctx.rect(this.x, this.y, this.particleRadius, this.particleRadius);
                    break;
                case 'triangle':
                    ctx.moveTo(this.x + this.particleRadius, this.y);
                    ctx.lineTo(this.x, this.y + this.particleRadius);
                    ctx.lineTo(this.x - this.particleRadius, this.y);
                    ctx.closePath();
                    break;
                case 'star':
                    ctx.moveTo(this.x, this.y + this.particleRadius);
                    ctx.lineTo(this.x + this.particleRadius, this.y + this.particleRadius * 0.5);
                    ctx.lineTo(this.x + this.particleRadius * 0.5, this.y);
                    ctx.lineTo(this.x + this.particleRadius, this.y - this.particleRadius * 0.5);
                    ctx.lineTo(this.x, this.y - this.particleRadius);
                    ctx.lineTo(this.x - this.particleRadius, this.y - this.particleRadius * 0.5);
                    ctx.lineTo(this.x - this.particleRadius * 0.5, this.y);
                    ctx.lineTo(this.x - this.particleRadius, this.y + this.particleRadius * 0.5);
                    ctx.closePath();
                    break;
                default:
                    break;
            }
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    canvas.addEventListener('click', function (event) {
        const colorInput = document.getElementById('colorInput');
        const color = colorInput.value;
        const sizeInput = document.getElementById('sizeInput');
        const particleRadius = parseInt(sizeInput.value);
        const shapeSelect = document.getElementById('shapeInput');
        selectedShape = shapeSelect.options[shapeSelect.selectedIndex].value;
        const mouseX = event.clientX - canvas.offsetLeft;
        const mouseY = event.clientY - canvas.offsetTop;
        init(mouseX, mouseY, color, particleRadius, selectedShape);
    });
    function init(mouseX, mouseY, color, particleRadius, shape) {
        particleArray = [];
        for (let i = 0; i < 180; i++) {
            let x = mouseX + Math.cos(i) * 100;
            let y = mouseY + Math.sin(i) * 100;
            particleArray.push(new Particle(x, y, color, particleRadius, shape));
        }
    }
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particleArray.length - 1; i >= 0; i--) {
            particleArray[i].x += Math.cos(i) * 2;
            particleArray[i].y += Math.sin(i) * 2;
            particleArray[i].opacity -= 0.05;
            if (particleArray[i].opacity <= 0) {
                particleArray.splice(i, 1);
            }
            else {
                particleArray[i].draw();
            }
        }
    }
    animate();
})();
//# sourceMappingURL=notrail.js.map