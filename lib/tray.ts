const path = require('path');
const { app, Tray, Menu } = require('electron');
const { createWindow, closeWindow } = require('./window');

const template = [
  {
    label: 'Start',
    click: () => {
      createWindow();
    },
  },
  {
    label: 'Stop',
    click: () => {
      closeWindow();
    },
  },
  {
    label: 'Quit',
    click: () => {
      app.quit();
    },
  },
];

let tray;

exports.initTray = () => {
  const contextMenu = Menu.buildFromTemplate(template);
  tray = new Tray(path.join(__dirname, '../icon/icon_16x16.png'));
  tray.setContextMenu(contextMenu);
};
