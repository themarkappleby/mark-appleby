import './styles/styles.scss'
import initChest from './chest'
import initLogoEmitter from './logoEmitter'

const loadingOverlay = document.querySelector('.loading')
loadingOverlay.classList.add('loading--out')
initLogoEmitter()

window.setTimeout(() => {
  initChest({
    file: 'assets/chest.glb',
    canvas: document.querySelector('.home-canvas')
  })
}, 1500)
