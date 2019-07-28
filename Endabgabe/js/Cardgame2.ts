interface Card {
    CardColor: String;
    CardValue: number;
}

let DrawCards: Card[] = [];
let TableCard: Card[] = [];
let CPUHand: Card[] = [];
let PlayerHand: Card[] = [];
    
window.onload = function (){
    document.getElementById("deckZone").addEventListener("click",DrawCard,false);
    Play();
}

function DrawCard(){
    if(CardCheck(PlayerHand)==false){
        PlayerHand.push(DrawCards[DrawCards.length-1]);
        DrawCards.splice(DrawCards.length-1, 1);
        updateHTML("PlayerHand");
        updateHTML("DrawCards");
    }
    if(CardCheck(PlayerHand)==false){
        EnemyTurn();
    }
}

function CardCheck(array : Card[]) : boolean {
    let suitableCard : boolean = false;
    for (let i=0; i<array.length;i++) {
        if (array[i].CardColor == TableCard[TableCard.length-1].CardColor || array[i].CardValue == TableCard[TableCard.length-1].CardValue){
            suitableCard = true;
            break;
        }
    }
    return suitableCard;
}

function updateHTML(Target : string){
    ClearHTML(Target);
    if(Target == "PlayerHand"){
        for(let i=0; i< PlayerHand.length; i++) {
            CardHTML(PlayerHand[i],"PlayerHand",i);
        }
    }
    if(Target == "CPUHand"){
        for(let i=0; i< CPUHand.length; i++) {
            HiddenCard(CPUHand[i],"CPUHand",i);
        }
    }
    if(Target == "TableCard"){
        CardHTML(TableCard[TableCard.length-1], "TableCard",TableCard.length-1);
    }
    if(Target == "DrawCards"){
        HiddenCard(DrawCards[DrawCards.length-1], "DrawCards", DrawCards.length-1);
    }
}

function ClearHTML(Target : string){
    let Element: HTMLElement = document.getElementById(Target);
    while (Element.firstChild){
        Element.removeChild(Element.firstChild);
    }
}

function CardHTML(Card: Card, Target: string, index: number){
    let holdingDiv: HTMLElement = document.createElement("div");
    holdingDiv.setAttribute("class", "Card" + " " + Card.CardColor);
    document.getElementById(Target).appendChild(holdingDiv);

    let Number: HTMLElement = document.createElement("p");
    Number.setAttribute("class", "CardValue");
    Number.innerHTML = "" + Card.CardValue;
    holdingDiv.appendChild(Number);

    if(Target == "PlayerHand"){
        holdingDiv.addEventListener("click", function() {CardPut(Card, index)}, false);
    }
}

function HiddenCard(card: Card, Target: string, index: number){
    let holdingDiv: HTMLElement = document.createElement("div");
    holdingDiv.setAttribute("class", "card" + " " + "Hidden");
    document.getElementById(Target).appendChild(holdingDiv);
}

function CardPut(card: Card, index: number){
    if(card.CardValue == TableCard[TableCard.length-1].CardValue || card.CardColor == TableCard[TableCard.length-1].CardColor){
        TableCard.push(card);
        PlayerHand.splice(index, 1);
        if(PlayerHand.length < 1){GameOver(true);}
        updateHTML("PlayerHand");
        updateHTML("TableCard");
        EnemyTurn();
    }
}

function EnemyTurn(){
    let i=0;
    for(i; i<CPUHand.length;i++){
        if(CPUHand[i].CardColor == TableCard[TableCard.length-1].CardColor || CPUHand[i].CardValue == TableCard[TableCard.length-1].CardValue){
            TableCard.push(CPUHand[i]);
            CPUHand.splice(i,1);
            if(CPUHand.length < 1){GameOver(false);}
            updateHTML("TableCard");
            updateHTML("CPUHand");
            break;
        }
    }
    if(i >= CPUHand.length){
        CPUHand.push(DrawCards[DrawCards.length-1]);
        DrawCards.splice(DrawCards.length-1,1);
        updateHTML("DrawCards");
        updateHTML("CPUHand");
    if(CPUHand[CPUHand.length-1].CardColor == TableCard[TableCard.length-1].CardColor || CPUHand[CPUHand.length-1].CardValue == TableCard[TableCard.length-1].CardValue){
        TableCard.push(CPUHand[CPUHand.length-1]);
        CPUHand.splice(CPUHand.length-1,1);
        updateHTML("TableCard");
        updateHTML("CPUHand");
    }
    }
}

function GenerateCards() {                            //Erstellt neues Deck

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
        let newCard: Card = {                                         
            CardValue : newCardValue,
            CardColor: newCardColour,
        };
        DrawCards.push(newCard);
        }   
    }
}

function shuffle(array : Card[]){
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

function Play(){
    GenerateCards();
    DrawCards = shuffle(DrawCards);
    for(let i=0; i<5; i++){
        PlayerHand.push(DrawCards[i]);
        CPUHand.push(DrawCards[i+5]);
    }

    TableCard.push(DrawCards[10]);
    DrawCards.splice(0,11);

    console.log(PlayerHand);
    console.log(CPUHand);
    console.log(DrawCards);

    for(let i=0; i<PlayerHand.length; i++) {
        CardHTML(PlayerHand[i],"PlayerHand",i);
    }
    for(let i=0; i<CPUHand.length; i++) {
        HiddenCard(CPUHand[i],"CPUHand",i);
    }


    CardHTML(TableCard[TableCard.length-1],"TableCard",TableCard.length-1);
    HiddenCard(DrawCards[DrawCards.length-1],"DrawCards",DrawCards.length-1);
}

function GameOver(win: boolean){
    if(win){
        alert("You won. Feel free to play again!");
        location.reload();
    }
    else{
        alert("You lost. Try playing again!");
        location.reload();
    }
}