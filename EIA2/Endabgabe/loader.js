const options = document.getElementsByName('options');
const container = document.getElementById('container');
for (const option of options) {
    option.addEventListener('change', (event) => {
        let url;
        const target = event.target;
        if (target.value === 'option1') {
            url = 'circleFW/circleFW.js';
        }
        else if (target.value === 'option2') {
            url = 'trailingFW/particles.js';
        }
        fetch(url)
            .then((response) => response.text())
            .then((script) => {
            const element = document.createElement('script');
            element.text = script;
            container.appendChild(element);
        })
            .catch((error) => {
            console.error(error);
        });
    });
}
//# sourceMappingURL=loader.js.map