import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import initScreenshotScrolling from './screenshotScrolling'
import initCardIntros from './cardIntros'
import initSwapChests from './swapChests'

function init (chest, particles) {
  gsap.registerPlugin(ScrollTrigger)
  initScreenshotScrolling()
  initCardIntros()
  initSwapChests(chest, particles)
}

export default init
