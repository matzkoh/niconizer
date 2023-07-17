#!/usr/bin/env node

import { spawn } from 'node:child_process'

import electronPath from 'electron'
import { packageDirectory } from 'pkg-dir'

import { throws } from '../utils/throws'

packageDirectory().then(dir => {
  if (dir) {
    spawn(`${electronPath as unknown as string}`, [dir])
  }
}, throws)
