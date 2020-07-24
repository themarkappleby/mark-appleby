/* global alert */

import load from './load'
import { state as initState } from './utils'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import './styles/styles.scss'
import a11y from './misc/a11y'
import 'mailgo/dist/mailgo.min.js'

const PASSWORD_PROTECT = true
const PASSWORD = 'd3adb33f'

console.log('%cHowdy! 👋 Thanks for stopping by. Have any questions about my code? Feel free to shoot me an email at themarkappleby@gmail.com', 'background: #222; color: #eabc36; font-size: 22px; padding: 20px;')

if (PASSWORD_PROTECT) {
  const form = document.querySelector('form.password')
  form.style.display = 'flex'
  form.addEventListener('submit', e => {
    e.preventDefault()
    const passwordEl = document.getElementById('password')
    if (passwordEl.value === PASSWORD) {
      form.style.display = 'none'
      init()
    } else {
      alert('Incorrect password, please try again.')
      passwordEl.value = ''
    }
    return false
  })
} else {
  init()
}

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
    })
  })
}
