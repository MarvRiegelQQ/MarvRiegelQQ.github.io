// Interface/Arrays Karten
interface cards {
    cardValue: number;
    cardColour: string;
}

let playerCards: cards[] = [];
let enemyCards: cards[] = [];
let discardedCardsPile: cards[] = [];                           
let drawCardsPile: cards[] = [];

//Spielbeginn bei Seitenaufruf
window.onload = function () {

    newDeck();
    shuffleCards();
    dealCards();
    generateGamePlay();
    console.log("Karten gemischt, ausgeteilt und bereit!")
}

//Funktionen für das Spiel
function newDeck() {                            //Erstellt neues Deck

    let newCardValue: number;
    let newCardColour: string;

    for(let v:number=1; v<=8; v++){
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
    for (let k: number = 0; k < discardedCardsPile.length; k++) {
        generateDiscardedHTML(k);
    }
    for (let i: number = 0; i < enemyCards.length; i++) {
        generateEnemyHTML(i);
    }
    generateDrawPileHTML();
}


    //Generiert Karten in der Hand des Spielers. Eventlistener macht die Karten klickbar/spielbar
function generatePlayerHTML(Card : number){
    let divcards: HTMLElement = document.createElement("div");
    divcards.setAttribute("id", "playerHand" + Card + 1);
    divcards.setAttribute("class", "card");
    divcards.addEventListener('click', function  (){ movePlay(); }, false);
    document.getElementById("playerHand").appendChild(divcards);
    let shownCardValue: string = playerCards[Card].cardValue + "";

    //valueTop generiert die HTML-Elemente der Farbe/Wertigkeit  
    let valueTop: HTMLElement = document.createElement("p");
    valueTop.innerHTML = shownCardValue + "";
    valueTop.setAttribute("class", playerCards[Card].cardColour);
    divcards.appendChild(valueTop);

}
    //Generiert die verdeckten Karten in der Gegnerhand
function generateEnemyHTML(Card : number){
    let divcards: HTMLElement = document.createElement("p");
    divcards.setAttribute("id", "enemyHand" + (Card + 1));                  
    divcards.setAttribute("class", "cardHidden");     
    document.getElementById("enemyHand").appendChild(divcards); 
}
    //Generiert den Kartenstapel um Karten ziehen zu können
function generateDrawPileHTML(){
    let divcards: HTMLElement = document.createElement("div");              
    divcards.setAttribute("id", "DrawPileTop");                  
    divcards.setAttribute("class", "cardHidden");     
    divcards.addEventListener('click', function () { moveDraw(); }, false); 
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

function updateHTML(Target : string){
    ClearHTML(Target);
    if(Target == "playerCards"){
        for(let i=0; i< playerCards.length; i++) {
            generatePlayerHTML(playerCards[i],"playerCards",i);
        }
    }
    if(Target == "enemyCards"){
        for(let i=0; i< enemyCards.length; i++) {
            generateEnemyHTML(enemyCards[i],"enemyCards",i);
        }
    }
    if(Target == "discardPile"){
        generatePlayerHTML(discardedCardsPile[discardedCardsPile.length-1], "discardPile",discardedCardsPile.length-1);
    }
    if(Target == "drawPile"){
        generateEnemyHTML(drawCardsPile[drawCardsPile.length-1], "drawPile", drawCardsPile.length-1);
    }
}


function ClearHTML(Target : string){
    let Element: HTMLElement = document.getElementById(Target);
    while (Element.firstChild){
        Element.removeChild(Element.firstChild);
    }
}


function movePlay(){
    for(let i=0; i<5; i++){
        playerCards.push(drawCardsPile[i]);
        enemyCards.push(drawCardsPile[i+4]);
    }

    discardedCardsPile.push(drawCardsPile[1]);
    drawCardsPile.splice(0);

    for(let i=0; i<playerCards.length; i++) {
        generatePlayerHTML(i);
    }
    for(let i=0; i<enemyCards.length; i++) {
        generateEnemyHTML(i);
    }


    generatePlayerHTML(discardedCardsPile.length-1);
    generateEnemyHTML(drawCardsPile.length-1);
}


function moveDraw(){
    if(checkMatchingCard(playerCards)==false){
        playerCards.push(drawCardsPile[drawCardsPile.length-1]);
        drawCardsPile.splice(drawCardsPile.length-1, 1);
        updateHTML("playerCards");
        updateHTML("drawPile");
    }
    if(checkMatchingCard(playerCards)==false){
        EnemyTurn();
    }
}

function checkMatchingCard(array : cards[]) : boolean {
    let matchingCard : boolean = false;
    for (let i=0; i<array.length;i++) {
        if (array[i].cardColour == discardedCardsPile[discardedCardsPile.length-1].cardColour || array[i].cardValue == discardedCardsPile[discardedCardsPile.length-1].cardValue){
            matchingCard = true;
            break;
        }
    }
    return matchingCard;
}

function endofgame(win: boolean){
    if(win){
        alert("Great Job! You Win!");
        location.reload();
    }
    else{
        alert("Game Over! Again?");
        location.reload();
    }
}

function CardPut(card: cards, index: number){
    if(card.cardValue == discardedCardsPile[discardedCardsPile.length-1].cardValue || card.cardColour == discardedCardsPile[discardedCardsPile.length-1].cardColour){
        discardedCardsPile.push(card);
        playerCards.splice(index, 1);
        if(playerCards.length < 1){endofgame(true);}
        updateHTML("playerHand");
        updateHTML("discardPile");
        EnemyTurn();
    }
}

function EnemyTurn(){
    let i=0;
    for(i; i<enemyCards.length;i++){
        if(enemyCards[i].cardColour == discardedCardsPile[discardedCardsPile.length-1].cardColour || enemyCards[i].cardValue == discardedCardsPile[discardedCardsPile.length-1].cardValue){
            discardedCardsPile.push(enemyCards[i]);
            enemyCards.splice(i,1);
            if(enemyCards.length < 1){endofgame(false);}
            updateHTML("discardPile");
            updateHTML("enemyHand");
            break;
        }
    }
    if(i >= enemyCards.length){
        enemyCards.push(drawCardsPile[drawCardsPile.length-1]);
        drawCardsPile.splice(drawCardsPile.length-1,1);
        updateHTML("discardPile");
        updateHTML("enemyHand");
    if(enemyCards[enemyCards.length-1].cardColour == discardedCardsPile[discardedCardsPile.length-1].cardColour || enemyCards[enemyCards.length-1].cardValue == discardedCardsPile[discardedCardsPile.length-1].cardValue){
        discardedCardsPile.push(enemyCards[enemyCards.length-1]);
        enemyCards.splice(enemyCards.length-1,1);
        updateHTML("discardPile");
        updateHTML("enemyHand");
    }
    }
}