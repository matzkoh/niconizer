import { spawn } from 'child_process'

import electronPath from 'electron'
import pkgDir from 'pkg-dir'

pkgDir(__dirname).then(dir => dir && spawn(electronPath as any, [dir]))
