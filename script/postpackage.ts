import { ChildProcess, SpawnOptions, spawn } from 'child_process'
import { readdir } from 'fs'

function spawnPromise(command: string, args?: string[], options?: SpawnOptions): Promise<ChildProcess> {
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
    .map(([name, target]: any) => zipDir(name, target))
})

async function zipDir(src: string, target: string): Promise<void> {
  const dest = `${src}.zip`

  if (target === 'win32') {
    if (process.env.CIRCLECI) {
      await spawnPromise('convmv', ['-r', '-f', 'utf8', '-t', 'cp932', '--notest', src], { cwd: packageDir })
      await spawnPromise('zip', ['-rq', dest, src], { cwd: packageDir })
      await spawnPromise('convmv', ['-r', '-f', 'cp932', '-t', 'utf8', '--notest', src], { cwd: packageDir })
    } else {
      await spawnPromise('open', ['-W', '-a', 'MacZip4Win', src], {
        cwd: packageDir,
      })
    }
  } else {
    await spawnPromise('zip', ['-ryq', dest, src], { cwd: packageDir })
  }

  console.log(`Wrote zip file to ${dest}`)
}
