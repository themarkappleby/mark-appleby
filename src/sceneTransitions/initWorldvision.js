import gsap from 'gsap'
import { scrollTo, show, hide } from '../utils'
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
        document.querySelector('.worldvision .hero-title').classList.add('hero-title--intro')
      }, 1500)
      chest.gotoAndPlay('worldvision')
      var tl = gsap.timeline()
      tl.to('.worldvision .hero-white', {
        opacity: 0,
        duration: 2,
        ease: 'power1.easeOut'
      }, 0.5)
      tl.from('.worldvision .hero-scroll', {
        opacity: 0,
        duration: 3
      }, 2.5)
      tl.play()
      window.state.set('scene', 'worldvision')
    })
  }
}

export default worldvision
