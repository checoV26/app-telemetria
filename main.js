const {
  app,
  BrowserWindow,
  screen,
  ipcMain,
  globalShortcut,
} = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");

let mainWindow;

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

  globalShortcut.register("CommandOrControl+Shift+I", () => {});
  globalShortcut.register("F12", () => {});

  mainWindow.on("close", (event) => {
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

  // Iniciar la verificación de actualizaciones al iniciar la app
  autoUpdater.checkForUpdatesAndNotify();
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

// Manejo de eventos de actualización
autoUpdater.on("update-available", () => {
  console.log("Nueva actualización disponible. Descargando...");
});

autoUpdater.on("update-downloaded", () => {
  console.log("Actualización descargada. Instalando...");
  autoUpdater.quitAndInstall();
});
