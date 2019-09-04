import path from 'path'

import { Menu, Tray, app } from 'electron'

import iconPath from '../../icon/icon_16x16.png'

import { closeWindow, createWindow } from './window'

const template = [
  {
    label: 'Start',
    click(): void {
      createWindow()
    },
  },
  {
    label: 'Stop',
    click(): void {
      closeWindow()
    },
  },
  {
    label: 'Quit',
    click(): void {
      app.quit()
    },
  },
]

let tray: Tray

export function initTray(): void {
  const contextMenu = Menu.buildFromTemplate(template)
  tray = new Tray(path.join(__dirname, iconPath))
  tray.setContextMenu(contextMenu)
}
