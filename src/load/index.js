import loadChest from './loadChest'
import loadLottie from './loadLottie'
import loadMotext from './loadMotext'
import loadWindow from './loadWindow'

function load ({ chestClickHandler, chestMouseoverHandler }) {
  return new Promise(resolve => {
    Promise.all([
      loadWindow(10),
      loadMotext(20),
      loadChest(60, chestClickHandler, chestMouseoverHandler),
      loadLottie(10)
    ]).then(() => {
      resolve()
    })
  })
}

export default load
