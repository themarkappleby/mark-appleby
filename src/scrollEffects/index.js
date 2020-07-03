import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import initAppleby from './initAppleby'
import initBadges from './initBadges'
import initCardIntros from './initCardIntros'
import initParallax from './initParallax'
import initScreenshotScrolling from './initScreenshotScrolling'
import initSwapChests from './initSwapChests'

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
