let canvas, ctx, drawing, x, y, color, marker

const COLORS = ['black', '#0dafb7', '#eabc36', '#e154ed', '#62d628']

function initDrawingCanvas () {
  if (window.innerWidth > 960) {
    canvas = document.querySelector('.card-drawing')
    marker = document.querySelector('.card-drawingMarker')
    ctx = canvas.getContext('2d')
    canvas.addEventListener('mousedown', startDrawing)
    canvas.addEventListener('mouseup', stopDrawing)
    canvas.addEventListener('mousemove', draw)
    canvas.addEventListener('mouseenter', showMarker)
    canvas.addEventListener('mouseleave', hideMarker)
    window.addEventListener('mousemove', moveMarker)
    window.addEventListener('resize', resize)
    color = COLORS[0]
    resize()
  }
}

function showMarker () {
  marker.classList.add('card-drawingMarker--show')
}

function hideMarker () {
  marker.classList.remove('card-drawingMarker--show')
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

function moveMarker (event) {
  marker.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
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
