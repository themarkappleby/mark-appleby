function cursor () {
  const TRAIL_SPEED = 7 // Higher number = slower follow speed (default: 6)
  const SCALE_FACTOR = 400 // Higher number = smaller scale variation when moving (default: 500)
  const SCALE_ON_CLICK = 0.5 // Higher number = larger size when click (default: 0.4)
  let cursorInit = false

  const cursor = {
    el: document.createElement('span'),
    pos: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    scale: 1,
    scaleMultiply: 0
  }
  cursor.el.className = 'cursor'
  document.body.appendChild(cursor.el)

  const cursorTrail = {
    el: document.createElement('span'),
    pos: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    scale: 1,
    scaleMultiply: 0
  }
  cursorTrail.el.className = 'cursor-trail'
  document.body.appendChild(cursorTrail.el)

  document.addEventListener('mousemove', function (e) {
    cursorTrail.target.x = e.clientX
    cursorTrail.target.y = e.clientY
    if (!cursorInit) {
      cursorTrail.pos.x = cursorTrail.target.x
      cursorTrail.pos.y = cursorTrail.target.y
      cursorInit = true
      window.requestAnimationFrame(draw)
    }
  })

  document.addEventListener('mousedown', function (e) {
    cursor.scaleMultiply = SCALE_ON_CLICK
  })

  function draw () {
    let diffX = cursorTrail.target.x - cursorTrail.pos.x
    cursorTrail.pos.x += diffX / TRAIL_SPEED

    let diffY = cursorTrail.target.y - cursorTrail.pos.y
    cursorTrail.pos.y += diffY / TRAIL_SPEED

    if (diffX < 0) diffX *= -1
    if (diffY < 0) diffY *= -1
    const diffTotal = diffX + diffY
    cursorTrail.scale = (diffTotal / SCALE_FACTOR) + 1 + cursorTrail.scaleMultiply

    if (cursorTrail.scaleMultiply > 0) cursorTrail.scaleMultiply -= 0.1

    cursorTrail.el.style.transform = `translate3d(${cursorTrail.pos.x}px, ${cursorTrail.pos.y}px, 0) scale(${cursorTrail.scale})`
    cursor.el.style.transform = `translate3d(${cursorTrail.target.x}px, ${cursorTrail.target.y}px, 0)`
    window.requestAnimationFrame(draw)
  }
}

cursor()
