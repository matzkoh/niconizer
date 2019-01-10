# niconizer

## How to use

Run app and execute `Start` command in the tray menu.

The WebSocket server starts up on your computer and listens for connections.

## Comment sources

- Slack
  - [niconizer-slack](https://github.com/matzkoh/niconizer-slack)

## Server interface

**Currently, no authentication is implemented.**

---

nodejs

```js
// WebSocket implementation for nodejs
const WebSocket = require('ws');

// niconizer server
const ws = new WebSocket('ws://localhost:25252/');

// any html content
ws.send('<b>Hello, world!</b>');
```

browser (assumed use from userscript such as Greasemonkey)

```js
const ws = new WebSocket('ws://localhost:25252/');
ws.send('<b>Hello, world!</b>');
```
