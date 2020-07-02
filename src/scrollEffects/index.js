import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import initScreenshotScrolling from './screenshotScrolling'
import initCardIntros from './cardIntros'

function init () {
  gsap.registerPlugin(ScrollTrigger)
  initScreenshotScrolling()
  initCardIntros()
}

export default init
