const options = document.getElementsByName('options');
const inputs = document.getElementById('container');
let currentScript = null;
//Loads script depending on selected radio button
for (const option of options) {
    option.addEventListener('change', (event) => {
        let url;
        const target = event.target;
        if (target.value === 'option1') {
            url = 'trailingFW/trail.js';
        }
        else if (target.value === 'option2') {
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
}
//# sourceMappingURL=loader.js.map