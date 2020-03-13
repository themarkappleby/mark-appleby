import './styles/styles.scss'
import lottie from 'lottie-web'
import gsap from 'gsap'
import { initThree } from './three'

var logo = lottie.loadAnimation({
  container: document.querySelector('.header-logo'),
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: 'assets/logo.json'
})
logo.onComplete = function () {
  setTimeout(() => tl.play(), 500)
}

var headingsIntro = {
  y: 16,
  opacity: 0,
  duration: 0.6,
  ease: 'power3'
}
// var tl = gsap.timeline({ onComplete: initCannon })
var tl = gsap.timeline()
tl.from('.header-name', headingsIntro)
tl.from('.header-role', headingsIntro)
tl.pause()

initThree()
