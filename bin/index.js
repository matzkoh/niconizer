#!/usr/bin/env node

const electronPath = require('electron');
const proc = require('child_process');

proc.spawn(electronPath, ['.']);
