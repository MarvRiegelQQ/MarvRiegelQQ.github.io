namespace Gemuesegarten {

    export class Carrots extends Vegetable {

        // static, damit man von jeder Classe darauf zugreifen kann,
        // brauchen wir damit wir Informationen vom constructor von Vegetable bekommen mit der statischen Info der Subclasse
        // und für Inflations bezogene Informationen
        // es muss nicht auf dem Spielfeld gepflanzt sein, aber wir brauchen trotzdem den Zugriff auf die info, deshalb null, aber deshalb darf es auf keine Info vom Spielfeld zugreifen
        static informationInstance: Carrots = new Carrots(null);

        // entweder auf dem Feld, oder nicht vorhanden, deshalb Fields oder null
        constructor(_uiField: Fields | null) {
            super(_uiField,
                  "carrot",
                  90000,
                  2,
                  6,
                  2,
                  2,
                  22,
                  7
      );
        }
    }
}