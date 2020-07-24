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
    trigger.kill()
  })
}

function isFirefox () {
  var browser = navigator.userAgent.toLowerCase()
  return browser.indexOf('firefox') > -1
}

export default init
