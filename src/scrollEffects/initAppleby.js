import { ScrollTrigger } from 'gsap/ScrollTrigger'

let played = false

function init () {
  ScrollTrigger.create({
    trigger: '.footer',
    start: 'bottom bottom',
    onEnter: e => {
      if (!played && e.progress < 1) {
        window.lottie.play('appleby')
        played = true
      }
    }
  })
}

export default init
