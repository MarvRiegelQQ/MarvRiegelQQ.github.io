
namespace randPoem {

    let Subjekt: string [] = ["Harry", "Hermine", "Ron", "Malfoy", "Crabbe", "Goyle"];
    let Praedikat: string [] = ["braut", "liebt", "studiert", "hasst", "verzaubert", "zerstört"];
    let Objekt: string [] = ["Vielsafttrank", "Butterbier", "Fleur", "Hogwarts", "Bertie Botts' Bohnen", "Askaban"];
    let Vers: string = "";

    for (let index: number = 6; index <= Objekt.length; index--) {
        if (index == 0) {
            break;
        } 
        
        getVers(Subjekt, Praedikat, Objekt, Vers);
    }

    function getVers(_Subjekt: string[], _Praedikat: string[], _Objekt: string[], _Vers: string ): string {
        
        let randSubjekt: number = Math.floor(Math.random() * _Subjekt.length);
        _Vers += _Subjekt.splice(randSubjekt, 1) + " ";

        let randPraedikat: number = Math.floor(Math.random() * _Subjekt.length);
        _Vers += _Praedikat.splice(randPraedikat, 1) + " ";

        let randObjekt: number = Math.floor(Math.random() * _Subjekt.length);
        _Vers += _Objekt.splice(randObjekt, 1) + " ";

        console.log(_Vers);
        return _Vers;        
    }
}