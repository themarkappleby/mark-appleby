/* global IntersectionObserver */

import lottie from 'lottie-web'
import './styles/styles.scss'
import './logoEmitter'
import './utils/screenSize'
import initState from './utils/state'
import initChest from './chest'
import initTransitions from './transitions'

let chest = null
let transitions = {}

const SCENE_ORDER = {
  intro: 'ecobee',
  ecobee: 'audi',
  audi: 'worldvision',
  worldvision: 'contact'
}

initState({
  scene: 'ecobee' // default is 'loading'
})

loadChest(loaded)

function loaded () {
  transitions = initTransitions(chest)
  if (window.state.scene === 'loading') {
    window.scrollTo(0, 0)
    transitions.intro()
  } else {
    document.querySelector('.loading').style.opacity = 0
    transitions[window.state.scene](true)
  }
  initChestObserver()
  loadLogoAnimation()
}

function chestClickHandler () {
  // TODO determine if top chest or bottom chest was clicked
  const currentScene = window.state.scene
  transitions[SCENE_ORDER[currentScene]]()
}

function initChestObserver () {
  const observer = new IntersectionObserver((e) => {
    e.forEach(item => {
      if (item.isIntersecting) {
        if (chest && chest.canvas) {
          const section = item.target.dataset.section
          if (section === 'footer') {
            window.setTimeout(() => {
              lottie.play()
            }, 500)
          } else {
            item.target.appendChild(chest.canvas)
            chest.resize()
            if (window.state.scene === 'ecobee') {
              if (section === 'ecobee') {
                chest.gotoAndStop('ecobee', true)
              } else if (section === 'audi') {
                chest.gotoAndStop('audi')
              }
            }
          }
        }
      }
    })
  })
  observer.observe(document.querySelector('.ecobee .hero-chest'))
  observer.observe(document.querySelector('.audi .hero-chest'))
  observer.observe(document.querySelector('.worldvision .hero-chest'))
  observer.observe(document.querySelector('.contact .hero-chest'))
  observer.observe(document.querySelector('.footer-logo'))
}

function loadChest (cb) {
  initChest({
    file: 'assets/chest.glb',
    container: document.querySelector('.ecobee .hero-chest'),
    onClick: chestClickHandler
  }, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      chest = data
      cb()
    }
  })
}

function loadLogoAnimation () {
  lottie.loadAnimation({
    container: document.querySelector('.footer-logo'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '/assets/logos/appleby.json'
  })
}
