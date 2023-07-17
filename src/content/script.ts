const emit = useContainer()

new WebSocket('ws://localhost:25252/').addEventListener('message', event => {
  emit(event.data as string)
})

function useContainer() {
  const container =
    document.querySelector('.comment-container') ?? throws(new Error('Comment container not found'))

  container.addEventListener('transitionend', ({ target }) => {
    if (target instanceof Element) {
      target.remove()
    }
  })

  return emitContent.bind(undefined, container)
}

function getLineHeight(container: Element) {
  const el = document.createElement('div')
  el.className = 'comment'
  el.style.visibility = 'hidden'
  el.textContent = 'M'
  container.append(el)

  const { offsetHeight } = el
  el.remove()

  return offsetHeight
}

function emitContent(container: Element, content: string): void {
  const lineHeight = getLineHeight(container)

  const el = document.createElement('div')
  el.className = 'comment flip-enter-to'
  el.innerHTML = content
  container.append(el)

  const { classList, style, dataset, offsetWidth, offsetHeight, offsetLeft: to } = el

  classList.remove('flip-enter-to')

  const { offsetLeft: from } = el

  classList.add('flip-enter-active')
  style.transform = `translateX(${to - from}px)`

  let layer = 0
  let line = 0

  while (true) {
    while (true) {
      const comments = [
        ...container.querySelectorAll(`[data-layer="${layer}"][data-line="${line}"]`),
      ]

      const lastCommentOfLine = comments.at(-1)

      if (!lastCommentOfLine) {
        break
      }

      if (checkCollision(lastCommentOfLine, offsetWidth)) {
        line++

        continue
      }

      break
    }

    if (!line || lineHeight * line + offsetHeight <= innerHeight) {
      break
    }

    layer++
    line = 0
  }

  dataset.line = `${line}`
  dataset.layer = `${layer}`
  style.setProperty('--line', `${line}`)
  style.setProperty('--layer', `${layer}`)
}

function checkCollision(el: Element, width: number): boolean {
  const r = el.getBoundingClientRect()

  return innerWidth < r.right || innerWidth - r.left < width
}

function throws(error: Error): never {
  throw error
}
