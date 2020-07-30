import { ScrollTrigger } from 'gsap/ScrollTrigger'
import initAppleby from './initAppleby'
import initCardIntros from './initCardIntros'
import initParallax from './initParallax'
import initScreenshotScrolling from './initScreenshotScrolling'
import initScrollIndicators from './initScrollIndicators'
import initSwapChests from './initSwapChests'
import initBadges from './initBadges'

function init (section) {
  flush()
  initAppleby(section)
  initSwapChests(section)
  initBadges(section)
  initScreenshotScrolling(section)
  initCardIntros(section)
  initParallax(section)
  initScrollIndicators(section)
}

function flush () {
  ScrollTrigger.getAll().forEach(trigger => {
    trigger.kill()
  })
}

export default init
