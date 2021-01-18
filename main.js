const { app, BrowserWindow, ipcMain, dialog } = require('electron');

const showOptions = async () => {
  const options = ['First', 'Second', 'Third'];
  const option = await dialog.showMessageBox({
    message: 'Select an option',
    buttons: options,
  });
  return options[option.response];
};

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('option:select', async () => {
  return await showOptions();
});
