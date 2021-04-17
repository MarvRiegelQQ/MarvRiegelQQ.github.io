namespace EventExercise {

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {

        document.addEventListener("mousemove", setInfoBox);

        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);

        document.body.addEventListener("click", logInfo);
        document.body.addEventListener("keyup", logInfo);

        let documentDiveElements: NodeListOf<HTMLDivElement> = document.querySelectorAll("div");

        for (let i: number = 0; i < documentDiveElements.length; i++) {

            documentDiveElements[i].addEventListener("click", logInfo);
            documentDiveElements[i].addEventListener("keyup", logInfo);
        }
    }

    function setInfoBox(_event: MouseEvent): void {
        let x: number = _event.clientX;
        let y: number = _event.clientY;
        let mouseCoordinates: string = "X coords: " + x + ", Y coords: " + y;

        let theTarget: EventTarget = <EventTarget>_event.target;

        let span: HTMLSpanElement = <HTMLSpanElement>document.querySelector("span");

        span.innerHTML = mouseCoordinates + theTarget;
        span.style.left = x + "px";
        span.style.top = y + "px";
    }

    function logInfo(_event: Event): void {
        console.log(_event.type);
        console.log(_event.target);
        console.log(_event.currentTarget);
        console.log(_event.composedPath());
    }
}