const { ipcRenderer } = require("electron");

ipcRenderer.on("clear-localstorage", () => {
  localStorage.clear();
});
