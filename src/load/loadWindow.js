import { addProgress } from './progress'

function loadWindow () {
  return new Promise(resolve => {
    window.addEventListener('load', resolve)
    addProgress(20)
  })
}

export default loadWindow
