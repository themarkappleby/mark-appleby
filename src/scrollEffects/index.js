import { ScrollTrigger } from 'gsap/ScrollTrigger'
import initAppleby from './initAppleby'
import initBadges from './initBadges'
import initCardIntros from './initCardIntros'
import initParallax from './initParallax'
import initScreenshotScrolling from './initScreenshotScrolling'
import initScrollIndicators from './initScrollIndicators'

function init (section) {
  flush()
  initScreenshotScrolling(section)
  initCardIntros(section)
  initBadges(section)
  initAppleby(section)
  initParallax(section)
  initScrollIndicators(section)
}

function flush () {
  ScrollTrigger.getAll().forEach(trigger => {
    if (!isHero(trigger)) {
      trigger.kill()
    }
  })
}

function isHero (trigger) {
  return trigger.trigger.classList.contains('hero-chest')
}

export default init
