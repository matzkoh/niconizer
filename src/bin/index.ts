import { spawn } from 'child_process'
import electronPath from 'electron'
import pkgDir from 'pkg-dir'

pkgDir(__dirname)
  .then(dir => {
    if (dir) {
      spawn(electronPath as unknown as string, [dir])
    }
  })
  .catch(console.error)
