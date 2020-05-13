import './styles/styles.scss'
import loadChest from './loadChest'
import initLogoEmitter from './logoEmitter'

loadChest({ canvas: document.querySelector('.home-canvas') })

initLogoEmitter()
