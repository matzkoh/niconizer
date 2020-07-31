import { app } from 'electron'

import { initServer } from './socket'
import { initTray, start } from './tray'

app.dock.hide()

app.on('ready', () => {
  initTray()
  setImmediate(start)
})

/** to keep process */
app.on('window-all-closed', () => {})

const port = typeof process.env.PORT === 'string' ? parseInt(process.env.PORT, 10) : undefined

initServer(port).then(() => console.log(`listening on port ${port}`), console.error)
