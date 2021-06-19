var L11_1_Blumenwiese;
(function (L11_1_Blumenwiese) {
    class FlowerPink extends L11_1_Blumenwiese.SubFlower {
        constructor(_fillLevel, _position) {
            super(_position);
            let horizon = L11_1_Blumenwiese.crc2.canvas.height * L11_1_Blumenwiese.golden;
            let randomX = Math.floor(Math.random() * L11_1_Blumenwiese.crc2.canvas.width);
            let randomY = horizon + Math.floor(Math.random() * 250);
            if (_position)
                this.position = _position;
            else
                this.position = new L11_1_Blumenwiese.Vector(randomX, randomY);
            let randomFill = Math.floor(Math.random() * 50);
            if (_fillLevel)
                this.fillLevel = _fillLevel;
            else
                this.fillLevel = randomFill;
            this.velocity = new L11_1_Blumenwiese.Vector(0, 0);
        }
        draw() {
            // Blumenstiel
            L11_1_Blumenwiese.crc2.beginPath();
            L11_1_Blumenwiese.crc2.strokeStyle = "green";
            L11_1_Blumenwiese.crc2.fillStyle = "green";
            L11_1_Blumenwiese.crc2.fillRect(this.position.x, this.position.y, 4, 50);
            //Blätter
            L11_1_Blumenwiese.crc2.moveTo(this.position.x, this.position.y + 50);
            L11_1_Blumenwiese.crc2.lineTo(this.position.x + 10, this.position.y + 10);
            L11_1_Blumenwiese.crc2.moveTo(this.position.x, this.position.y + 40);
            L11_1_Blumenwiese.crc2.lineTo(this.position.x - 10, this.position.y + 20);
            L11_1_Blumenwiese.crc2.stroke();
            L11_1_Blumenwiese.crc2.fill();
            //Blütenblätter
            L11_1_Blumenwiese.crc2.save();
            L11_1_Blumenwiese.crc2.translate(this.position.x, this.position.y);
            for (let i = 80; i > 8; i -= 8) {
                L11_1_Blumenwiese.crc2.rotate(45 * Math.PI / 20);
                L11_1_Blumenwiese.crc2.beginPath();
                L11_1_Blumenwiese.crc2.moveTo(10, 20);
                L11_1_Blumenwiese.crc2.bezierCurveTo(-12, -25, 12, -25, 7, -10);
                L11_1_Blumenwiese.crc2.fillStyle = "pink";
                L11_1_Blumenwiese.crc2.strokeStyle = "pink";
                L11_1_Blumenwiese.crc2.fill();
                L11_1_Blumenwiese.crc2.stroke();
            }
            L11_1_Blumenwiese.crc2.restore();
            //Blüte
            L11_1_Blumenwiese.crc2.save();
            L11_1_Blumenwiese.crc2.beginPath();
            moveTo(this.position.x + 10, this.position.y + 20);
            L11_1_Blumenwiese.crc2.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI);
            L11_1_Blumenwiese.crc2.fillStyle = "yellow";
            L11_1_Blumenwiese.crc2.strokeStyle = "yellow";
            L11_1_Blumenwiese.crc2.fill();
            L11_1_Blumenwiese.crc2.stroke();
            L11_1_Blumenwiese.crc2.restore();
        }
        fill(_timeslice) {
            for (let i = 0; i < 10; i++) {
                L11_1_Blumenwiese.crc2.beginPath();
                L11_1_Blumenwiese.crc2.fillRect(this.position.x + 25, this.position.y - 5, 4, this.fillLevel);
                L11_1_Blumenwiese.crc2.closePath();
                L11_1_Blumenwiese.crc2.fillStyle = "#eb4fb7";
                L11_1_Blumenwiese.crc2.strokeStyle = "#eb4fb7";
                L11_1_Blumenwiese.crc2.fill();
                L11_1_Blumenwiese.crc2.stroke();
            }
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.fillLevel < 50)
                this.fillLevel += 0.03;
            if (this.fillLevel > 50)
                this.fillLevel -= this.fillLevel;
        }
    }
    L11_1_Blumenwiese.FlowerPink = FlowerPink;
})(L11_1_Blumenwiese || (L11_1_Blumenwiese = {}));
//# sourceMappingURL=FlowerPink.js.map