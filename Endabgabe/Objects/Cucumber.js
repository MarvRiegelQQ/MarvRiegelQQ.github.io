"use strict";
var Gemuesegarten;
(function (Gemuesegarten) {
    class Cucumber extends Gemuesegarten.Vegetable {
        constructor(_uiField) {
            super(_uiField, "cucumber", 120000, 1, 9, 5, 5, 25, 3);
        }
    }
    Cucumber.informationInstance = new Cucumber(null);
    Gemuesegarten.Cucumber = Cucumber;
})(Gemuesegarten || (Gemuesegarten = {}));
//# sourceMappingURL=Cucumber.js.map