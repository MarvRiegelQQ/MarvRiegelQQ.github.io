"use strict";
var Gemuesegarten;
(function (Gemuesegarten) {
    let startButton = document.getElementById("startButton");
    startButton.addEventListener("click", startfct);
    // http://net-informations.com/js/iq/load.htm
    function startfct() {
        window.location.href = "http://127.0.0.1:5500/Endabgabe/Gemuesegarten.html";
    }
})(Gemuesegarten || (Gemuesegarten = {}));
//# sourceMappingURL=Start.js.map