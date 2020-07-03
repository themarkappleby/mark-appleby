import { addProgress } from './progress'

function loadWindow (progress) {
  return new Promise(resolve => {
    window.addEventListener('load', resolve)
    addProgress(progress)
  })
}

export default loadWindow
