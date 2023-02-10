(function () {
    const myCanvas = document.getElementById("canvas");
    const context = myCanvas.getContext("2d");
    const shapeInput = document.getElementById("shapeInput");
    // Array to store all the particles
    const particles = [];
    // RndColour class to represent each individual particle in the explosion
    class RndColour {
        constructor(x, y, shape) {
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
            switch (this.shape) {
                case "circle":
                    context.beginPath();
                    context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
                    context.fillStyle = this.color;
                    context.fill();
                    break;
                case "square":
                    context.fillStyle = this.color;
                    context.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
                    break;
                case "triangle":
                    context.beginPath();
                    context.moveTo(this.x, this.y - this.size);
                    context.lineTo(this.x - this.size, this.y + this.size);
                    context.lineTo(this.x + this.size, this.y + this.size);
                    context.closePath();
                    context.fillStyle = this.color;
                    context.fill();
                    break;
                case "star":
                    context.beginPath();
                    for (let i = 0; i < 5; i++) {
                        const angle = i * 2 * Math.PI / 5;
                        const x = this.x + this.size * Math.cos(angle);
                        const y = this.y + this.size * Math.sin(angle);
                        if (i === 0) {
                            context.moveTo(x, y);
                        }
                        else {
                            context.lineTo(x, y);
                        }
                    }
                    context.closePath();
                    context.fillStyle = this.color;
                    context.fill();
                    break;
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
//# sourceMappingURL=circleFW.js.map