import lottie from 'lottie-web'
import gsap from 'gsap'
import { initThree, initCannon, animate } from './three'

var headingsIntro = {
  y: 16,
  opacity: 0,
  duration: 0.6,
  ease: 'power3'
}
var tl = gsap.timeline({ onComplete: initCannon })
tl.from('#name', headingsIntro)
tl.from('#role', headingsIntro)
tl.pause()

initThree()
animate()

var logo = lottie.loadAnimation({
  container: document.getElementById('logo'),
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: 'assets/logo.json'
})

logo.onComplete = function () {
  setTimeout(() => tl.play(), 500)
}
