import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import initScreenshotScrolling from './screenshotScrolling'
import initCardIntros from './cardIntros'
import initSwapChests from './swapChests'
import initBadges from './badges'

function init (chest, particles) {
  gsap.registerPlugin(ScrollTrigger)
  initScreenshotScrolling()
  initCardIntros()
  initSwapChests(chest, particles)
  initBadges()
}

export default init
