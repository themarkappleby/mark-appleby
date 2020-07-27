import { ScrollTrigger } from 'gsap/ScrollTrigger'

let played = false

function init (section) {
  if (section === 'contact') {
    ScrollTrigger.create({
      trigger: '.footer',
      start: 'bottom bottom',
      once: true,
      onEnter: e => {
        if (!played && e.progress < 1) {
          window.lottie.play('appleby')
          if (window.gtag) {
            window.gtag('event', 'Appleby Logo Appeared')
          }
          played = true
        }
      }
    })
  }
}

export default init
