var randPoem;
(function (randPoem) {
    let Subjekt = ["Harry", "Hermine", "Ron", "Malfoy", "Crabbe", "Goyle"];
    let Praedikat = ["braut", "liebt", "studiert", "hasst", "verzaubert", "zerstört"];
    let Objekt = ["Vielsafttrank", "Butterbier", "Fleur", "Hogwarts", "Bertie Botts' Bohnen", "Askaban"];
    let Vers = "";
    for (let index = 6; index <= Objekt.length; index--) {
        if (index == 0) {
            break;
        }
        getVers(Subjekt, Praedikat, Objekt, Vers);
    }
    function getVers(_Subjekt, _Praedikat, _Objekt, _Vers) {
        let randSubjekt = Math.floor(Math.random() * _Subjekt.length);
        _Vers += _Subjekt.splice(randSubjekt, 1) + " ";
        let randPraedikat = Math.floor(Math.random() * _Subjekt.length);
        _Vers += _Praedikat.splice(randPraedikat, 1) + " ";
        let randObjekt = Math.floor(Math.random() * _Subjekt.length);
        _Vers += _Objekt.splice(randObjekt, 1) + " ";
        console.log(_Vers);
        return _Vers;
    }
})(randPoem || (randPoem = {}));
//# sourceMappingURL=randpoem.js.map