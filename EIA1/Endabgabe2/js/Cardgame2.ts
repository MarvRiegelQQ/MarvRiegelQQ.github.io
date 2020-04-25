interface Card {                                    //Interace der Karten
    cardColour: String;
    cardValue: number;
}

let drawPile: Card[] = [];                          //Attribute der Karten
let playedCards: Card[] = [];
let npcHand: Card[] = [];
let playerHand: Card[] = [];
    
window.onload = function (){                        //Onload-Funktion um Spiel zu starten
    document.getElementById("drawPile").addEventListener("click",actionDraw,false);
    actionPlay();
}

//HTML-Funktionen um...

function updateHTML(Target : string){               //...HTML zu aktualisieren/leeren
    clearHTML(Target);
    if(Target == "playerHand"){
        for(let i=0; i< playerHand.length; i++) {
            visibleCards(playerHand[i],"playerHand",i);
        }
    }
    if(Target == "npcHand"){
        for(let i=0; i< npcHand.length; i++) {
            flippedCards(npcHand[i],"npcHand",i);
        }
    }
    if(Target == "playedPile"){
        visibleCards(playedCards[playedCards.length-1], "playedPile",playedCards.length-1);
    }
    if(Target == "drawPile"){
        flippedCards(drawPile[drawPile.length-1], "drawPile", drawPile.length-1);
    }
}

function clearHTML(Target : string){                //...HTML zu leeren
    let Element: HTMLElement = document.getElementById(Target);
    while (Element.firstChild){
        Element.removeChild(Element.firstChild);
    }
}

function visibleCards(Card: Card, Target: string, index: number){  //...Spielerhand zu generieren
    let holdingDiv: HTMLElement = document.createElement("div");
    holdingDiv.setAttribute("class", "cards" + " " + Card.cardColour);
    document.getElementById(Target).appendChild(holdingDiv);

    let Number: HTMLElement = document.createElement("p");
    Number.setAttribute("class", "cardsValue");
    Number.innerHTML = "" + Card.cardValue;
    holdingDiv.appendChild(Number);

    if(Target == "playerHand"){
        holdingDiv.addEventListener("click", function() {playedMove(Card, index)}, false);
    }
}

function flippedCards(card: Card, Target: string, index: number){  //...Gegnerhand und Zugstapel zu generieren
    let holdingDiv: HTMLElement = document.createElement("div");
    holdingDiv.setAttribute("class", "cards" + " " + "flipped");
    document.getElementById(Target).appendChild(holdingDiv);
}

//Spielfunktionen
function actionDraw(){                                             //Funktion um Karte zu ziehen
    if(actionCheck(playerHand)==false){
        playerHand.push(drawPile[drawPile.length-1]);
        drawPile.splice(drawPile.length-1, 1);
        updateHTML("playerHand");
        updateHTML("drawPile");
    }
    if(actionCheck(playerHand)==false){
        enemyTurn();
    }
}

function actionCheck(array : Card[]) : boolean {                   //Funktion vergleicht ob Karte passt
    let suitableCard : boolean = false;
    for (let i=0; i<array.length;i++) {
        if (array[i].cardColour == playedCards[playedCards.length-1].cardColour || array[i].cardValue == playedCards[playedCards.length-1].cardValue){
            suitableCard = true;
            break;
        }
    }
    return suitableCard;
}

function playedMove(card: Card, index: number){                    //Spielerzug
    if(card.cardValue == playedCards[playedCards.length-1].cardValue || card.cardColour == playedCards[playedCards.length-1].cardColour){
        playedCards.push(card);
        playerHand.splice(index, 1);
        if(playerHand.length < 1){gamestate(true);}
        updateHTML("playerHand");
        updateHTML("playedPile");
        enemyTurn();
    }
}

function enemyTurn(){                                               //Gegnerzug
    let i=0;
    for(i; i<npcHand.length;i++){
        if(npcHand[i].cardColour == playedCards[playedCards.length-1].cardColour || npcHand[i].cardValue == playedCards[playedCards.length-1].cardValue){
            playedCards.push(npcHand[i]);
            npcHand.splice(i,1);
            if(npcHand.length < 1){gamestate(false);}
            updateHTML("playedPile");
            updateHTML("npcHand");
            break;
        }
    }
    if(i >= npcHand.length){
        npcHand.push(drawPile[drawPile.length-1]);
        drawPile.splice(drawPile.length-1,1);
        updateHTML("drawPile");
        updateHTML("npcHand");
    if(npcHand[npcHand.length-1].cardColour == playedCards[playedCards.length-1].cardColour || npcHand[npcHand.length-1].cardValue == playedCards[playedCards.length-1].cardValue){
        playedCards.push(npcHand[npcHand.length-1]);
        npcHand.splice(npcHand.length-1,1);
        updateHTML("playedPile");
        updateHTML("npcHand");
    }
    }
}

function CardGenerator(){                                           //Generiert 4 Farben à 8 Wertigkeiten
    let colour: string;
    for(let i=1; i<=8; i++){
        for (let c=0; c<=3; c++){
            
            if(c==0){
                colour = "blue"
            }

            if(c==2){
                colour = "darkslateblue"
            }

            if(c==3){
                colour = "orange"
            }

            if(c==3){
                colour = "green"
            }

            let NewCard: Card = {
                cardColour: colour,   cardValue: i
            }
            drawPile.push(NewCard);
        }
    }

    console.log(drawPile);
}

function shuffle(array : Card[]){                                   // Mischt das Deck
    let currentIndex = array.length;
    let TempValue;
    let randomIndex;

    while(currentIndex != 0){
        randomIndex = Math.floor(Math.random()*currentIndex);
        currentIndex -= 1;

        TempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = TempValue;
    }
    return array;
}

function actionPlay(){                                              //Teilt Karten aus und "startet" den Spielablauf
    CardGenerator();
    drawPile = shuffle(drawPile);
    for(let i=0; i<5; i++){
        playerHand.push(drawPile[i]);
        npcHand.push(drawPile[i+5]);
    }

    playedCards.push(drawPile[10]);
    drawPile.splice(0,11);

    console.log(playerHand);
    console.log(npcHand);
    console.log(drawPile);

    for(let i=0; i<playerHand.length; i++) {
        visibleCards(playerHand[i],"playerHand",i);
    }
    for(let i=0; i<npcHand.length; i++) {
        flippedCards(npcHand[i],"npcHand",i);
    }


    visibleCards(playedCards[playedCards.length-1],"playedPile",playedCards.length-1);
    flippedCards(drawPile[drawPile.length-1],"drawPile",drawPile.length-1);
}

function gamestate(win: boolean){                                   //Aktueller Stand des Spieles => Gewonnen/Verloren
    if(win){
        alert("Nice!");
        location.reload();
    }
    else{
        alert("Well you lost! Time to do it again!");
        location.reload();
    }
}