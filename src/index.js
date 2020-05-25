import gsap, { Power1 } from 'gsap'
import Rellax from 'rellax'
import './styles/styles.scss'
import initState from './utils/state'
import initChest from './chest'
import initLogoEmitter from './logoEmitter'
initState()

Rellax('.rellax')

// Debug value to instantly start on specific scene
const START_SCENE = null
// const START_SCENE = 'ecobee'

window.addEventListener('statechange', state => {
  if (state.name === 'scene' && state.value === 'ecobee') {
    ecobeeTransition()
  }
})

if (START_SCENE) {
  window.state.set('scene', START_SCENE)
} else {
  window.state.set('scene', 'loading')
}

gsap.to('.loading', { opacity: 0, duration: START_SCENE ? 0 : 2 })

window.setTimeout(() => {
  if (!START_SCENE) {
    window.scrollTo(0, 0)
    window.state.set('scene', 'intro')
  }
  initChest({
    file: 'assets/chest.glb',
    canvas: document.querySelector('.home-canvas'),
    instant: START_SCENE
  })
}, 1000)

initLogoEmitter()

function ecobeeTransition () {
  var tl = gsap.timeline()
  tl.to('.home-chest', {
    left: '-20%',
    duration: START_SCENE ? 0 : 2,
    ease: Power1.easeOut
  })
  tl.to('.home-copy', {
    left: '-20%',
    opacity: 0,
    duration: START_SCENE ? 0 : 2,
    ease: Power1.easeOut
  }, 0)
  tl.to('.home-background', {
    left: '-100%',
    duration: START_SCENE ? 0 : 2,
    ease: Power1.easeOut
  }, 0)
  tl.to('body', {
    background: '#5dbe7b',
    duration: START_SCENE ? 0 : 2,
    ease: Power1.easeOut
  }, START_SCENE ? 0 : 0.5)
  tl.to('.ecobee-title', {
    opacity: 1,
    duration: START_SCENE ? 0 : 2,
    ease: Power1.easeOut
  }, START_SCENE ? 0 : 1)
  tl.play()
}
