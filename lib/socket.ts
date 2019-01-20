const { Server } = require('ws');

exports.initServer = async () => {
  const wss = new Server({ port: 25252 });

  wss.on('connection', (ws, req) => {
    if (/^file:/.test(req.headers.origin)) {
      onConnectRenderer(ws);
    } else {
      onConnectSender(ws);
    }
  });

  function onConnectSender(ws) {
    ws.on('message', message => {
      wss.clients.forEach(ws => ws.emit('n:comment', message));
    });
  }

  function onConnectRenderer(ws) {
    ws.on('n:comment', comment => {
      console.log('[comment]: %s', comment);
      ws.send(comment);
    });
  }

  return new Promise(resolve => {
    wss.on('listening', resolve);
  });
};
