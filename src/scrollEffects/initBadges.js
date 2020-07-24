import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function init (section) {
  ScrollTrigger.create({
    trigger: '.badges',
    once: true,
    start: 'center center',
    onEnter: e => {
      update(e, section)
    }
  })
}

function update (e, section) {
  window.lottie.play(section)
  gsap.to(`.badge--${section} .badge-label`, {
    opacity: 1,
    y: 0,
    duration: 1.5,
    delay: 0.5
  })
}

export default init
