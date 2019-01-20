import { app } from 'electron'
import { initTray } from './tray'
import { initServer } from './socket'

app.dock.hide()

app.on('ready', initTray)

app.on('window-all-closed', () => {})

initServer()
