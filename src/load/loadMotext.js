import motext from 'motext'
import { addProgress } from './progress'

function loadMotext (progress) {
  return motext.loadFont('https://unpkg.com/motext@1.3.14/dist/fonts/motext.svg').then(() => {
    addProgress(progress)
  })
}

export default loadMotext
