let playerCardsArray = [];
let enemyCardsArray = [];
let discardedCardsArray = [];
let drawCardsArray = [];
//Spielbeginn bei Seitenaufruf
window.onload = function () {
    generateNewGameDeck();
    shuffleGameDeck();
    dealCards();
    updateHTML();
    console.log("Karten gemischt, ausgeteilt und bereit!");
};
//Funktionen für das Spiel
function generateNewGameDeck() {
    let newCardValue;
    let newCardColour;
    for (let v = 1; v <= 9; v++) {
        for (let c = 0; c < 4; c++) {
            newCardValue = v;
            switch (c) {
                case 0:
                    newCardColour = "purple";
                    break;
                case 1:
                    newCardColour = "darkcyan";
                    break;
                case 2:
                    newCardColour = "green";
                    break;
                case 3:
                    newCardColour = "red";
                    break;
            }
            let newCard = {
                cardValue: newCardValue,
                cardColour: newCardColour,
            };
            drawCardsArray.push(newCard);
        }
    }
}
function shufflegameDeck() {
    drawCardsArray.sort(function (a, b) {
        return 0.5 - Math.random();
    });
}
//# sourceMappingURL=test.js.map