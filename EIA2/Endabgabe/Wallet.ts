namespace Gemuesegarten {

    export class Wallet {

        // static damitman von jeder Klasse darauf zugreifen kann
        static instance: Wallet; 
            
        walletContainer: HTMLDivElement = document.querySelector(".walletContainer")!;

        // https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
        urlParam: URLSearchParams = new URLSearchParams(window.location.search);
        minPrice: number = parseInt(this.urlParam.get("minPrice")!);
        maxPrice: number = parseInt(this.urlParam.get("maxPrice")!);
        seedMoney: number = parseInt(this.urlParam.get("seedMoney")!);
        // am Start 100%
        inflationRatio: number = 1;

        constructor() {
            // damit handleInflation alle 2,5 min ausgeführt wird
            setInterval(this.handleInflation, 150000);
        }

        handleInflation(): void {
            let vegetableButtons: HTMLDivElement;
            let plantActionButtons: HTMLDivElement;

            vegetableButtons = document.querySelector(".vegetableButtons")!;
            vegetableButtons.innerHTML = "";

            plantActionButtons = document.querySelector(".plantActionButtons")!;
            plantActionButtons.innerHTML = "";

            // umgehen von self/ this problem, aber dadurch, dass es durch den Interval aufgerufen wird ist es wieder das falsche this
                        // wir bekommen eine random Zahl zwischen der maximalen und minimalen Preisschwankung, somit kann die Inflation schwanken und nicht nur steigen
            let changedInflation: number = Wallet.instance.randomIntFromInterval(Wallet.instance.minPrice, Wallet.instance.maxPrice);

            // durch 100 teilen, damit wir später normale kommazahlen (prozent) drauf rechnen können
            Wallet.instance.inflationRatio = changedInflation / 100;
            alert("Durch die Inflation schwanken die Preise");

        }

        // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript/7228322#7228322
        randomIntFromInterval(min: number, max: number): number { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        handleHarvestMoney (recentVegetable: Vegetable): void {
            this.seedMoney = this.seedMoney + recentVegetable.income;
            this.refreshWalletUI(); 
        }

        handleFertilizeMoney (recentVegetable: Vegetable): void {
            this.seedMoney = this.seedMoney - recentVegetable.fertilizePrice;
            this.refreshWalletUI();
        }

        handleSeedlingsMoney (recentVegetable: Vegetable): void {
            this.seedMoney = this.seedMoney - recentVegetable.plantPrice;
            this.refreshWalletUI();
        }

        handleHealMoney (recentVegetable: Vegetable): void {
            this.seedMoney = this.seedMoney - recentVegetable.healPrice;
            this.refreshWalletUI();
        }

        refreshWalletUI (): void {
            this.walletContainer.innerHTML = "";

            this.walletContainer.innerHTML = "wallet: " + this.seedMoney + " €";
        }
    }
}  