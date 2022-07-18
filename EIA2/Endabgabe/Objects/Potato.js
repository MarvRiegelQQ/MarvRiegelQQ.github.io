"use strict";
var Gemuesegarten;
(function (Gemuesegarten) {
    class Potato extends Gemuesegarten.Vegetable {
        constructor(_uiField) {
            super(_uiField, "potato", 10000, 1, 3, 1, 2, 20, 4);
        }
    }
    Potato.informationInstance = new Potato(null);
    Gemuesegarten.Potato = Potato;
})(Gemuesegarten || (Gemuesegarten = {}));
//# sourceMappingURL=Potato.js.map