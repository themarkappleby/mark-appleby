import motext from 'motext'
import { addProgress } from './progress'

function loadMotext () {
  return motext.loadFont('https://unpkg.com/motext@1.3.6/dist/fonts/motext.svg').then(() => {
    addProgress(20)
  })
}

export default loadMotext
