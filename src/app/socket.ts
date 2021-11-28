import { once } from 'events'
import { Server } from 'ws'

export async function initServer(port = 25252) {
  const wss = new Server({ port })

  wss.on('connection', (ws, req) => {
    if (String(req.headers.origin).startsWith('file:')) {
      ws.on('n:comment', comment => {
        console.log('[%s] comment: %s', new Date().toISOString(), comment)
        ws.send(comment)
      })
    } else {
      ws.on('message', data => {
        wss.clients.forEach(ws => ws.emit('n:comment', data.toString()))
      })
    }
  })

  await once(wss, 'listening')

  return wss
}
