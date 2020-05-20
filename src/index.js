import './styles/styles.scss'
import loadChest from './loadChest'
import initLogoEmitter from './logoEmitter'

const loadingOverlay = document.querySelector('.loading')
loadingOverlay.classList.add('loading--out')

window.setTimeout(() => {
  loadChest({ canvas: document.querySelector('.home-canvas') })
}, 1500)

initLogoEmitter()
