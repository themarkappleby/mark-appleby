/* global IntersectionObserver */

import gsap, { Power1 } from 'gsap'
import Rellax from 'rellax'
import './styles/styles.scss'
import './logoEmitter'
import './utils/screenSize'
import initState from './utils/state'
import initChest from './chest'

let chest = null
const transitions = {}

initState({
  scene: 'ecobee' // default is 'loading'
})

loadChest(loaded)

function loaded () {
  if (window.state.scene === 'loading') {
    window.scrollTo(0, 0)
    transitions.intro()
  } else {
    document.querySelector('.loading').style.opacity = 0
    transitions[window.state.scene](true)
  }
  initChestObserver()
  Rellax('.rellax', {
    center: true
  })
}

function chestClickHandler () {
  switch (window.state.scene) {
    case 'intro':
      transitions.ecobee()
      break
    case 'ecobee':
      transitions.audi()
      break
  }
}

transitions.intro = instant => {
  if (instant) {
    chest.gotoAndStop('intro', true)
  } else {
    window.setTimeout(() => {
      chest.gotoAndPlay('intro')
    }, 1700)
  }
  var tl = gsap.timeline()
  tl.to('.loading', { opacity: 0, duration: 0 })
  tl.from('.home-title', { opacity: 0, duration: 2 })
  tl.from('.home-text', { opacity: 0, duration: 2 }, '-=0.75')
  tl.from('.ecobee .hero-horizon', { opacity: 0, duration: 2 }, '-=1.5')
  if (instant) tl.totalProgress(1)
  window.state.set('scene', 'intro')
}

transitions.ecobee = instant => {
  if (instant) {
    chest.gotoAndStop('ecobee', true)
  } else {
    chest.gotoAndPlay('ecobee')
  }
  var tl = gsap.timeline()
  tl.to('.home', {
    left: '-25%',
    opacity: 0,
    duration: 2,
    ease: Power1.easeOut
  })
  tl.to('.ecobee .hero-chest', {
    left: '-25%',
    marginLeft: 0,
    duration: 2,
    ease: Power1.easeOut
  }, 0)
  tl.to('.ecobee .hero-white', {
    opacity: 0,
    duration: 2,
    ease: Power1.easeOut
  }, 0.5)
  tl.to('.ecobee .hero-title', {
    opacity: 1,
    duration: instant ? 0 : 3,
    ease: Power1.easeOut
  }, instant ? 0 : 2)
  tl.play()
  if (instant) tl.totalProgress(1)
  window.state.set('scene', 'ecobee')
}

transitions.audi = instant => {
  chest.gotoAndPlay('audi') // TODO audi
  var tl = gsap.timeline()
  tl.to('.audi .hero-white', {
    opacity: 0,
    duration: 2,
    ease: Power1.easeOut
  }, 0.5)
  tl.to('.audi .hero-title', {
    opacity: 1,
    duration: instant ? 0 : 3,
    ease: Power1.easeOut
  }, instant ? 0 : 2)
  tl.play()
  if (instant) tl.totalProgress(1)
  window.state.set('scene', 'audi')
}

function initChestObserver () {
  const observer = new IntersectionObserver((e) => {
    e.forEach(item => {
      if (item.isIntersecting) {
        if (chest && chest.canvas) {
          const section = item.target.dataset.section
          item.target.appendChild(chest.canvas)
          if (window.state.scene === 'ecobee') {
            if (section === 'ecobee') {
              chest.gotoAndStop('ecobee', true)
            } else if (section === 'audi') {
              chest.gotoAndStop('audi')
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
