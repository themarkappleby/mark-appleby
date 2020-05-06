import rand from './utils/rand'

let logoPool = []
const activeLogos = []
let running = false
const mouse = {}

function initLogoEmitter () {
  document.onmousemove = e => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }

  const logoContainer = document.querySelector('[data-src="logos"]')
  logoPool = Array.from(logoContainer.children)

  const trigger = document.querySelector('[data-action="emit-logos"]')
  trigger.onclick = e => {
    e.target.classList.add('pulse')
    window.setTimeout(() => {
      e.target.classList.remove('pulse')
    }, 200)
    e.preventDefault()
    if (!running) {
      running = true
      window.requestAnimationFrame(step)
    }
    const logo = randomLogo()
    if (logo) { emit(logo) }
  }
}

function randomLogo () {
  const randomIndex = rand(0, logoPool.length - 1)
  const logo = logoPool[randomIndex]
  return logo
}

const GRAVITY = 0.3

function emit (logo) {
  const index = logoPool.indexOf(logo)
  if (index > -1) {
    logoPool.splice(index, 1)
  }
  logo.style.opacity = 1
  activeLogos.push({
    name: logo.alt,
    el: logo,
    x: mouse.x,
    y: mouse.y,
    rotation: 0,
    life: 0,
    death: 100,
    vector: {
      x: rand(-2, 2),
      y: rand(-8, -12),
      rotation: 1
    }
  })
}

function step () {
  activeLogos.forEach(function (logo, index, object) {
    logo.life++
    if (logo.life > logo.death) {
      logo.el.style.opacity = 0
      logoPool.push(logo.el)
      object.splice(index, 1)
    } else {
      logo.vector.y += GRAVITY
      logo.x += logo.vector.x
      logo.y += logo.vector.y
      logo.rotation += logo.vector.rotation

      const scale = 1 - ((logo.life / 4) / logo.death)

      logo.el.style.transform = `translate3d(${logo.x}px, ${logo.y}px, 0) scale3d(${scale}, ${scale}, ${scale}) rotate3d(0, 0, 1, ${logo.rotation}deg)`
    }
  })
  if (!activeLogos.length) {
    running = false
  }
  if (running) {
    window.requestAnimationFrame(step)
  }
}

export default initLogoEmitter
