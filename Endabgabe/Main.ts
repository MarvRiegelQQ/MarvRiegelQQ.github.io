namespace Gemuesegarten {

    //Variablen deklarieren
    let board: number = 39;
    let gameboard: HTMLDivElement;
    let gameContainer: HTMLDivElement;
    let walletContainer: HTMLDivElement;
    let textContainer: HTMLDivElement;

    window.onload = drawField;

    function drawField(): void {
        // Instanz von Wallet
        Wallet.instance = new Wallet();
        gameContainer = document.querySelector(".gameContainer")!;
        walletContainer = document.querySelector(".walletContainer")!;

        // WalletContainer befüllen 
        Wallet.instance.refreshWalletUI();

        // nach jedem durchlauf gameContainer leeren, sonst generieren sich immer neue divs
        gameContainer.innerHTML = "";

        // Spielfeld mit 40 divs erstellen
        for (let i: number = 0; i <= board; i++) {

            gameboard = document.createElement("div");
            gameboard.classList.add("field");

            // damit wir eine Instanz von Fields haben und damit wir später onClick funktion aufrufen können
            let createdField: Fields = new Fields(gameboard);

            gameboard.addEventListener("click", function(): void {
                createdField.onClick();
            });

            gameContainer.appendChild(gameboard);
        }

        textContainer = document.createElement("div");
        textContainer.classList.add("textContainer");
        textContainer.innerHTML = "Wenn du eine Pflanze gepflanzt hast, hover über deinen Setzlinge um zu sehen wie du sie pflegen musst, damit sie zu einer gesunden Pflanze heranwächst. Achte darauf, dass jede Pflanze genau das richtige bekommt und dass sie nicht von Schädlingen aufgegessen wird." ;

        document.body.appendChild(textContainer);
    }





}
