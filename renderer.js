const { ipcRenderer } = require('electron');

const button = document.querySelector('#select');
const div = document.querySelector('#result');

button.addEventListener('click', async () => {
  const option = await ipcRenderer.invoke('option:select');
  div.textContent = `You selected: ${option}`;
});
