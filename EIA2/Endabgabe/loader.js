var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const options = document.getElementsByName('options');
const inputs = document.getElementById('container');
let currentScript = null;
//Loads script depending on selected radio button
for (const option of options) {
    option.addEventListener('change', (event) => {
        let url;
        const target = event.target;
        if (target.value === 'option1') {
            url = 'trailingFW/particles.js';
        }
        else if (target.value === 'option2') {
            url = 'circleFW/circleFW.js';
        }
        if (currentScript) {
            inputs.removeChild(currentScript);
        }
        fetch(url)
            .then((response) => response.text())
            .then((script) => {
            const element = document.createElement('script');
            element.text = script;
            inputs.appendChild(element);
            currentScript = element;
        })
            .catch((error) => {
            console.error(error);
        });
    });
    function saveValues() {
        return __awaiter(this, void 0, void 0, function* () {
            const colorInput = document.getElementById("colorInput");
            const colorValue = colorInput.value;
            const sizeInput = document.getElementById("sizeInput");
            const sizeValue = sizeInput.value;
            const shapeInput = document.getElementById("shapeInput");
            const shapeValue = shapeInput.value;
            const options = document.querySelector('input[name="options"]:checked');
            const optionValue = options.value;
            const values = { color: colorValue, size: sizeValue, shape: shapeValue, option: optionValue };
            const response = yield fetch("https://webuser.hs-furtwangen.de/~laubsche/Database/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                console.log("Values saved successfully!");
            }
            else {
                console.error("Failed to save values");
            }
        });
    }
    function loadValues() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("https://webuser.hs-furtwangen.de/~laubsche/Database/");
            const values = yield response.json();
            const tableBody = document.getElementById("tableBody");
            const row = document.createElement("tr");
            const colorCell = document.createElement("td");
            colorCell.textContent = values.color;
            const sizeCell = document.createElement("td");
            sizeCell.textContent = values.size;
            const shapeCell = document.createElement("td");
            shapeCell.textContent = values.shape;
            const optionCell = document.createElement("td");
            optionCell.textContent = values.option;
            row.appendChild(colorCell);
            row.appendChild(sizeCell);
            row.appendChild(shapeCell);
            row.appendChild(optionCell);
            tableBody.appendChild(row);
        });
    }
    document.getElementById("saveButton").addEventListener("click", saveValues);
    document.getElementById("loadButton").addEventListener("click", loadValues);
}
//# sourceMappingURL=loader.js.map