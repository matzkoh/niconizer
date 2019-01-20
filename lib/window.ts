import path from 'path'
import { screen } from 'electron'
import { BrowserWindow } from 'electron'

let win: BrowserWindow

export function createWindow() {
  const { size } = screen.getPrimaryDisplay()

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
  })

  win.setIgnoreMouseEvents(true)
  win.setVisibleOnAllWorkspaces(true)
  win.loadURL(path.join('file://', __dirname, 'content/index.html'))

  win.on('closed', () => {
    win = null as any
  })
}

export function closeWindow() {
  if (win) {
    win.close()
  }
}
