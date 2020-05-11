import './styles/styles.scss'
import loadChest from './loadChest'
import initLogoEmitter from './logoEmitter'

loadChest({
  path: 'assets/chest.glb',
  canvas: document.querySelector('.home-canvas')
})

initLogoEmitter()
