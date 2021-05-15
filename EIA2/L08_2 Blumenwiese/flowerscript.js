var FieldOfFlowers;
(function (FieldOfFlowers) {
    window.addEventListener("load", handleLoad);
    let crc2;
    let golden = 0.5;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        let horizon = crc2.canvas.height * golden;
        let posMountains = { x: 0, y: horizon };
        let posTreesStart = { x: 28, y: horizon + 5 };
        let posTreesEnd = { x: crc2.canvas.width, y: horizon + 5 };
        drawBackground();
        drawSun({ x: 600, y: 75 });
        drawCloud({ x: 400, y: 50 }, { x: 250, y: 75 });
        drawCloud({ x: 600, y: 225 }, { x: 250, y: 75 });
        drawMountains(posMountains, 75, 200, "grey", "white");
        drawMountains(posMountains, 50, 150, "grey", "lightgrey");
        drawTrees(14, posTreesStart, posTreesEnd, 0.25, 0.37, 1);
        posTreesStart.y = horizon + 15;
        drawTrees(14, posTreesStart, posTreesEnd, 0.20, 0.37, 1);
        drawFlowers(0);
        for (var i = 0; i < 10; i++)
            ;
    }
    function drawBackground() {
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(100, 80%, 30%)");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    function drawSun(_position) {
        let r1 = 20;
        let r2 = 140;
        let gradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }
    function drawCloud(_position, _size) {
        let nParticles = 20;
        let radiusParticle = 50;
        let particle = new Path2D();
        let gradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);
        crc2.lineTo(x, 0);
        crc2.closePath();
        let gradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }
    function drawTrees(_nTrees, _posStart, _posEnd, _minScale, _stepPos, _stepScale) {
        let transform = crc2.getTransform();
        let step = {
            x: (_posEnd.x - _posStart.x) * _stepPos,
            y: (_posEnd.y - _posStart.y) * _stepPos
        };
        crc2.translate(_posStart.x, _posStart.y);
        crc2.scale(_minScale, _minScale);
        do {
            drawTree();
            crc2.translate(step.x, step.y);
            crc2.scale(_stepScale, _stepScale);
        } while (--_nTrees > 0);
        crc2.setTransform(transform);
    }
    function drawTree() {
        let nBranches = 50;
        let maxRadius = 60;
        let branch = new Path2D();
        branch.arc(0, 0, maxRadius, 0, 2 * Math.PI);
        crc2.fillStyle = "brown";
        crc2.fillRect(0, 0, 20, -200);
        crc2.save();
        crc2.translate(0, -120);
        do {
            let y = Math.random() * 350;
            let size = 1 - y / 700;
            let x = (Math.random() - 0.5) * 2 * maxRadius;
            crc2.save();
            crc2.translate(0, -y);
            crc2.scale(size, size);
            crc2.translate(x, 0);
            let colorAngle = 120 - Math.random() * 60;
            let color = "HSLA(" + colorAngle + ", 50%, 30%, 0.5)";
            crc2.fillStyle = color;
            crc2.fill(branch);
            crc2.restore();
        } while (--nBranches > 0);
        crc2.restore();
    }
    function drawFlowers(_nFlowers) {
        let horizon = crc2.canvas.height * golden;
        let random = { x: Math.floor(Math.random() * crc2.canvas.width), y: horizon + Math.floor(Math.random() * 500) };
        let random2 = { x: Math.floor(Math.random() * crc2.canvas.width), y: horizon + Math.floor(Math.random() * 500) };
        let random3 = { x: Math.floor(Math.random() * crc2.canvas.width), y: horizon + Math.floor(Math.random() * 200) };
        console.log(random);
        console.log(random2);
        console.log(random3);
        crc2.save();
        do {
            drawFlower1(random);
            drawFlower2(random2);
            drawFlower3(random3);
        } while (--_nFlowers > 0);
        crc2.restore();
    }
    function drawFlower1(_position) {
        // Sticks
        crc2.beginPath();
        crc2.strokeStyle = "green";
        crc2.fillStyle = "green";
        crc2.fillRect(_position.x, _position.y, 4, 50);
        // Leaves
        crc2.moveTo(_position.x, _position.y + 50);
        crc2.lineTo(_position.x + 10, _position.y + 10);
        crc2.moveTo(_position.x, _position.y + 40);
        crc2.lineTo(_position.x - 10, _position.y + 20);
        crc2.stroke();
        crc2.fill();
        crc2.save();
        // Petals
        crc2.translate(_position.x, _position.y);
        for (let i = 0; i < 5; i++) {
            crc2.rotate(Math.PI * 2 / 5);
            crc2.beginPath();
            crc2.moveTo(10, 10);
            crc2.lineTo(-7, -10);
            crc2.bezierCurveTo(-12, -25, 12, -25, 7, -10);
            crc2.closePath();
            crc2.fillStyle = "red";
            crc2.fill();
        }
        crc2.restore();
        // Petals
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.arc(0, 0, 7, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fillStyle = "yellow";
        crc2.fill();
        crc2.restore();
    }
    function drawFlower2(_position) {
        // Sticks
        crc2.beginPath();
        crc2.strokeStyle = "green";
        crc2.fillStyle = "green";
        crc2.fillRect(_position.x, _position.y, 4, 50);
        // Leaves
        crc2.moveTo(_position.x, _position.y + 50);
        crc2.lineTo(_position.x + 10, _position.y + 10);
        crc2.moveTo(_position.x, _position.y + 40);
        crc2.lineTo(_position.x - 10, _position.y + 20);
        crc2.stroke();
        crc2.fill();
        crc2.beginPath();
        moveTo(_position.x + 10, _position.y + 20);
        crc2.arc(_position.x, _position.y, 9, 0, 1 * Math.PI);
        crc2.fillStyle = "blue";
        crc2.strokeStyle = "blue";
        crc2.fill();
        crc2.stroke();
        moveTo(_position.x, _position.y + 20);
        crc2.lineTo(_position.x - 10, _position.y - 10);
        crc2.lineTo(_position.x - 3, _position.y + 2);
        crc2.lineTo(_position.x + 1, _position.y - 10);
        crc2.lineTo(_position.x + 4, _position.y + 2);
        crc2.lineTo(_position.x + 9, _position.y - 10);
        crc2.lineTo(_position.x + 9, _position.y + 3);
        crc2.closePath();
        crc2.fillStyle = "blue";
        crc2.fill();
        crc2.stroke();
        crc2.restore();
    }
    function drawFlower3(_position) {
        //Sticks
        crc2.beginPath();
        crc2.strokeStyle = "green";
        crc2.fillStyle = "green";
        crc2.fillRect(_position.x, _position.y, 4, 50);
        //Leaves
        crc2.moveTo(_position.x, _position.y + 50);
        crc2.lineTo(_position.x + 10, _position.y + 10);
        crc2.moveTo(_position.x, _position.y + 40);
        crc2.lineTo(_position.x - 10, _position.y + 20);
        crc2.stroke();
        crc2.fill();
        crc2.save();
        crc2.translate(_position.x, _position.y);
        for (let blossoms = 80; blossoms > 8; blossoms -= 8) {
            crc2.rotate(45 * Math.PI / 20);
            crc2.beginPath();
            crc2.moveTo(10, 20);
            crc2.bezierCurveTo(-12, -25, 12, -25, 7, -10);
            crc2.fillStyle = "white";
            crc2.strokeStyle = "white";
            crc2.fill();
            crc2.stroke();
        }
        crc2.restore();
        //Petals
        crc2.save();
        crc2.beginPath();
        moveTo(_position.x + 10, _position.y + 20);
        crc2.arc(_position.x, _position.y, 5, 0, 2 * Math.PI);
        crc2.fillStyle = "yellow";
        crc2.strokeStyle = "yellow";
        crc2.fill();
        crc2.stroke();
        crc2.restore();
        crc2.restore();
    }
})(FieldOfFlowers || (FieldOfFlowers = {}));
//# sourceMappingURL=flowerscript.js.map