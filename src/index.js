import load from './load'
import { state as initState } from './utils'
import './styles/styles.scss'

initState({
  scene: 'loading',
  sceneOrder: [
    'intro',
    'ecobee',
    'audi',
    'worldvision',
    'contact'
  ]
})

load().then(() => {
  window.scrollTo(0, 0)
  window.transitions.intro().then(window.particles.startMouseTracking)
})
