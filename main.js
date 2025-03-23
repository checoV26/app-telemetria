const {
  app,
  BrowserWindow,
  screen,
  ipcMain,
  globalShortcut,
} = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize; // Tamaño sin barra de tareas

  mainWindow = new BrowserWindow({
    width,
    height,
    icon: path.join(__dirname, "assets", "logo.ico"), // Agregar el icono
    fullscreenable: true,
    webPreferences: {
      nodeIntegration: false, // Se desactiva por seguridad
      contextIsolation: true, // Aísla el contexto de ejecución
      preload: path.join(__dirname, "preload.js"), // Usa un script seguro
    },
  });

  // Ajustar el tamaño de la ventana al área de trabajo sin afectar la barra de tareas
  mainWindow.setBounds({ x: 0, y: 0, width, height });

  mainWindow.loadFile(path.join(__dirname, "pages", "sign-in.html"));

  // 🛑 Bloquear atajos de teclado para abrir la consola
  globalShortcut.register("CommandOrControl+Shift+I", () => {});
  globalShortcut.register("F12", () => {});

  // 🛑 Evento antes de cerrar la ventana
  mainWindow.on("close", (event) => {
    mainWindow.webContents.send("clear-localstorage"); // Envía mensaje al Renderer
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 🛑 Evitar el menú de clic derecho
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
