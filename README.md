# niconizer

[![Renovate](https://badges.renovateapi.com/github/matzkoh/niconizer)](https://renovatebot.com/)
[![npm](https://img.shields.io/npm/v/niconizer.svg)](https://www.npmjs.com/package/niconizer)

## What is this

_niconizer_ is a simple desktop application that has two functional bellow.

- Overlay short html content on the screen directly.
  - The content flows from right to left on the screen and disappears.
- Local WebSocket server to receive the content.

Can be used in combination with clients that send contents.

## Getting started

### Installation

```bash
$ npm i -g niconizer
$ niconizer
```

Then the WebSocket server starts up on your computer and listen for connections.

In the tray menu, click `Start` command to activate showing content sent from clients.

Available clients are in the [section](#clients) bellow.

## Tray Icon Menu

- `Start`
  - Open transparent window that shows the content.
- `Stop`
  - Close the window and pause displaying the content.
- `Quit`
  - Quit niconizer.

## Clients

- Slack
  - [niconizer-slack](https://github.com/matzkoh/niconizer-slack)

## Develop client

**Currently, no authentication is implemented.**

---

### Node.js

```js
// WebSocket implementation for nodejs
const WebSocket = require('ws')

// niconizer server
const ws = new WebSocket('ws://localhost:25252/')

// any html content
ws.send('<b>Hello, world!</b>')
```

### Browser (assumed use from userscript such as Greasemonkey)

```js
const ws = new WebSocket('ws://localhost:25252/')

ws.send('<b>Hello, world!</b>')
```

## Contributing

Lint, Format, Build

```bash
$ npm run build
```

Build, Run

```bash
$ npm start
```

Package

```bash
$ npm run package
```
