import { addProgress, simulateProgress } from './progress'
import loadChest from './loadChest'
import loadLottie from './loadLottie'
import loadMotext from './loadMotext'
import loadWindow from './loadWindow'
import initTransitions from '../sceneTransitions'
import initParticles from '../particles'
import initScrollEffects from '../scrollEffects'

function load () {
  simulateProgress()
  return new Promise(resolve => {
    Promise.all([
      loadWindow(10),
      loadMotext(10),
      loadLottie(10)
    ]).then(() => {
      window.particles = initParticles({
        heroEl: document.querySelector('.particles'),
        logoEl: document.querySelector('[data-src="logos"]')
      })
      loadChest(60).then(() => {
        window.transitions = initTransitions()
        initScrollEffects()
        addProgress(10)
        resolve()
      })
    })
  })
}

export default load