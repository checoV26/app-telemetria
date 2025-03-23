const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  clearLocalStorage: () =>
    ipcRenderer.on("clear-localstorage", () => {
      localStorage.clear();
    }),
});
