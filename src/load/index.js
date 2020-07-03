import { simulateProgress } from './progress'
import loadChest from './loadChest'
import loadLottie from './loadLottie'
import loadMotext from './loadMotext'
import loadWindow from './loadWindow'

function load ({ chestClickHandler, chestMouseoverHandler }) {
  return new Promise(resolve => {
    simulateProgress()
    Promise.all([
      loadWindow(),
      loadMotext(),
      loadChest(chestClickHandler, chestMouseoverHandler),
      loadLottie()
    ]).then(() => {
      resolve()
    })
  })
}

export default load
