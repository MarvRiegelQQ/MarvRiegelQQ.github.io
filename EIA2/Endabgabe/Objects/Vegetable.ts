namespace Gemuesegarten {

    export enum Status {Seedling, Plant, Dying}

    export abstract class Vegetable {
        uiField: Fields;
        growthStatus2: string;
        growthTime: number;
        neededFertilize: number;
        fertilizePrice: number;
        neededWater: number;
        plantPrice: number;
        income: number;
        healPrice: number;
        water: number = 0;
        fertilize: number = 0;
        hasBug: boolean;

        growthStatus1: string;
        damageStatus: string;
        bugStatus: string;

        status: Status;

        constructor(_uiField: Fields | null, _growthStatus2: string, _growthTime: number, _fertilize: number, _fertilizePrice: number, _water: number, _price: number, _income: number, _health: number) {
            
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
                let bugPosibleCount: number = this.randomIntFromInterval(1, 5);
                
                // gehen 5 mal die Shleife durch und lassen uns eine random Zahl innerhalb der growth time ausgeben
                for (let i: number = 0; i < bugPosibleCount; i++) {
                    let getRandomNumber: number = this.randomIntFromInterval(1, this.growthTime);
                    // setzen die random zahl der growth time, damit der bug random in der Growth time kommt
                    setTimeout(this.handleBug,      getRandomNumber, this);  
                }
            }
        }

        // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript/7228322#7228322
        randomIntFromInterval(min: number, max: number): number { // min and max included 
            // wir bekommen eine random Zahl zwischen der maximalen und minimalen Zahl
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        getPlantPrice(): number {
            // gibt den Wert zurück auf den die Inflatio gerechnet wurde 
            return Math.round(this.plantPrice * Wallet.instance.inflationRatio);
        }

        getIncome(): number {
            return Math.round(this.income * Wallet.instance.inflationRatio);
        }

        getFertilizePrice(): number {
            return Math.round(this.fertilizePrice * Wallet.instance.inflationRatio);
        }

        getHealPrice(): number {
            return Math.round(this.healPrice * Wallet.instance.inflationRatio);
        }

        plantSeedlings(): void {
            Wallet.instance.handleSeedlingsMoney(this);
        }
        
        // https://stackoverflow.com/questions/44642223/need-help-finding-the-time-left-on-a-settimeout-function-being-used-to-continuou    
        handleGrowth(): void {
            setTimeout(this.growNow,     this.growthTime, this);
        }

        handleWater(): void {
            this.water++;
        }

        handleFertilize(): void {
            this.fertilize++;
            Wallet.instance.handleFertilizeMoney(this);
        }


        growNow(self: Vegetable): void {

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

        handleHarvest(): void {
            this.removeVegetable(this);
            Wallet.instance.handleHarvestMoney(this);
        
        }

        removeVegetable(self: Vegetable): void {
            self.uiField.recentVegetable = null;
            self.uiField.refreshUI();
        }


        handleBug(self: Vegetable): void {
            let  minProbability: number = 1;
            let  maxProbability: number = 100;

            // zufallszahl ob der Bug auftritt
            let randomNumber: number = self.randomIntFromInterval(minProbability, maxProbability);
            
            // wahrscheinlichkeit von 40% das der Bug auftritt
            if (randomNumber >= 60) {
                self.hasBug = true;
                self.uiField.refreshUI();
            }    
        }

        handleHeal(): void {
            this.hasBug = false;
            Wallet.instance.handleHealMoney(this);
            this.uiField.refreshUI();
        }
    }
}