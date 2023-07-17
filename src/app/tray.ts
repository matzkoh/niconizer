import { Menu, Tray, app } from 'electron'
import uriToPath from 'file-uri-to-path'

import iconUri from '../../icon/icon_16x16.png'

import { closeWindow, openWindow } from './window'

/**
 * to avoid GC
 * https://www.electronjs.org/docs/faq#my-apps-tray-disappeared-after-a-few-minutes
 */
let tray: Tray

export function initTray(): void {
  tray = new Tray(uriToPath(iconUri))
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: 'Start', click: start },
      { label: 'Stop', click: stop },
      { label: 'Quit', click: quit },
    ]),
  )
}

export function start() {
  openWindow()
}

export function stop() {
  closeWindow()
}

export function quit() {
  app.quit()
}
