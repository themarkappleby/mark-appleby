import { ScrollTrigger } from 'gsap/ScrollTrigger'
import initAppleby from './initAppleby'
import initBadges from './initBadges'
import initCardIntros from './initCardIntros'
import initParallax from './initParallax'
import initScreenshotScrolling from './initScreenshotScrolling'
import initScrollIndicators from './initScrollIndicators'

function init (section) {
  flush()
  initAppleby(section)
  initBadges(section)
  if (!isFirefox()) {
    // TODO: For some reason Firefox performance with these animations is terrible. Needs further investigation but disabling them for now.
    initScreenshotScrolling(section)
    initCardIntros(section)
    initParallax(section)
    initScrollIndicators(section)
  }
}

function flush () {
  ScrollTrigger.getAll().forEach(trigger => {
    if (!isHero(trigger)) {
      trigger.kill()
    }
  })
}

function isFirefox () {
  var browser = navigator.userAgent.toLowerCase()
  return browser.indexOf('firefox') > -1
}

function isHero (trigger) {
  return trigger.trigger.classList.contains('hero-chest')
}

export default init
