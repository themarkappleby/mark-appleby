import gsap from 'gsap'
import { scrollToBottom, show, hide } from '../utils'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import initScrollEffects from '../scrollEffects'

function audi (chest) {
  return () => {
    scrollToBottom(() => {
      window.setTimeout(() => {
        hide('.ecobee .hero')
        hide('.ecobee .section-content')
        show('.audi .section-content')
        show('.worldvision .hero')
        document.querySelector('.audi .hero-title').classList.add('hero-title--intro')
        window.scrollTo(0, 0)
        initScrollEffects('audi')
        ScrollTrigger.refresh(true)
      }, 2000)
      chest.gotoAndPlay('audi')
      var tl = gsap.timeline()
      tl.to('.audi .hero-white', {
        opacity: 0,
        duration: 2,
        ease: 'power1.easeOut'
      }, 0.5)
      tl.from('.audi .hero-scroll', {
        opacity: 0,
        duration: 3
      }, 2.5)
      tl.play()
      window.state.set('scene', 'audi')
    })
  }
}

export default audi
