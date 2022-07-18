"use strict";
var Gemuesegarten;
(function (Gemuesegarten) {
    class Lettuce extends Gemuesegarten.Vegetable {
        constructor(_uiField) {
            super(_uiField, "lettuce", 60000, 3, 5, 1, 2, 19, 2);
        }
    }
    // 
    Lettuce.informationInstance = new Lettuce(null);
    Gemuesegarten.Lettuce = Lettuce;
})(Gemuesegarten || (Gemuesegarten = {}));
//# sourceMappingURL=Lettuce.js.map