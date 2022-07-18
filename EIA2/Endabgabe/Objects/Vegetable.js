"use strict";
var Gemuesegarten;
(function (Gemuesegarten) {
    let Status;
    (function (Status) {
        Status[Status["Seedling"] = 0] = "Seedling";
        Status[Status["Plant"] = 1] = "Plant";
        Status[Status["Dying"] = 2] = "Dying";
    })(Status = Gemuesegarten.Status || (Gemuesegarten.Status = {}));
    class Vegetable {
        constructor(_uiField, _growthStatus2, _growthTime, _fertilize, _fertilizePrice, _water, _price, _income, _health) {
            this.water = 0;
            this.fertilize = 0;
            this.growthStatus2 = _growthStatus2;
            this.growthTime = _growthTime;
            this.neededFertilize = _fertilize;
            this.fertilizePrice = _fertilizePrice;
            this.neededWater = _water;
            this.plantPrice = _price;
            this.income = _income;
            this.healPrice = _health;
            this.growthStatus1 = "plant";
            this.damageStatus = "dead";
            this.bugStatus = "bugs";
            this.status = Status.Seedling;
            // wenn Feld bepflanzt ist und dementsprechend nicht null
            if (_uiField != null) {
                this.uiField = _uiField;
                this.handleGrowth();
                // Gibt ne random number zw. 1 und 5
                let bugPosibleCount = this.randomIntFromInterval(1, 5);
                // gehen 5 mal die Shleife durch und lassen uns eine random Zahl innerhalb der growth time ausgeben
                for (let i = 0; i < bugPosibleCount; i++) {
                    let getRandomNumber = this.randomIntFromInterval(1, this.growthTime);
                    // setzen die random zahl der growth time, damit der bug random in der Growth time kommt
                    setTimeout(this.handleBug, getRandomNumber, this);
                }
            }
        }
        // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript/7228322#7228322
        randomIntFromInterval(min, max) {
            // wir bekommen eine random Zahl zwischen der maximalen und minimalen Zahl
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        getPlantPrice() {
            // gibt den Wert zurück auf den die Inflatio gerechnet wurde 
            return Math.round(this.plantPrice * Gemuesegarten.Wallet.instance.inflationRatio);
        }
        getIncome() {
            return Math.round(this.income * Gemuesegarten.Wallet.instance.inflationRatio);
        }
        getFertilizePrice() {
            return Math.round(this.fertilizePrice * Gemuesegarten.Wallet.instance.inflationRatio);
        }
        getHealPrice() {
            return Math.round(this.healPrice * Gemuesegarten.Wallet.instance.inflationRatio);
        }
        plantSeedlings() {
            Gemuesegarten.Wallet.instance.handleSeedlingsMoney(this);
        }
        // https://stackoverflow.com/questions/44642223/need-help-finding-the-time-left-on-a-settimeout-function-being-used-to-continuou    
        handleGrowth() {
            setTimeout(this.growNow, this.growthTime, this);
        }
        handleWater() {
            this.water++;
        }
        handleFertilize() {
            this.fertilize++;
            Gemuesegarten.Wallet.instance.handleFertilizeMoney(this);
        }
        growNow(self) {
            // wenn genug Wasser und genug Fertilizer, dann ist die Pflanze gesund gewachsen
            if (self.water == self.neededWater && self.fertilize == self.neededFertilize) {
                self.status = Status.Plant;
            }
            // wenn die Bedinungen nicht erfüllt sind, dann stirbt sie
            else {
                self.status = Status.Dying;
                // wenn wir bug nicht auf false setzen wird Bug Icon sonst immer angezeigt
                self.hasBug = false;
                // nach 2 Sekunden wird removeVegetable aufgerufen, sonst würde man nie das sterben icon sehen
                setTimeout(self.removeVegetable, 2000, self);
            }
            self.uiField.refreshUI();
        }
        handleHarvest() {
            this.removeVegetable(this);
            Gemuesegarten.Wallet.instance.handleHarvestMoney(this);
        }
        removeVegetable(self) {
            self.uiField.recentVegetable = null;
            self.uiField.refreshUI();
        }
        handleBug(self) {
            let minProbability = 1;
            let maxProbability = 100;
            // zufallszahl ob der Bug auftritt
            let randomNumber = self.randomIntFromInterval(minProbability, maxProbability);
            // wahrscheinlichkeit von 40% das der Bug auftritt
            if (randomNumber >= 60) {
                self.hasBug = true;
                self.uiField.refreshUI();
            }
        }
        handleHeal() {
            this.hasBug = false;
            Gemuesegarten.Wallet.instance.handleHealMoney(this);
            this.uiField.refreshUI();
        }
    }
    Gemuesegarten.Vegetable = Vegetable;
})(Gemuesegarten || (Gemuesegarten = {}));
//# sourceMappingURL=Vegetable.js.map