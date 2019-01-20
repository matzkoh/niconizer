import path from 'path'
import { spawn, ChildProcess } from 'child_process'
import { readdir } from 'fs'

function spawnPromise(command: string, args?: string[], options?: {}): Promise<ChildProcess> {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, options)
    proc.once('close', () => resolve(proc))
    proc.once('error', reject)
  })
}

const packageDir = 'dist/package'

readdir(packageDir, (_, files) => {
  files
    .map(name => /^[^-]+-(\w+)-.+$/.exec(name))
    .filter(Boolean)
    .forEach(([name, target]: any) => zipDir(name, target))
})

async function zipDir(name: string, target: string) {
  const zipRootDir = path.join(packageDir, name)
  const outputFileName = `${zipRootDir}.zip`

  if (target === 'win32') {
    if (process.env.CIRCLECI) {
      await spawnPromise('convmv', ['-r', '-f', 'utf8', '-t', 'cp932', '--notest', zipRootDir])
      await spawnPromise('zip', ['-rq', outputFileName, zipRootDir])
      await spawnPromise('convmv', ['-r', '-f', 'cp932', '-t', 'utf8', '--notest', zipRootDir])
    } else {
      await spawnPromise('open', ['-W', '-a', 'MacZip4Win', zipRootDir])
    }
  } else {
    await spawnPromise('zip', ['-rq', outputFileName, zipRootDir])
  }
}
