import gsap from 'gsap'
import { scrollToBottom, show, hide } from '../utils'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import initScrollEffects from '../scrollEffects'
import initScrollIndicator from './initScrollIndicator'

function audi (chest) {
  return () => {
    alert('transition audi 1')
    const scrollIndicator = document.querySelector('.audi .hero-scroll')
    scrollToBottom(() => {
      alert('transition audi 2')
      window.setTimeout(() => {
        alert('transition audi 3')
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
      tl.to('.audi .badges-wrapper', {
        opacity: 0,
        duration: 0.5
      })
      tl.to('.audi .hero-white', {
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
      window.state.set('scene', 'audi')
    })
  }
}

export default audi
