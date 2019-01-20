import { spawn } from 'child_process'
import electronPath from 'electron'

spawn(electronPath as any, ['.'])
