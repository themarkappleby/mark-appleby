/* global IntersectionObserver */

import lottie from 'lottie-web'
import motext from 'motext'
import gsap from 'gsap'
import './styles/styles.scss'
import './logoEmitter'
import './utils/screenSize'
import initState from './utils/state'
import initChest from './chest'
import initTransitions from './transitions'
import initMouseTrail from './mouseTrail'

window.gsap = gsap

let chest = null
let transitions = {}

const SCENE_ORDER = {
  intro: 'ecobee',
  ecobee: 'audi',
  audi: 'worldvision',
  worldvision: 'contact'
}

initState({
  scene: 'loading' // default is 'loading'
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
    onClick: chestClickHandler
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
  transitions.intro().then(initMouseTrail)
  initScrollObservers()
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
  // TODO determine if top chest or bottom chest was clicked
  const currentScene = window.state.scene
  transitions[SCENE_ORDER[currentScene]]()
}

function initScrollObservers () {
  const hiddenObserver = new IntersectionObserver(e => {
    e.forEach(item => {
      if (item.isIntersecting) {
        const classList = item.target.classList
        if (classList.contains('badges-wrapper')) {
          moveBadges(item)
        } else if (classList.contains('hero-chest') && chest && chest.canvas) {
          handleChest(item)
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
        } else if (classList.contains('footer-logo')) {
          handleApplebyLogo()
        }
      }
    })
  }, {
    threshold: 1
  })

  const hiddenSelectors = [
    '.ecobee .hero-chest',
    '.audi .hero-chest',
    '.worldvision .hero-chest',
    '.contact .hero-chest',
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

  function handleChest (item) {
    const section = item.target.dataset.section
    item.target.appendChild(chest.canvas)
    chest.resize()
    if (window.state.scene === 'ecobee') {
      if (section === 'ecobee') {
        chest.setWeight('ecobee', 1)
      } else if (section === 'audi') {
        chest.setWeight('ecobee', 0)
      }
    } else if (window.state.scene === 'audi') {
      if (section === 'audi') {
        chest.setWeight('audi', 1)
      } else if (section === 'worldvision') {
        chest.setWeight('audi', 0)
      }
    } else if (window.state.scene === 'worldvision') {
      if (section === 'worldvision') {
        chest.setWeight('worldvision', 1)
      } else if (section === 'contact') {
        chest.setWeight('worldvision', 0)
      }
    }
  }

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
