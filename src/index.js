import 'core-js/stable'
import 'regenerator-runtime/runtime'
import load from './load'
import { state as initState } from './utils'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import './styles/styles.scss'
import a11y from './misc/a11y'

let trackedEvent = false

console.log('%cHowdy! 👋 Thanks for stopping by. Have any questions about my code? Feel free to shoot me an email at themarkappleby@gmail.com', 'background: #222; color: #eabc36; font-size: 22px; padding: 20px;')

init()

function init () {
  gsap.registerPlugin(ScrollTrigger)
  initState({
    scene: 'loading',
    sceneOrder: [
      'intro',
      'ecobee',
      'audi',
      'worldvision',
      'contact'
    ]
  })
  a11y()
  load().then(() => {
    window.scrollTo(0, 0)
    window.transitions.intro().then(() => {
      if (window.particles) {
        window.particles.startMouseTracking()
      }
      if (window.gtag) {
        document.querySelector('.home-linkedin').addEventListener('click', handledLinkedIn)
      }
    })
  })
}

function handledLinkedIn () {
  if (!trackedEvent) {
    window.gtag('event', 'LinkedIn Clicked')
    trackedEvent = true
    document.querySelector('.home-linkedin').removeEventListener('click', handledLinkedIn)
  }
}
