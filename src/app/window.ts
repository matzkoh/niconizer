import { BrowserWindow, screen } from 'electron'
import path from 'path'

let win: BrowserWindow | undefined

export function openWindow(): void {
  if (win) {
    return
  }

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
    win = undefined
  })
}

export function closeWindow(): void {
  if (win) {
    win.close()
  }
}
