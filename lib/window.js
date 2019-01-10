const path = require('path');
const electron = require('electron');
const { BrowserWindow } = require('electron');

let win = null;

exports.createWindow = () => {
  const { size } = electron.screen.getPrimaryDisplay();

  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  win.setIgnoreMouseEvents(true);
  win.setVisibleOnAllWorkspaces(true);
  win.loadURL(path.join('file://', __dirname, '../content/index.html'));

  win.on('closed', () => {
    win = null;
  });
};

exports.closeWindow = () => {
  if (win) {
    win.close();
  }
};
