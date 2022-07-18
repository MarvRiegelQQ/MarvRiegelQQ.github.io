namespace Gemuesegarten {

    let startButton: HTMLElement = document.getElementById("startButton")!;

    startButton.addEventListener("click", startfct);

    // http://net-informations.com/js/iq/load.htm
    function startfct (): void {
        window.location.href = "http://127.0.0.1:5500/Endabgabe/Gemuesegarten.html";
    }
}