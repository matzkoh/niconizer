main()

function main(): void {
  const container = document.querySelector('.comment-container')

  if (!container) {
    return
  }

  container.addEventListener('transitionend', ({ target }) => {
    if (target instanceof Node) {
      document.adoptNode(target)
    }
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
        const comments = container.querySelectorAll(`[data-layer="${layer}"][data-line="${line}"]`)
        const lastComment = comments[comments.length - 1]

        if (!lastComment) {
          break
        }

        if (checkCollision(lastComment, offsetWidth)) {
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
}

function checkCollision(el: Element, width: number): boolean {
  const r = el.getBoundingClientRect()

  return innerWidth < r.right || innerWidth + r.width < r.right + width
}
