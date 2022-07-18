"use strict";
var Gemuesegarten;
(function (Gemuesegarten) {
    class Wallet {
        constructor() {
            this.walletContainer = document.querySelector(".walletContainer");
            // https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
            this.urlParam = new URLSearchParams(window.location.search);
            this.minPrice = parseInt(this.urlParam.get("minPrice"));
            this.maxPrice = parseInt(this.urlParam.get("maxPrice"));
            this.seedMoney = parseInt(this.urlParam.get("seedMoney"));
            // am Start 100%
            this.inflationRatio = 1;
            // damit handleInflation alle 2,5 min ausgeführt wird
            setInterval(this.handleInflation, 150000);
        }
        handleInflation() {
            let vegetableButtons;
            let plantActionButtons;
            vegetableButtons = document.querySelector(".vegetableButtons");
            vegetableButtons.innerHTML = "";
            plantActionButtons = document.querySelector(".plantActionButtons");
            plantActionButtons.innerHTML = "";
            // umgehen von self/ this problem, aber dadurch, dass es durch den Interval aufgerufen wird ist es wieder das falsche this
            // wir bekommen eine random Zahl zwischen der maximalen und minimalen Preisschwankung, somit kann die Inflation schwanken und nicht nur steigen
            let changedInflation = Wallet.instance.randomIntFromInterval(Wallet.instance.minPrice, Wallet.instance.maxPrice);
            // durch 100 teilen, damit wir später normale kommazahlen (prozent) drauf rechnen können
            Wallet.instance.inflationRatio = changedInflation / 100;
            alert("Durch die Inflation schwanken die Preise");
        }
        // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript/7228322#7228322
        randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        handleHarvestMoney(recentVegetable) {
            this.seedMoney = this.seedMoney + recentVegetable.income;
            this.refreshWalletUI();
        }
        handleFertilizeMoney(recentVegetable) {
            this.seedMoney = this.seedMoney - recentVegetable.fertilizePrice;
            this.refreshWalletUI();
        }
        handleSeedlingsMoney(recentVegetable) {
            this.seedMoney = this.seedMoney - recentVegetable.plantPrice;
            this.refreshWalletUI();
        }
        handleHealMoney(recentVegetable) {
            this.seedMoney = this.seedMoney - recentVegetable.healPrice;
            this.refreshWalletUI();
        }
        refreshWalletUI() {
            this.walletContainer.innerHTML = "";
            this.walletContainer.innerHTML = "wallet: " + this.seedMoney + " €";
        }
    }
    Gemuesegarten.Wallet = Wallet;
})(Gemuesegarten || (Gemuesegarten = {}));
//# sourceMappingURL=Wallet.js.map