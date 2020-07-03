import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import initScreenshotScrolling from './screenshotScrolling'
import initCardIntros from './cardIntros'
import initSwapChests from './swapChests'
import initBadges from './badges'
import initAppleby from './appleby'
import initParallax from './parallax'

function init ({ chest, particles, lottie }) {
  gsap.registerPlugin(ScrollTrigger)
  initScreenshotScrolling()
  initCardIntros()
  initSwapChests(chest, particles)
  initBadges(lottie)
  initAppleby(lottie)
  initParallax()
}

export default init
