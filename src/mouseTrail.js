import rand from './utils/rand'

const inactive = []
const active = []

const MAX_PARTICLES = 1000
const TERMINAL_VELOCITY = 20
const GRAVITY = 0.3
const FRICTION = 1.5
const LIFE = 30
const ROTATION_FACTOR = 2
const DECAY_FACTOR = 4
const MIN_DISTANCE = 200
const PARTICLE_MULTIPLIER = 10
const VARIATION = 100

window.inactive = inactive
window.active = active

let running = false
const m = {
  pos: {
    x: 0,
    y: 0
  },
  vel: {
    x: 0,
    y: 0
  }
}

let distance = 0
let x = 0
let y = 0

function init () {
  initParticles()
  window.addEventListener('mousemove', event => {
    x = event.clientX
    y = event.clientY
    distance = diff(x, m.pos.x) + diff(y, m.pos.y)
    if (distance > MIN_DISTANCE) {
      for (let i = 1; i <= PARTICLE_MULTIPLIER; i++) {
        m.vel.x = wiggle((x - m.pos.x), VARIATION)
        m.vel.y = wiggle((y - m.pos.y), VARIATION)
        emit()
      }
    }
    m.pos.x = x
    m.pos.y = y
  })
}

function wiggle (value, amount) {
  const low = value - amount
  const high = value + amount
  return rand(low, high)
}

function diff (a, b) {
  return Math.abs(a - b)
}

function initParticles () {
  let cnt = 1
  const container = document.createElement('div')
  container.classList.add('trail')
  document.body.append(container)
  for (let i = 1; i <= MAX_PARTICLES; i++) {
    const el = document.createElement('div')
    el.classList.add('trail-item')
    el.classList.add('trail-item--' + cnt)
    container.append(el)
    inactive.push({
      el,
      life: wiggle(LIFE, 100),
      grav: 0,
      rot: 0,
      pos: {
        x: 0,
        y: 0
      },
      vel: {
        x: 0,
        y: 0
      }
    })
    cnt++
    if (cnt > 5) cnt = 1
  }
}

function resetParticle (particle) {
  particle.life = wiggle(LIFE, 100)
  particle.grav = 0
  particle.rot = 0
  particle.pos.x = m.pos.x
  particle.pos.y = m.pos.y
  particle.vel.x = m.vel.x
  particle.vel.y = m.vel.y
  particle.el.style.opacity = 1
  return particle
}

function emit () {
  const particle = inactive.pop()
  if (particle) {
    active.push(resetParticle(particle))
    if (!running) {
      step()
    }
  }
}

function step () {
  if (active.length) {
    running = true
    active.forEach((particle, index, array) => {
      particle.life--
      if (particle.life < 0) {
        particle.el.style.opacity = 0
        inactive.push(particle)
        array.splice(index, 1)
        if (!array.length) running = false
      } else {
        particle.rot += particle.vel.x * ROTATION_FACTOR
        particle.pos.x += particle.vel.x
        particle.pos.y += particle.vel.y + particle.grav
        particle.vel.x /= FRICTION
        particle.vel.y /= FRICTION
        particle.grav += GRAVITY
        if (particle.grav > TERMINAL_VELOCITY) {
          particle.grav = TERMINAL_VELOCITY
        }
        let decay = particle.life * DECAY_FACTOR / LIFE
        if (decay > 1) decay = 1
        particle.el.style.opacity = decay
        particle.el.style.transform = `
          translate(${particle.pos.x}px, ${particle.pos.y}px)
          rotate(${particle.rot}deg)
        `
      }
    })
    window.requestAnimationFrame(step)
  }
}

export default init
