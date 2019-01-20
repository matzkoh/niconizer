import path from 'path'
import { app, Tray, Menu } from 'electron'
import { createWindow, closeWindow } from './window'
import iconPath from '../icon/icon_16x16.png'

const template = [
  {
    label: 'Start',
    click: () => {
      createWindow()
    },
  },
  {
    label: 'Stop',
    click: () => {
      closeWindow()
    },
  },
  {
    label: 'Quit',
    click: () => {
      app.quit()
    },
  },
]

let tray: Tray

export function initTray() {
  const contextMenu = Menu.buildFromTemplate(template)
  tray = new Tray(path.join(__dirname, iconPath))
  tray.setContextMenu(contextMenu)
}
