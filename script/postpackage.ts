import { spawn, SpawnOptions } from 'child_process'
import { once } from 'events'
import { readdir } from 'fs/promises'

async function spawnPromise(command: string, args: string[], options: SpawnOptions) {
  const proc = spawn(command, args, options)

  await Promise.race([once(proc, 'close'), once(proc, 'error').then(Promise.reject)]).finally(() =>
    proc.removeAllListeners(),
  )
}

const packageDir = 'dist/package'

readdir(packageDir).then(files => {
  files
    .map(name => /^[^-]+-(\w+)-.+$/.exec(name))
    .filter((a): a is RegExpExecArray => !!a)
    .map(([name, target]) => zipDir(name, target))
})

async function zipDir(src: string, target: string): Promise<void> {
  const dest = `${src}.zip`
  const options = { cwd: packageDir }

  if (target === 'win32') {
    if (process.env.CIRCLECI) {
      await spawnPromise('convmv', ['-r', '-f', 'utf8', '-t', 'cp932', '--notest', src], options)
      await spawnPromise('zip', ['-rq', dest, src], options)
      await spawnPromise('convmv', ['-r', '-f', 'cp932', '-t', 'utf8', '--notest', src], options)
    } else {
      await spawnPromise('open', ['-W', '-a', 'MacZip4Win', src], options)
    }
  } else {
    await spawnPromise('zip', ['-ryq', dest, src], options)
  }

  console.log(`Wrote zip file to ${dest}`)
}
