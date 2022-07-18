namespace Gemuesegarten {

    //hier werden Variablen deklariert
    let board: number = 39;
    let gameboard: HTMLDivElement;
    let gameContainer: HTMLDivElement;
    let walletContainer: HTMLDivElement;
    let textContainer: HTMLDivElement;

    window.onload = drawField;

    function drawField(): void {
        // Geldbeutel
        Wallet.instance = new Wallet();
        gameContainer = document.querySelector(".gameContainer")!;
        walletContainer = document.querySelector(".walletContainer")!;

        // WalletContainer befüllen 
        Wallet.instance.refreshWalletUI();

        // gameContainer wird geleeret, sonst entstehen mehr als 40
        gameContainer.innerHTML = "";

        // Erstellt die Felder
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
    }





}
