import rand from './utils/rand'

const activeLogos = []
let timer = null

function initLogoEmitter () {
  const logoContainer = document.querySelector('[data-src="logos"]')
  const logos = logoContainer.children

  const trigger = document.querySelector('[data-action="emit-logos"]')
  trigger.onmouseenter = e => {
    emit(getRandomLogo(logos))
    timer = window.setInterval(() => {
      emit(getRandomLogo(logos))
    }, 500)
  }
  trigger.onmouseleave = e => {
    clearInterval(timer)
  }
}

function getRandomLogo (logos) {
  const randomIndex = rand(0, logos.length - 1)
  const logo = logos[randomIndex]
  return logo
}

const GRAVITY = 0.3

function emit (logo) {
  activeLogos.push({
    el: logo,
    x: 0,
    y: 0,
    rotation: 0,
    life: 0,
    death: rand(60, 70),
    vector: {
      x: rand(-3, 3),
      y: rand(-10, -5),
      rotation: rand(-3, 3)
    }
  })
  step()
}

function step () {
  activeLogos.forEach(function (logo, index, object) {
    logo.life++
    if (logo.life > logo.death) {
      object.splice(index, 1)
      logo.el.style.opacity = 0
    } else {
      logo.vector.y += GRAVITY
      logo.x += logo.vector.x
      logo.y += logo.vector.y
      logo.rotation += logo.vector.rotation

      logo.el.style.opacity = 1 - (logo.life / 8) / logo.death
      logo.el.style.transform = `translate3d(${logo.x}px, ${logo.y}px, 0) scale(${1 - ((logo.life / 4) / logo.death)}) rotate(${logo.rotation}deg)`
    }
  })
  if (activeLogos.length) {
    window.requestAnimationFrame(step)
  }
}

export default initLogoEmitter
