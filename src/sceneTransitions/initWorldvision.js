import gsap from 'gsap'
import { scrollToBottom, show, hide } from '../utils'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import initScrollEffects from '../scrollEffects'
import initScrollIndicator from './initScrollIndicator'

function worldvision (chest) {
  return () => {
    const scrollIndicator = document.querySelector('.worldvision .hero-scroll')
    scrollToBottom(() => {
      window.setTimeout(() => {
        hide('.audi .hero')
        hide('.audi .section-content')
        show('.worldvision .section-content')
        show('.contact .hero')
        document.querySelector('.worldvision .hero-title').classList.add('hero-title--intro')
        window.scrollTo(0, 0)
        initScrollEffects('worldvision')
        ScrollTrigger.refresh()
      }, 1500)
      chest.gotoAndPlay('worldvision')
      var tl = gsap.timeline()
      tl.to('.worldvision .hero-white', {
        opacity: 0,
        duration: 2,
        ease: 'power1.easeOut'
      }, 0.5)
      tl.from(scrollIndicator, {
        opacity: 0,
        duration: 3
      }, 2.5)
      tl.play()
      initScrollIndicator(scrollIndicator)
      window.state.set('scene', 'worldvision')
    })
  }
}

export default worldvision
