import gsap, { Power1 } from 'gsap'
import './styles/styles.scss'
import initState from './utils/state'
import initChest from './chest'
import initLogoEmitter from './logoEmitter'
initState({
  scene: 'loading'
})

const loadingOverlay = document.querySelector('.loading')
loadingOverlay.classList.add('loading--out')
window.setTimeout(() => {
  window.state.set('scene', 'intro')
  initChest({
    file: 'assets/chest.glb',
    canvas: document.querySelector('.home-canvas')
  })
}, 1000)

initLogoEmitter()

window.addEventListener('statechange', state => {
  if (state.name === 'scene' && state.value === 'ecobee') {
    ecobeeTransition()
  }
})

function ecobeeTransition () {
  var tl = gsap.timeline()
  tl.to('.home-chest', { left: '-20%', duration: 2, ease: Power1.easeOut })
  tl.to('.home-copy', { left: '-20%', opacity: 0, duration: 2, ease: Power1.easeOut }, 0)
  tl.to('.home-background', { left: '-100%', duration: 2, ease: Power1.easeOut }, 0)
  tl.to('.main', { backgroundColor: '#5dbe7b', duration: 2, ease: Power1.easeOut }, 0.5)
  tl.to('.ecobee-title', { opacity: 1, duration: 2, ease: Power1.easeOut }, 1)
  tl.play()
}
