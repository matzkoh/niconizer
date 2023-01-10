import { BrowserWindow, screen } from 'electron'

import contentUri from '../content/index.html'

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
  })

  win.setIgnoreMouseEvents(true)
  win.setVisibleOnAllWorkspaces(true)
  win.loadURL(contentUri)

  win.on('closed', () => {
    win = undefined
  })
}

export function closeWindow(): void {
  win?.close()
}
