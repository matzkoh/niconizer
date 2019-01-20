import { app } from 'electron'

import { initServer } from './socket'
import { initTray } from './tray'

app.dock.hide()

app.on('ready', initTray)

app.on('window-all-closed', () => {})

initServer()
