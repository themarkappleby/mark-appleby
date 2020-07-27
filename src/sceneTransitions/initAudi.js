import gsap from 'gsap'
import { scrollToBottom, show, hide } from '../utils'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import initScrollEffects from '../scrollEffects'
import initScrollIndicator from './initScrollIndicator'

function audi (chest) {
  return () => {
    const scrollIndicator = document.querySelector('.audi .hero-scroll')
    scrollToBottom(() => {
      chest.gotoAndPlay('audi')
      if (window.gtag) {
        window.gtag('event', 'Chest - Audi')
      }
      window.setTimeout(() => {
        show('.audi .hero-title')
        window.setTimeout(() => {
          hide('.ecobee .hero')
          hide('.ecobee .section-content')
          show('.audi .section-content')
          show('.worldvision .hero')
          document.querySelector('.audi .hero-title').classList.add('hero-title--intro')
          window.scrollTo(0, 0)
          document.querySelector('.worldvision .badges-wrapper').appendChild(
            document.querySelector('.badges')
          )
          document.querySelector('.badge--audi .badge-label').textContent = 'Audi'
          initScrollEffects('audi')
          ScrollTrigger.refresh(true)
          if (window.particles) {
            window.particles.updateColors('audi')
          }
        }, 2000)
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
      }, 2000)
    })
  }
}

export default audi
