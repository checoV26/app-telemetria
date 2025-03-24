const {
  app,
  BrowserWindow,
  screen,
  ipcMain,
  globalShortcut,
} = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");

let mainWindow; // Definir la variable correctamente

// Configuración de autoUpdater
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

app.whenReady().then(() => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  mainWindow = new BrowserWindow({
    width,
    height,
    icon: path.join(__dirname, "assets", "logo.ico"),
    fullscreenable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.setBounds({ x: 0, y: 0, width, height });
  mainWindow.loadFile(path.join(__dirname, "pages", "sign-in.html"));

  // Bloquear atajos de teclado
  globalShortcut.register("CommandOrControl+Shift+I", () => {});
  globalShortcut.register("F12", () => {});

  // Evento antes de cerrar la ventana
  mainWindow.on("close", () => {
    mainWindow.webContents.send("clear-localstorage");
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // ✅ Se usa `mainWindow` en lugar de `curWindow`
  autoUpdater.checkForUpdates();
  mainWindow.webContents.send("message", `Checking for updates. Current version ${app.getVersion()}`);

  // Manejo de eventos de actualización
  autoUpdater.on("update-available", () => {
    mainWindow.webContents.send("message", `Update available. Current version ${app.getVersion()}`);
    autoUpdater.downloadUpdate();
  });

  autoUpdater.on("update-not-available", () => {
    mainWindow.webContents.send("message", `No update available. Current version ${app.getVersion()}`);
  });

  autoUpdater.on("update-downloaded", () => {
    mainWindow.webContents.send("message", `Update downloaded. Current version ${app.getVersion()}`);
  });

  autoUpdater.on("error", (err) => {
    mainWindow.webContents.send("message", `Error: ${err}`);
  });
});

// Evitar el menú de clic derecho
app.on("browser-window-created", (_, window) => {
  window.webContents.on("context-menu", (event) => {
    event.preventDefault();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
