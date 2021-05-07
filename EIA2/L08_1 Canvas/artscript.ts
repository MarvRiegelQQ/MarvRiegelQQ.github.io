namespace canvas {

    window.addEventListener("load", drawArt);
    let crc2: CanvasRenderingContext2D;
    let crc3: CanvasRenderingContext2D;
    let crc4: CanvasRenderingContext2D;

    function drawArt(_event: Event): void {
        let canvas: HTMLCanvasElement = document.querySelector(".canvas")!;
        crc2 = canvas.getContext("2d")!;
        crc3 = canvas.getContext("2d")!;
        crc4 = canvas.getContext("2d")!;

        console.log(crc2);

        circle();
//        triangle();
        square();
    }


    function circle(): void {
        for (let index: number = 0; index < 20; index++) {

            let greenCircle: number = Math.floor(Math.random() * 250);
            let blueCircle: number = Math.floor(Math.random() * 100);
            let redCircle: number = Math.floor(Math.random() * 150);

            crc2.beginPath();

            crc2.arc(Math.floor(Math.random() * (200) + 1), (Math.random() * (200) + 1), (Math.random() * (100) + 1), 0, 5 + Math.PI);

            crc2.fillStyle = "rgb( " + greenCircle + ", " + blueCircle + ", " + redCircle + ")";
            crc2.fill();

            crc2.closePath();
            crc2.stroke();


        }

    }


    function square(): void {
        for (let index: number = 0; index < 10; index++) {

            let greenTriangle: number = Math.floor(Math.random() * 200);
            let blueTriangle: number = Math.floor(Math.random() * 200);
            let redTriangle: number = Math.floor(Math.random() * 200);

            crc4.beginPath();

            crc4.moveTo(Math.floor(Math.random() * (700) + 1), Math.floor(Math.random() * (700) + 1));
            crc4.lineTo(Math.floor(Math.random() * (300) + 1), Math.floor(Math.random() * (300) + 1));
            crc4.lineTo(Math.floor(Math.random() * (300) + 1), Math.floor(Math.random() * (300) + 1));
            crc4.lineTo(Math.floor(Math.random() * (350) + 1), Math.floor(Math.random() * (250) + 1));

            crc4.fillStyle = "rgb( " + greenTriangle + ", " + blueTriangle + ", " + redTriangle + ")";
            crc4.fill();

            crc4.closePath();
            crc4.stroke();

        }


    }

    let newCanvas: HTMLElement = <HTMLElement>document.querySelector(".reloadButton");

    newCanvas.addEventListener("click", function (): void {
        location.reload();
    });




}