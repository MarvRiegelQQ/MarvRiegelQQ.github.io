namespace Gemuesegarten {

    export class Cucumber extends Vegetable {
        static informationInstance: Cucumber = new Cucumber(null);

        constructor(_uiField: Fields | null) {
            super(_uiField,
                  "cucumber",
                  120000,
                  1,
                  9,
                  5,
                  5,
                  25,
                  3
            );
        }

    }
}