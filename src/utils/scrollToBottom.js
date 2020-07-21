import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

function scrollToBottom (cb) {
  gsap.to(window, {
    duration: 0.5,
    scrollTo: {
      y: 'max'
    },
    onComplete: cb
  })
}

export default scrollToBottom
