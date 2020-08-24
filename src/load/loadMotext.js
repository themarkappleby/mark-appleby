import motext from 'motext'
import { addProgress } from './progress'

function loadMotext (progress) {
  return motext.loadFont('https://unpkg.com/motext@1.3.15/dist/fonts/nunito.svg').then(() => {
    addProgress(progress)
  })
}

export default loadMotext
