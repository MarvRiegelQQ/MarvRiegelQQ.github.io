namespace Gemuesegarten {

    export class Tomato extends Vegetable {
        static informationInstance: Tomato = new Tomato(null);

        constructor(_uiField: Fields | null) {
            super(_uiField,
                  "tomato",
                  50000,
                  2,
                  7,
                  3,
                  4,
                  19,
                  5
            );
        }

    }
}