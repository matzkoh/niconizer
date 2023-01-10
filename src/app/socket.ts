import { once } from 'events'
import { Server } from 'ws'

export async function initServer(port = 25252) {
  const wss = new Server({ host: '127.0.0.1', port })

  wss.on('connection', (ws, req) => {
    if (String(req.headers.origin).startsWith('file:')) {
      ws.on('n:comment', comment => ws.send(comment))
    } else {
      ws.on('message', data => {
        const comment = data.toString()
        console.log('[%s] comment: %s', new Date().toISOString(), comment)
        wss.clients.forEach(ws => ws.emit('n:comment', comment))
      })
    }
  })

  await once(wss, 'listening')

  return wss
}
