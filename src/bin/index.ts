#!/usr/bin/env node

import { spawn } from 'child_process'
import electronPath from 'electron'

import('pkg-dir'.slice())
  .then((m: typeof import('pkg-dir')) => m.packageDirectory())
  .then(dir => {
    if (dir) {
      spawn(`${electronPath}`, [dir])
    }
  })
  .catch(console.error)

export function throws(error: Error): never {
  throw error
}
