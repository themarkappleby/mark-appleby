/* global IntersectionObserver */

import lottie from 'lottie-web'
import motext from 'motext'
import gsap from 'gsap'
import './styles/styles.scss'
import './logoEmitter'
import { state as initState, getNextScene } from './utils'
import initChest from './chest'
import initTransitions from './sceneTransitions'
import initParticles from './particles'
import initScrollEffects from './scrollEffects'

// TODO remove this. It is currently required by motext.
window.gsap = gsap

let chest = null
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

simulateProgress()
Promise.all([
  loadWindow(),
  loadFont(),
  loadChest()
]).then(loaded)

function loadWindow () {
  return new Promise(resolve => {
    window.addEventListener('load', resolve)
    addProgress(20)
  })
}

function loadFont () {
  return motext.loadFont('https://unpkg.com/motext@1.3.6/dist/fonts/motext.svg').then(() => {
    addProgress(20)
  })
}

function loadChest (cb) {
  return initChest({
    file: 'assets/chest.glb',
    container: document.querySelector('.ecobee .hero-chest'),
    onClick: chestClickHandler,
    onMouseover: chestMouseoverHandler
  }).then(data => {
    chest = data
    addProgress(60)
  })
}

function simulateProgress () {
  const interval = setInterval(() => {
    const progress = getProgress()
    if (progress > 90) {
      clearInterval(interval)
    } else {
      addProgress(1.5)
    }
  }, 100)
}

function loaded () {
  window.scrollTo(0, 0)
  transitions = initTransitions(chest)
  transitions.intro().then(() => {
    particles = initParticles(document.querySelector('.particles'))
    particles.startMouseTracking()
    initScrollEffects(chest, particles)
  })
  initScrollObservers() // TODO replace with gsap ScrollTrigger
  loadLottieAnimations()
}

function addProgress (amount) {
  const el = document.querySelector('.progress')
  const val = el.getAttribute('value') * 100
  const newAmount = (val + amount) / 100
  el.setAttribute('value', newAmount)
}

function getProgress () {
  const el = document.querySelector('.progress')
  const val = el.getAttribute('value') * 100
  return val
}

function chestClickHandler () {
  transitions[getNextScene()]()
  particles.stopMouseTracking()
  particles.stopEmitter()
  chest.disablePickHelper()
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

function initScrollObservers () {
  const hiddenObserver = new IntersectionObserver(e => {
    e.forEach(item => {
      if (item.isIntersecting) {
        const classList = item.target.classList
        if (classList.contains('badges-wrapper')) {
          moveBadges(item)
        } else if (classList.contains('hero-chest') && chest && chest.canvas) {
          // handleChest(item)
        }
      }
    })
  })
  const visibleObserver = new IntersectionObserver(e => {
    e.forEach(item => {
      if (item.isIntersecting) {
        const classList = item.target.classList
        if (classList.contains('badges-wrapper')) {
          animateBadges(item)
        }
      }
    })
  }, {
    threshold: 1
  })

  const hiddenSelectors = [
    '.ecobee .badges-wrapper',
    '.audi .badges-wrapper',
    '.worldvision .badges-wrapper'
  ]
  hiddenSelectors.forEach(selector => {
    hiddenObserver.observe(document.querySelector(selector))
  })

  const visibleSelectors = [
    '.ecobee .badges-wrapper',
    '.audi .badges-wrapper',
    '.worldvision .badges-wrapper',
    '.footer-logo'
  ]
  visibleSelectors.forEach(selector => {
    visibleObserver.observe(document.querySelector(selector))
  })

  function moveBadges (item) {
    if (!item.target.children.length) {
      const badges = document.querySelector('.badges')
      item.target.appendChild(badges)
    }
  }

  function animateBadges (item) {
    const section = item.target.closest('.section').dataset.section
    if (section) {
      window.setTimeout(() => {
        lottie.play(section)
      }, 200)
    }
  }

  function handleApplebyLogo () {
    window.setTimeout(() => {
      lottie.play('appleby')
    }, 500)
  }
}

function loadLottieAnimations () {
  loadLottieAnimation('appleby', 'logos/appleby.json', '.footer-logo')
  loadLottieAnimation('ecobee', 'ecobee-badge.json', '.badge--ecobee')
  loadLottieAnimation('audi', 'audi-badge.json', '.badge--audi')
  loadLottieAnimation('worldvision', 'worldvision-badge.json', '.badge--worldvision')
}

function loadLottieAnimation (name, assetPath, selector) {
  lottie.loadAnimation({
    name,
    container: document.querySelector(selector),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '/assets/' + assetPath
  })
}
