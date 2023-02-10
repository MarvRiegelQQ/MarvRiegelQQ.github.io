const options = document.getElementsByName('options');
const container = document.getElementById('container');
let currentScript: HTMLScriptElement | null = null;

for (const option of options) {
  option.addEventListener('change', (event) => {
    let url;
    const target = event.target as HTMLInputElement;
    if (target.value === 'option1') {
      url = 'tester/trail.js';
    } else if (target.value === 'option2') {
      url = 'tester2/notrail.js';
    }

    if (currentScript) {
      container.removeChild(currentScript);
    }

    fetch(url)
      .then((response) => response.text())
      .then((script) => {
        const element = document.createElement('script');
        element.text = script;
        container.appendChild(element);
        currentScript = element;
      })
      .catch((error) => {
        console.error(error);
      });
  });
}