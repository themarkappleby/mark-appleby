import { ScrollTrigger } from 'gsap/ScrollTrigger'

let played = false

function init (lottie) {
  ScrollTrigger.create({
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
