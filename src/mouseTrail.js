import debounce from './utils/debounce'

const stock = []
const GROW_CLASS = 'trail-item--grow'

const mousemove = debounce(event => {
  const x = event.clientX
  const y = event.clientY
  addTrail(x, y)
}, 5, true)

function mouseTrail () {
  initStock()
  window.addEventListener('mousemove', mousemove)
}

function initStock () {
  let cnt = 1
  const trail = document.createElement('div')
  trail.classList.add('trail')
  document.body.append(trail)
  for (let i = 1; i <= 20; i++) {
    const item = document.createElement('div')
    item.classList.add('trail-item')
    item.classList.add('trail-item--' + cnt)
    trail.append(item)
    stock.push(item)
    cnt++
    if (cnt > 5) cnt = 1
  }
}

function addTrail (x, y) {
  const item = stock.pop()
  if (item) {
    item.style.left = x + 'px'
    item.style.top = y + 'px'

    item.classList.add(GROW_CLASS)
    window.setTimeout(() => item.classList.remove(GROW_CLASS), 300)

    window.setTimeout(() => {
      stock.push(item)
    }, 600)
  }
}

export default mouseTrail
