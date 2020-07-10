import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import initAppleby from './initAppleby'
import initBadges from './initBadges'
import initCardIntros from './initCardIntros'
import initParallax from './initParallax'
import initScreenshotScrolling from './initScreenshotScrolling'
import initSwapChests from './initSwapChests'
import initScrollIndicators from './initScrollIndicators'

function init () {
  gsap.registerPlugin(ScrollTrigger)
  initScreenshotScrolling()
  initCardIntros()
  initSwapChests()
  initBadges()
  initAppleby()
  initParallax()
  initScrollIndicators()
}

export default init
