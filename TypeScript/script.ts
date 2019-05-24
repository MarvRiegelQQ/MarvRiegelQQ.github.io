console.log("Loading...");
//Festlegung der Variablen und Strings
let StringA : string = "Skrr" ; 
let StringB : string = "Brrt" ;
let Number1 : number = 246;
let Number2 : number = 145;

window.onload = function ()     //Nachdem die Seite geladen wurde
{
    console.log("Done Loading");
    Mathe();
    document.getElementById("Button1").addEventListener("click", click1); //Click
    document.getElementById("Button2").addEventListener("click", click2);
    document.getElementById("Button3").addEventListener("click", click31);
    document.getElementById("Button3").addEventListener("dblclick", click32); //Doubleclicker
    document.getElementById("Button4").addEventListener("mouseover", click4); //Mouseover
    document.getElementById("Button5").addEventListener("click", click5); 
    document.getElementById("Button6").addEventListener("click", click6);
}

function Mathe () //Die gewünschte Rechnung
{
    console.log ("Rechnung mit Variablen");
    console.log (StringA+StringB);
    console.log (StringB+StringA);
    console.log (StringA+Number1);
    console.log (Number2+StringA);
    console.log (StringA+Number2);
    console.log (Number1+StringA);
    console.log (StringB+Number1);
    console.log (Number2+StringB);
    console.log (StringB+Number2);
    console.log (Number1+StringB);
    console.log (Number1+Number2);
    
}
//Funktionen der Knöpfe
function click1() //Änder die Klasse+Button
{
    console.log("Button1 + Klasse wurden verändert");
    document.getElementById("Button1").innerHTML="I changed, I swear!";

    document.getElementById("Button1").className = "class2"
}

function click2() //Ändert den Button
{
    console.log("Button2 geändert");
    document.getElementById("Button2").innerHTML="I'm freeeeee";
}

function click31() //Ändert den Button + Doppelklick 
{
    console.log("Button3 geändert");
    document.getElementById("Button3").innerHTML="Double up buddy!";
}

function click32() //Erscheint nach Doppelklick
{
    console.log("Button3 geändert");
    document.getElementById("Button3").innerHTML="Another one!";
}

function click4() //Spooky Mouseover-Button
{
    console.log("Button4 geändert bei mouseover");
    document.getElementById("Button4").innerHTML="BOO!";
}

function click5() //Ändert die Variable "Number1"
{
    console.log("Button5 changed Number 1");
    document.getElementById("Button5").innerHTML="Math is hard ;)";

    let Number = Number1;
    let newNumber = Number1 + 420; 

}

function click6() //Fügt Paragraphen hinzu
{
    console.log("Button 6 changed / meme has appeared");
    document.getElementById("Button6").innerHTML="Vor has arrived!";

    let P = document.createElement ("p");
    let position = document.getElementById ("body");
    position.appendChild(P);
    P.innerHTML = "Look at them, they come to this place when they know they are not pure. Tenno use the keys, but they are mere trespassers. Only I, Vor, know the true power of the Void. I was cut in half, destroyed, but through it's Janus Key, the Void called to me. It brought me here and here I was reborn. We cannot blame these creatures, they are being led by a false prophet, an impostor who knows not the secrets of the Void. Behold the Tenno, come to scavenge and desecrate this sacred realm. My brothers, did I not tell of this day? Did I not prophesize this moment? Now, I will stop them. Now I am changed, reborn through the energy of the Janus Key. Forever bound to the Void. Let it be known, if the Tenno want true salvation, they will lay down their arms, and wait for the baptism of my Janus key. It is time. I will teach these trespassers the redemptive power of my Janus key. They will learn it's simple truth. The Tenno are lost, and they will resist. But I, Vor, will cleanse this place of their impurity.";
}