const options = document.getElementsByName('options');
const inputs = document.getElementById('container');
let currentScript: HTMLScriptElement | null = null;

//Loads script depending on selected radio button

for (const option of options) {
  option.addEventListener('change', (event) => {
    let url;
    const target = event.target as HTMLInputElement;
    if (target.value === 'option1') {
      url = 'trailingFW/trail.js';
    } else if (target.value === 'option2') {
      url = 'tester2/notrail.js';
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

  async function saveValues() {
    const colorInput = document.getElementById("colorInput") as HTMLInputElement;
    const colorValue = colorInput.value;
  
    const sizeInput = document.getElementById("sizeInput") as HTMLInputElement;
    const sizeValue = sizeInput.value;
  
    const shapeInput = document.getElementById("shapeInput") as HTMLSelectElement;
    const shapeValue = shapeInput.value;
  
    const options = document.querySelector('input[name="options"]:checked') as HTMLInputElement;
    const optionValue = options.value;
    
    const values = { color: colorValue, size: sizeValue, shape: shapeValue, option: optionValue };
    
    const response = await fetch("https://your-server.com/save-values", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });
    
    if (response.ok) {
      console.log("Values saved successfully!");
    } else {
      console.error("Failed to save values");
    }
  }
  
  async function loadValues() {
    const response = await fetch("https://your-server.com/load-values");
    const values = await response.json();
    
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
  }
  
  document.getElementById("saveButton").addEventListener("click", saveValues);
  document.getElementById("loadButton").addEventListener("click", loadValues);
}

