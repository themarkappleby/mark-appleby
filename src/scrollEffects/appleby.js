import { ScrollTrigger } from 'gsap/ScrollTrigger'

let played = false

function init (lottie) {
  ScrollTrigger.create({
    markers: true,
    trigger: '.footer-logo',
    onEnter: e => {
      if (!played && e.progress < 1) {
        lottie.play('appleby')
        played = true
      }
    }
  })
}

export default init
