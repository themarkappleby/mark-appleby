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
}, 1500)

initLogoEmitter()

window.addEventListener('statechange', state => {
  if (state.name === 'scene' && state.value === 'ecobee') {
    console.log('start ecobee transition')
  }
})
