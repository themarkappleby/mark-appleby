import './styles/styles.scss'
import loadChest from './loadChest'

loadChest({
  path: 'assets/ecobee-chest.glb',
  canvas: document.querySelector('.home-canvas')
})
