let canvas, ctx, drawing, x, y, color

const COLORS = ['#0dafb7', '#eabc36', '#e154ed', '#62d628', '#000000']

function initDrawingCanvas () {
  if (window.innerWidth > 960) {
    canvas = document.querySelector('.card-drawing')
    ctx = canvas.getContext('2d')
    canvas.addEventListener('mousedown', startDrawing)
    canvas.addEventListener('mouseup', stopDrawing)
    canvas.addEventListener('mousemove', draw)
    window.addEventListener('resize', resize)
    color = COLORS[0]
    resize()
  }
}

function resize () {
  const parent = canvas.parentNode
  canvas.width = parent.offsetWidth
  canvas.height = parent.offsetHeight
}

function getPosition (event) {
  x = event.layerX
  y = event.layerY
}

function startDrawing (event) {
  drawing = true
  getPosition(event)
}

function stopDrawing () {
  drawing = false
  nextColor()
}

function nextColor () {
  const index = COLORS.indexOf(color)
  if (index === COLORS.length - 1) {
    color = COLORS[0]
  } else {
    color = COLORS[index + 1]
  }
}

function draw (event) {
  if (!drawing) return
  ctx.beginPath()
  ctx.lineWidth = 8
  ctx.lineCap = 'round'
  ctx.strokeStyle = color
  ctx.moveTo(x, y)
  getPosition(event)
  ctx.lineTo(x, y)
  ctx.stroke()
}

export default initDrawingCanvas
