// Interface/Arrays Karten
interface cards {
    cardValue: number;
    cardColour: string;
    }

let playerCards: cards[] = [];
let enemyCards: cards[] = [];
let discardedCardsPile: cards[] = [];                           
let drawCardsPile: cards[] = [];
let playedCards: cards[] = [];
let discardTop: cards[] = [];
let currentPlayer: boolean;
let turnPlayer: boolean;
let drawnCard : boolean;
//Spielbeginn bei Seitenaufruf
window.onload = function () {

    newGame();
    shuffleCards();
    dealCards();
    generateGamePlay();
    console.log("Karten gemischt, ausgeteilt und bereit!")
}

//Funktionen für das Spiel
function newGame() {                            //Erstellt neues Deck

    let newCardValue: number;
    let newCardColour: string;

    for(let v:number=1; v<=9; v++){
    for(let c:number=0; c<4; c++){

        newCardValue=v;
        switch(c){
            case 0: newCardColour = "purple"; break;
            case 1: newCardColour = "darkcyan"; break;
            case 2: newCardColour = "green"; break;
            case 3: newCardColour = "red"; break;
        }
        let newCard: cards = {                                         
            cardValue : newCardValue,
            cardColour: newCardColour,
        };
        drawCardsPile.push(newCard);
        }   
    }
}

function shuffleCards(){                        //Mischt die Karten
    drawCardsPile.sort(function(a, b){        
        return 0.5 - Math.random()          
    });

}


function dealCards (){                          //Teilt die Karten aus, bis jeder 5 Karten hat
let i = 5;                                      
    while (i){
        playerCards.push(drawCardsPile[0]);
        drawCardsPile.splice(0,1);
        enemyCards.push(drawCardsPile[0]);
        drawCardsPile.splice(0,1);
        i-=1;
    }
}

// Funktionen zur Erstellung der verschiedenen HTML-Elemente
function generateGamePlay(){
    for (let j: number = 0; j < playerCards.length; j++) {
        generatePlayerHTML(j);
    }
    for (let k: number = 0; k < playedCards.length; k++) {
        generateDiscardedHTML(k);
    }
    for (let i: number = 0; i < enemyCards.length; i++) {
        generateEnemyHTML(i);
    }
    generateDrawPileHTML();
}


    //Generiert Karten in der Hand des Spielers. Eventlistener macht die Karten klickbar/spielbar
function generatePlayerHTML(NumberCard : number){
    let divcards: HTMLElement = document.createElement("div");
    divcards.setAttribute("id", "playerHand" + NumberCard + 1);
    divcards.setAttribute("class", "card");
    divcards.addEventListener('click', function  (){ movePlay(NumberCard, turnPlayer); }, false);
    document.getElementById("playerHand").appendChild(divcards);
    let shownCardValue: string = playerCards[NumberCard].cardValue + "";

    //valueTop generiert die HTML-Elemente der Farbe/Wertigkeit  
    let valueTop: HTMLElement = document.createElement("p");
    valueTop.innerHTML = shownCardValue + "";
    valueTop.setAttribute("class", playerCards[NumberCard].cardColour);
    divcards.appendChild(valueTop);

}
    //Generiert die verdeckten Karten in der Gegnerhand
function generateEnemyHTML(NumberCard : number){
    let divcards: HTMLElement = document.createElement("p");
    divcards.setAttribute("id", "enemyHand" + (NumberCard + 1));                  
    divcards.setAttribute("class", "cardHidden");     
    document.getElementById("enemyHand").appendChild(divcards); 
}
    //Generiert den Kartenstapel um Karten ziehen zu können
function generateDrawPileHTML(){
    let divcards: HTMLElement = document.createElement("div");              
    divcards.setAttribute("id", "DrawPileTop");                  
    divcards.setAttribute("class", "cardHidden");     
    divcards.addEventListener('click', function () { moveDraw(turnPlayer); }, false); 
    document.getElementById("deckZone").appendChild(divcards); 
}
    //Generiert den Ablagestapel
function generateDiscardedHTML(NumberCard : number){
    let divcards: HTMLElement = document.createElement("div");              
    divcards.setAttribute("id", "discardPile" + (NumberCard + 1));                  
    divcards.setAttribute("class", "card");     
    document.getElementById("gameZone").appendChild(divcards);    
    let tempCardValue: string = discardedCardsPile[NumberCard].cardValue + "";

    //valueTop generiert die HTML-Elemente der Farbe/Wertigkeit 
    let valueTop: HTMLElement = document.createElement("p");               
    valueTop.innerHTML = tempCardValue +""; 
    valueTop.setAttribute("class", discardedCardsPile[NumberCard].cardColour);
    divcards.appendChild(valueTop);  
   
}

// Spielzug ausführen, wenn Karte angeklickt wurde
function movePlay(cardToPlay : cards, index : number) {
    // Nur möglich, wenn Spieler (nicht Gegner) an der Reihe ist
    if (currentPlayer) {
        // überprüfe erst, ob die geklickte Karte wirklich legbar ist
        if (cardToPlay.cardColour == discardTop.cardColour || cardToPlay.cardValue == discardTop.cardValue){
            currentPlayer = false; // Gegner ist als nächstes dran
            drawnCard = false;
            playedCards.push(cardToPlay); // Karte wird auf Ablagestapel gelegt...
            discardTop = cardToPlay; // ...und ist jetzt die oberste Karte auf dem Ablagestapel
            playerCards.splice(index,1); //...und wird aus Spielerdeck entfernt
            updateHtml(playerCards);
            updateHtml(activeCards);

            // Überprüfe ob Spieler noch Karten hat, also ob die gelegte Karte seine letzte war
            if (playerCards.length == 0){
                setTimeout(function () {document.getElementById("currentMove").innerHTML = "Du hast gewonnen!"},2000);
                
                clearAll();
            }
            else{
                document.getElementById("currentMove").innerHTML = "Dein Gegner ist an der Reihe!";
                opponent();
            }
        }
        else{
            window.alert("Die Karte passt nicht! Spiel eine andere oder nimm eine neue Karte auf.");
        }
    }
}



//Karte ablegen nach Klick auf Karte
  