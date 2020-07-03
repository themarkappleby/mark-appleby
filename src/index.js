/* global */

import gsap from 'gsap'
import './styles/styles.scss'
import './logoEmitter'
import { state as initState, getNextScene } from './utils'
import initTransitions from './sceneTransitions'
import initParticles from './particles'
import initScrollEffects from './scrollEffects'
import load from './load'

// TODO remove this. It is currently required by motext.
window.gsap = gsap

let transitions = {}
let particles = null

initState({
  scene: 'loading',
  sceneOrder: [
    'intro',
    'ecobee',
    'audi',
    'worldvision',
    'contact'
  ]
})

load({ chestClickHandler, chestMouseoverHandler }).then(loaded)

function loaded () {
  window.scrollTo(0, 0)
  transitions = initTransitions(window.chest)
  transitions.intro().then(() => {
    particles = initParticles(document.querySelector('.particles'))
    particles.startMouseTracking()
    initScrollEffects({ chest: window.chest, particles, lottie: window.lottie })
  })
}

function chestClickHandler () {
  transitions[getNextScene()]()
  particles.stopMouseTracking()
  particles.stopEmitter()
  window.chest.disablePickHelper()
}

function chestMouseoverHandler (hovering, x, y) {
  if (hovering) {
    document.querySelectorAll('.hero-chest').forEach(el => {
      el.style.cursor = 'pointer'
    })
    particles.startEmitter(x, y)
    particles.stopMouseTracking()
  } else {
    document.querySelectorAll('.hero-chest').forEach(el => {
      el.style.cursor = 'default'
    })
    particles.stopEmitter()
    particles.startMouseTracking()
  }
}
