const { app } = require('electron');
const { initTray } = require('./tray');
const { initServer } = require('./socket');

app.dock.hide();

app.on('ready', initTray);

app.on('window-all-closed', () => {});

initServer();
