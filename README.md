[![CircleCI][circleci-badge]][circleci]
[![Renovate][renovate-badge]][renovate]
[![npm][npm-badge]][npm]

[circleci]: https://circleci.com/gh/matzkoh/niconizer
[circleci-badge]: https://circleci.com/gh/matzkoh/niconizer.svg?style=shield
[renovate]: https://renovatebot.com/
[renovate-badge]: https://img.shields.io/badge/renovate-enabled-brightgreen
[npm]: https://www.npmjs.com/package/niconizer
[npm-badge]: https://img.shields.io/npm/v/niconizer.svg

# niconizer

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
- Twitter
  - [niconizer-tweetdeck](https://github.com/matzkoh/userscripts/tree/master/packages/niconizer-tweetdeck)

## Develop client

**Currently, no authentication is implemented.**

---

### Node.js

```js
// WebSocket implementation for nodejs
const WebSocket = require("ws");

// niconizer server
const ws = new WebSocket("ws://localhost:25252/");

// any html content
ws.send("<b>Hello, world!</b>");
```

### Browser (assumed use from userscript such as Greasemonkey)

```js
const ws = new WebSocket("ws://localhost:25252/");

ws.send("<b>Hello, world!</b>");
```

### Shell Script

```sh
wscat -c ws://localhost:25252 -x "$(jq -r '.name' package.json)"
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
