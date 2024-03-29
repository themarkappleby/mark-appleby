import { addProgress, simulateProgress } from './progress'
import loadChest from './loadChest'
import loadLottie from './loadLottie'
import loadMotext from './loadMotext'
import initTransitions from '../sceneTransitions'
import initParticles from '../particles'

function load () {
  simulateProgress()
  return new Promise(resolve => {
    Promise.all([
      loadMotext(15),
      loadLottie(15)
    ]).then(() => {
      window.particles = initParticles({
        heroEl: document.querySelector('.particles'),
        logoEl: document.querySelector('[data-src="logos"]')
      })
      loadChest(60).then(() => {
        window.transitions = initTransitions()
        addProgress(10)
        resolve()
      })
    }).catch(error => {
      console.error(error)
    })
  })
}

export default load
