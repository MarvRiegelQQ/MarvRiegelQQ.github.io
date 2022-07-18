"use strict";
var Gemuesegarten;
(function (Gemuesegarten) {
    class Fields {
        constructor(_gameDiv) {
            this.gameDiv = _gameDiv;
        }
        onClick() {
            // wird durch timeOut function aufgerufen (DOM), somit ist "this" nicht mehr das gleiche "this"
            //definieren hier schon weil wir von hier timeout aufrufen und der braucht "self" statt "this"
            let self = this;
            let plantActionButtons = document.querySelector(".plantActionButtons");
            let vegetableButtons = document.querySelector(".vegetableButtons");
            plantActionButtons.innerHTML = "";
            vegetableButtons.innerHTML = "";
            // wenn bis jetzt noch kein Vegteable im Feld gepflanzt ist
            if (this.recentVegetable == null) {
                let tomatoButton;
                let potatoButton;
                let lettuceButton;
                let carrotsButton;
                let cucumberButton;
                let tomatoDiv;
                let potatoDiv;
                let lettuceDiv;
                let carrotsDiv;
                let cucumberDiv;
                tomatoButton = document.createElement("button");
                tomatoButton.classList.add("tomatoBtn");
                tomatoDiv = document.createElement("div");
                // von Tomate.InformationInstance, welche wiederum auf die Class Vegetable zugreifen kann und dardurch die Funktion in Vegetable aufrufen kann
                tomatoDiv.innerHTML = "-" + Gemuesegarten.Tomato.informationInstance.getPlantPrice() + " €";
                potatoButton = document.createElement("button");
                potatoButton.classList.add("potatoBtn");
                potatoDiv = document.createElement("div");
                potatoDiv.innerHTML = "-" + Gemuesegarten.Potato.informationInstance.getPlantPrice() + " €";
                lettuceButton = document.createElement("button");
                lettuceButton.classList.add("lettuceBtn");
                lettuceDiv = document.createElement("div");
                lettuceDiv.innerHTML = "-" + Gemuesegarten.Lettuce.informationInstance.getPlantPrice() + " €";
                carrotsButton = document.createElement("button");
                carrotsButton.classList.add("carrotsBtn");
                carrotsDiv = document.createElement("div");
                carrotsDiv.innerHTML = "-" + Gemuesegarten.Carrots.informationInstance.getPlantPrice() + " €";
                cucumberButton = document.createElement("button");
                cucumberButton.classList.add("cucumberBtn");
                cucumberDiv = document.createElement("div");
                cucumberDiv.innerHTML = "-" + Gemuesegarten.Cucumber.informationInstance.getPlantPrice() + " €";
                vegetableButtons.appendChild(tomatoButton);
                vegetableButtons.appendChild(potatoButton);
                vegetableButtons.appendChild(lettuceButton);
                vegetableButtons.appendChild(carrotsButton);
                vegetableButtons.appendChild(cucumberButton);
                tomatoButton.appendChild(tomatoDiv);
                potatoButton.appendChild(potatoDiv);
                lettuceButton.appendChild(lettuceDiv);
                carrotsButton.appendChild(carrotsDiv);
                cucumberButton.appendChild(cucumberDiv);
                // anonyme Funktion, hat kein eigenenes "this" und erbt somit eigentlich das "this" vom DOM, was wir hier aber nicht wollen
                tomatoButton.addEventListener("click", function () {
                    self.recentVegetable = new Gemuesegarten.Tomato(self);
                    self.recentVegetable.plantSeedlings();
                    self.buttonRefreshUI();
                });
                potatoButton.addEventListener("click", function () {
                    self.recentVegetable = new Gemuesegarten.Potato(self);
                    self.recentVegetable.plantSeedlings();
                    self.buttonRefreshUI();
                });
                lettuceButton.addEventListener("click", function () {
                    self.recentVegetable = new Gemuesegarten.Lettuce(self);
                    self.recentVegetable.plantSeedlings();
                    self.buttonRefreshUI();
                });
                carrotsButton.addEventListener("click", function () {
                    self.recentVegetable = new Gemuesegarten.Carrots(self);
                    self.recentVegetable.plantSeedlings();
                    self.buttonRefreshUI();
                });
                cucumberButton.addEventListener("click", function () {
                    self.recentVegetable = new Gemuesegarten.Cucumber(self);
                    self.recentVegetable.plantSeedlings();
                    self.buttonRefreshUI();
                });
            }
            // wenn schon ein Vegetable im Feld ist
            // wissen das Vegetable hier nie null sein kann, weil oben in if schon geprüft
            else {
                let waterPlantButton;
                let fertilizePlantButton;
                let harvestPlantButton;
                let healPlantButton;
                waterPlantButton = document.createElement("button");
                waterPlantButton.classList.add("waterPlantBtn");
                waterPlantButton.innerHTML = "water: 0 €";
                fertilizePlantButton = document.createElement("button");
                fertilizePlantButton.classList.add("fertilizePlantBtn");
                fertilizePlantButton.innerHTML = "fertilize: -" + this.recentVegetable.getFertilizePrice() + " €";
                plantActionButtons.appendChild(waterPlantButton);
                plantActionButtons.appendChild(fertilizePlantButton);
                if (this.recentVegetable.status == Gemuesegarten.Status.Plant) {
                    harvestPlantButton = document.createElement("button");
                    harvestPlantButton.classList.add("harvestPlantBtn");
                    harvestPlantButton.innerHTML = "harvest: +" + this.recentVegetable.getIncome() + " €";
                    plantActionButtons.appendChild(harvestPlantButton);
                    plantActionButtons.removeChild(waterPlantButton);
                    plantActionButtons.removeChild(fertilizePlantButton);
                    harvestPlantButton.addEventListener("click", function () {
                        self.recentVegetable.handleHarvest();
                        self.buttonRefreshUI();
                    });
                }
                else if (this.recentVegetable.hasBug) {
                    healPlantButton = document.createElement("button");
                    healPlantButton.classList.add("healPlantBtn");
                    healPlantButton.innerHTML = "heal:<br /> -" + this.recentVegetable.getHealPrice() + " €";
                    plantActionButtons.appendChild(healPlantButton);
                    healPlantButton.addEventListener("click", function () {
                        self.recentVegetable.handleHeal();
                        self.buttonRefreshUI();
                    });
                }
                waterPlantButton.addEventListener("click", function () {
                    self.recentVegetable.handleWater();
                    self.buttonRefreshUI();
                });
                fertilizePlantButton.addEventListener("click", function () {
                    self.recentVegetable.handleFertilize();
                    self.buttonRefreshUI();
                });
            }
        }
        buttonRefreshUI() {
            let vegetableButtons;
            let plantActionButtons;
            let self = this;
            vegetableButtons = document.querySelector(".vegetableButtons");
            vegetableButtons.innerHTML = "";
            plantActionButtons = document.querySelector(".plantActionButtons");
            plantActionButtons.innerHTML = "";
            self.refreshUI();
        }
        refreshUI() {
            this.gameDiv.innerHTML = "";
            this.gameDiv.style.backgroundImage = "";
            this.gameDiv.style.backgroundSize = "";
            // https://stackoverflow.com/questions/18665702/javascript-setting-background-image-of-a-div-via-a-function-and-function-paramet
            if (this.recentVegetable != null) {
                if (this.recentVegetable.hasBug) {
                    this.gameDiv.style.backgroundImage = "url(icons/" + this.recentVegetable.bugStatus + ".png)";
                    this.gameDiv.style.backgroundSize = "cover";
                }
                else if (this.recentVegetable.status == Gemuesegarten.Status.Plant) {
                    this.gameDiv.style.backgroundImage = "url(icons/" + this.recentVegetable.growthStatus2 + ".png)";
                    this.gameDiv.style.backgroundSize = "cover";
                }
                else if (this.recentVegetable.status == Gemuesegarten.Status.Seedling) {
                    this.gameDiv.style.backgroundImage = "url(icons/" + this.recentVegetable.growthStatus1 + ".png)";
                    this.gameDiv.style.backgroundSize = "cover";
                }
                else {
                    this.gameDiv.style.backgroundImage = "url(icons/" + this.recentVegetable.damageStatus + ".png)";
                    this.gameDiv.style.backgroundSize = "cover";
                }
                // https://stackoverflow.com/questions/54487585/display-text-on-hover-item-with-javascript/54487692#54487692
                this.gameDiv.title = this.recentVegetable.growthStatus2 + ": " + "needed water: " + this.recentVegetable.water + " / " + this.recentVegetable.neededWater + "  & " + " needed fertilize: " + this.recentVegetable.fertilize + " / " + this.recentVegetable.neededFertilize;
            }
            else {
                this.gameDiv.title = "";
            }
        }
    }
    Gemuesegarten.Fields = Fields;
})(Gemuesegarten || (Gemuesegarten = {}));
//# sourceMappingURL=Fields.js.map