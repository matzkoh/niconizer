import { Server } from 'ws'

export async function initServer() {
  const wss = new Server({ port: 25252 })

  wss.on('connection', (ws, req) => {
    if (/^file:/.test(String(req.headers.origin))) {
      ws.on('n:comment', comment => {
        console.log('[comment]: %s', comment)
        ws.send(comment)
      })
    } else {
      ws.on('message', message => {
        wss.clients.forEach(ws => ws.emit('n:comment', message))
      })
    }
  })

  return new Promise(resolve => {
    wss.on('listening', resolve)
  })
}
