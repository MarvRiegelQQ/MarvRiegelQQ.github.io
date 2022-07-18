"use strict";
var Gemuesegarten;
(function (Gemuesegarten) {
    class Tomato extends Gemuesegarten.Vegetable {
        constructor(_uiField) {
            super(_uiField, "tomato", 50000, 2, 7, 3, 4, 19, 5);
        }
    }
    Tomato.informationInstance = new Tomato(null);
    Gemuesegarten.Tomato = Tomato;
})(Gemuesegarten || (Gemuesegarten = {}));
//# sourceMappingURL=Tomato.js.map