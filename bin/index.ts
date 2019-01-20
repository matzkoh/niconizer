import electronPath from 'electron'
import { spawn } from 'child_process'

spawn(electronPath as any, ['.'])
