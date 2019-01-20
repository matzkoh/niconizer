import { spawn } from 'child_process'
import electronPath from 'electron'
import { dirname } from 'path'
import pkgUp from 'pkg-up'

pkgUp(__dirname)
  .then(dirname)
  .then(root => spawn(electronPath as any, [root]))
