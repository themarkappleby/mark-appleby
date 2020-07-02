import motext from 'motext'
import Lottie from 'lottie-web'
import initChest from './chest'

let lottie = null
let chest = null

function load ({ chestClickHandler, chestMouseoverHandler }) {
  return new Promise(resolve => {
    simulateProgress()
    Promise.all([
      loadWindow(),
      loadFont(),
      loadChest(chestClickHandler, chestMouseoverHandler),
      loadLottieAnimations()
    ]).then(() => {
      resolve({ chest, lottie })
    })
  })
}

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

function loadChest (chestClickHandler, chestMouseoverHandler) {
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

function loadLottieAnimations () {
  return new Promise(resolve => {
    [
      {
        name: 'appleby',
        assetPath: 'logos/appleby.json',
        selector: '.footer-logo'
      }, {
        name: 'ecobee',
        assetPath: 'ecobee-badge.json',
        selector: '.badge--ecobee'
      }, {
        name: 'audi',
        assetPath: 'audi-badge.json',
        selector: '.badge--audi'
      }, {
        name: 'worldvision',
        assetPath: 'worldvision-badge.json',
        selector: '.badge--worldvision'
      }
    ].forEach(({ name, assetPath, selector }) => {
      Lottie.loadAnimation({
        name,
        container: document.querySelector(selector),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '/assets/' + assetPath
      })
    })
    lottie = Lottie
    resolve()
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

export default load
