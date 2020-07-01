import rand from './utils/rand'

const canvas = document.querySelector('.particles')
const ctx = canvas.getContext('2d')
ctx.canvas.width = window.innerWidth
ctx.canvas.height = window.innerHeight

const inactive = []
const active = []

const MAX_PARTICLES = 1000
const TERMINAL_VELOCITY = 10
const GRAVITY = 0.05
const DAMPENING = 8
const FRICTION = 1.01
const SIZE = 20
const LIFE = 35
const ROTATION_FACTOR = 3
const DECAY_FACTOR = 2
const MIN_DISTANCE = 20
const PARTICLE_MULTIPLIER = 3
const VARIATION = 2
const COLORS = ['#0dafb7', '#eabc36', '#e154ed', '#62d628', 'black']

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
    if (distance > MIN_DISTANCE && m.pos.x !== 0 && m.pos.y !== 0) {
      for (let i = 1; i <= PARTICLE_MULTIPLIER; i++) {
        m.vel.x = wiggle((x - m.pos.x) / DAMPENING, VARIATION)
        m.vel.y = wiggle((y - m.pos.y) / DAMPENING, VARIATION)
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
  for (let i = 1; i <= MAX_PARTICLES; i++) {
    inactive.push({
      color: rand(COLORS),
      life: wiggle(LIFE, VARIATION),
      size: SIZE,
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
  particle.life = wiggle(LIFE, VARIATION)
  particle.grav = 0
  particle.rot = 0
  particle.size = SIZE
  particle.pos.x = m.pos.x
  particle.pos.y = m.pos.y
  particle.vel.x = m.vel.x
  particle.vel.y = m.vel.y
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
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (active.length) {
    running = true
    active.forEach((particle, index, array) => {
      particle.life--
      if (particle.life < 0) {
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
        particle.size = decay * SIZE

        ctx.save()
        ctx.translate(particle.pos.x + SIZE / 2, particle.pos.y + SIZE / 2)
        ctx.rotate((Math.PI / 180) * particle.rot)
        ctx.translate((particle.pos.x + particle.size / 2) * -1, (particle.pos.y + particle.size / 2) * -1)
        ctx.fillStyle = particle.color
        ctx.fillRect(
          particle.pos.x,
          particle.pos.y,
          particle.size,
          particle.size
        )
        ctx.restore()
      }
    })
    window.requestAnimationFrame(step)
  }
}

export default init
