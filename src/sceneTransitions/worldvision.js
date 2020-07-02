import gsap from 'gsap'
import scrollTo from '../utils/scrollTo'
import { show, hide } from '../utils/showHide'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function worldvision (chest) {
  return () => {
    scrollTo(document.body.scrollHeight, () => {
      window.setTimeout(() => {
        hide('.audi .hero')
        hide('.audi .section-content')
        show('.worldvision .section-content')
        show('.contact .hero')
        ScrollTrigger.refresh()
      }, 2000)
      chest.gotoAndPlay('worldvision')
      var tl = gsap.timeline()
      tl.to('.worldvision .hero-white', {
        opacity: 0,
        duration: 2,
        ease: 'power1.easeOut'
      }, 0.5)
      tl.to('.worldvision .hero-title', {
        opacity: 1,
        duration: 3,
        ease: 'power1.easeOut'
      }, 2)
      tl.play()
      window.state.set('scene', 'worldvision')
    })
  }
}

export default worldvision
