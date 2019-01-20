import { app, Menu, Tray } from 'electron'
import path from 'path'

import iconPath from '../icon/icon_16x16.png'
import { closeWindow, createWindow } from './window'

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
