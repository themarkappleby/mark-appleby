import 'focus-visible'

const OFFSET = 30
let target = null
let focusRing = null

function init () {
  focusRing = document.querySelector('.focusRing')
  window.addEventListener('focusin', e => {
    if (wasKeyboardFocused(e)) {
      target = e.target
      focusRing.classList.remove('focusRing--instant')
      updateFocusRing()
    }
  })
  window.addEventListener('focusout', e => {
    if (target) {
      focusRing.classList.remove('focusRing--show')
      target = null
    }
  })
  window.addEventListener('scroll', () => {
    if (target) {
      focusRing.classList.add('focusRing--instant')
      updateFocusRing()
    }
  })
}

function updateFocusRing () {
  const rect = target.getBoundingClientRect()
  focusRing.style.transform = `translate3d(${rect.x - OFFSET}px, ${rect.y - OFFSET}px, 0)`
  focusRing.style.width = rect.width + OFFSET * 2 + 'px'
  focusRing.style.height = rect.height + OFFSET * 2 + 'px'
  focusRing.classList.add('focusRing--show')
}

function wasKeyboardFocused (e) {
  const data = Object.keys(e.target.dataset)
  return data.indexOf('focusVisibleAdded') > -1
}

export default init
