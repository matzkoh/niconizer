import { once } from 'node:events'

import { Server } from 'ws'

export async function initServer(port = 25_252) {
  const wss = new Server({ host: '127.0.0.1', port })

  wss.on('connection', (ws, req) => {
    if (req.headers.origin?.startsWith('file:')) {
      ws.on('n:comment', (comment: string) => ws.send(comment))
    } else {
      ws.on('message', (data: Buffer) => {
        const comment = data.toString()
        console.log('[%s] comment: %s', new Date().toISOString(), comment)

        for (const ws of wss.clients) {
          ws.emit('n:comment', comment)
        }
      })
    }
  })

  await once(wss, 'listening')

  return wss
}
