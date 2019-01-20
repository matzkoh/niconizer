const container = document.querySelector('.comment-container') as HTMLDivElement

container.addEventListener('transitionend', event => {
  document.adoptNode(event.target as Node)
})

new WebSocket('ws://localhost:25252/').addEventListener('message', event => {
  const el = document.createElement('div')
  el.className = 'comment comment-enter'
  el.innerHTML = event.data
  container.appendChild(el)

  const { offsetWidth, offsetHeight } = el
  let layer = 0
  let line = 0

  while (true) {
    while (true) {
      const commentsOfCurrentLine = container.querySelectorAll(`[data-layer="${layer}"][data-line="${line}"]`)
      const lastComment = commentsOfCurrentLine[commentsOfCurrentLine.length - 1]
      if (!lastComment) {
        break
      }

      const isProtruded = checkCollision(lastComment, offsetWidth)
      if (isProtruded) {
        line++
        continue
      }

      break
    }

    if (!line || offsetHeight * (line + 0.5) <= innerHeight) {
      break
    }

    layer++
    line = 0
  }

  el.setAttribute('data-line', `${line}`)
  el.setAttribute('data-layer', `${layer}`)
  el.style.setProperty('--line', `${line}`)
  el.style.setProperty('--layer', `${layer}`)
  el.classList.remove('comment-enter')
})

function checkCollision(el: Element, width: number) {
  const a = el.getBoundingClientRect()
  return innerWidth < a.right || innerWidth + a.width < a.right + width
}
