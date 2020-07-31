import { once } from 'events'
import { Server } from 'ws'

export async function initServer(port = 25252): Promise<void> {
  const wss = new Server({ port })

  wss.on('connection', (ws, req) => {
    if (String(req.headers.origin).startsWith('file:')) {
      ws.on('n:comment', comment => {
        console.log('[%s] comment: %s', new Date().toISOString(), comment)
        ws.send(comment)
      })
    } else {
      ws.on('message', message => {
        wss.clients.forEach(ws => ws.emit('n:comment', message))
      })
    }
  })

  await once(wss, 'listening')
}
