main()

function main(): void {
  const container = document.querySelector('.comment-container')

  if (!container) {
    return
  }

  container.addEventListener('transitionend', ({ target }) => {
    if (target instanceof Element) {
      target.remove()
    }
  })

  const lineHeight = (() => {
    const el = document.createElement('div')
    el.className = 'comment'
    el.style.visibility = 'hidden'
    el.textContent = 'M'
    container.appendChild(el)

    const { offsetHeight } = el
    el.remove()

    return offsetHeight
  })()

  new WebSocket('ws://localhost:25252/').addEventListener('message', event => {
    const el = document.createElement('div')
    el.className = 'comment flip-enter-to'
    el.innerHTML = event.data
    container.appendChild(el)

    const { offsetWidth, offsetHeight, offsetLeft: to } = el

    el.classList.remove('flip-enter-to')

    const from = el.offsetLeft

    el.classList.add('flip-enter-active')
    el.style.transform = `translateX(${to - from}px)`

    let layer = 0
    let line = 0

    while (true) {
      while (true) {
        const comments = container.querySelectorAll(`[data-layer="${layer}"][data-line="${line}"]`)
        const lastCommentOfLine = comments[comments.length - 1]

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

    el.setAttribute('data-line', `${line}`)
    el.setAttribute('data-layer', `${layer}`)
    el.style.setProperty('--line', `${line}`)
    el.style.setProperty('--layer', `${layer}`)
  })
}

function checkCollision(el: Element, width: number): boolean {
  const r = el.getBoundingClientRect()

  return innerWidth < r.right || innerWidth - r.left < width
}
