import { spawn } from 'child_process'
import electronPath from 'electron'
import { packageDirectory } from 'pkg-dir'

packageDirectory()
  .then(dir => {
    if (dir) {
      spawn(`${electronPath}`, [dir])
    }
  })
  .catch(console.error)
