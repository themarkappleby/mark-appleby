import rand from './utils/rand'

const canvas = document.querySelector('.particles')
const ctx = canvas.getContext('2d')

const inactive = []
const active = []

const MAX_PARTICLES = 1000
const TERMINAL_VELOCITY = 10
const GRAVITY = 0.05
const DAMPENING = 8
const FRICTION = 1.01
const SIZE = 7
const LIFE = 35
const ROTATION_FACTOR = 3
const DECAY_FACTOR = 3
const MIN_DISTANCE = 20
const PARTICLE_MULTIPLIER = 5
const VARIATION = 1.5
const COLORS = ['#0dafb7', '#eabc36', '#e154ed', '#62d628', 'black']

window.inactive = inactive
window.active = active

let running = false
let emitting = false
let mouseTracking = false
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
let emitter = null

function init () {
  initParticles()
  initMouseTracking()
  initResizeTracking()
  return {
    startEmitter,
    stopEmitter,
    startMouseTracking,
    stopMouseTracking
  }
}

function initResizeTracking () {
  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight
  window.addEventListener('resize', () => {
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
  })
}

function startEmitter () {
  const SPREAD = 10
  if (!emitting) {
    emitting = true
    emitter = setInterval(() => {
      emit({
        pos: {
          x: 1020,
          y: 400
        },
        vel: {
          x: wiggle(0, SPREAD),
          y: wiggle(0, SPREAD)
        }
      })
    }, 15)
  }
}

function stopEmitter () {
  clearInterval(emitter)
  emitting = false
}

function startMouseTracking () {
  mouseTracking = true
}

function stopMouseTracking () {
  mouseTracking = false
}

function initMouseTracking () {
  window.addEventListener('mousemove', event => {
    if (mouseTracking) {
      x = event.clientX
      y = event.clientY
      distance = diff(x, m.pos.x) + diff(y, m.pos.y)
      if (distance > MIN_DISTANCE && m.pos.x !== 0 && m.pos.y !== 0) {
        for (let i = 1; i <= PARTICLE_MULTIPLIER; i++) {
          m.vel.x = wiggle((x - m.pos.x) / DAMPENING, VARIATION)
          m.vel.y = wiggle((y - m.pos.y) / DAMPENING, VARIATION)
          emit(m)
        }
      }
      m.pos.x = x
      m.pos.y = y
    }
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

function resetParticle (particle, params) {
  particle.life = wiggle(LIFE, VARIATION)
  particle.grav = 0
  particle.rot = 0
  particle.size = SIZE
  particle.pos.x = params.pos.x
  particle.pos.y = params.pos.y
  particle.vel.x = params.vel.x
  particle.vel.y = params.vel.y
  return particle
}

function emit (params) {
  const particle = inactive.pop()
  if (particle) {
    active.push(resetParticle(particle, params))
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
