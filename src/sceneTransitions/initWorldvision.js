import gsap from 'gsap'
import { scrollToBottom, show, hide } from '../utils'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import initScrollEffects from '../scrollEffects'
import initScrollIndicator from './initScrollIndicator'

function worldvision (chest) {
  return () => {
    const scrollIndicator = document.querySelector('.worldvision .hero-scroll')
    scrollToBottom(() => {
      chest.gotoAndPlay('worldvision')
      if (window.gtag) {
        window.gtag('event', 'Chest - World Vision')
      }
      window.setTimeout(() => {
        show('.worldvision .hero-title')
        window.setTimeout(() => {
          hide('.audi .hero')
          hide('.audi .section-content')
          show('.worldvision .section-content')
          show('.contact .hero')
          document.querySelector('.worldvision .hero-title').classList.add('hero-title--intro')
          window.scrollTo(0, 0)
          document.querySelector('.contact .badges-wrapper').appendChild(
            document.querySelector('.badges')
          )
          document.querySelector('.badge--worldvision .badge-label').textContent = 'World Vision'
          initScrollEffects('worldvision')
          ScrollTrigger.refresh()
          if (window.particles) {
            window.particles.updateColors('worldvision')
          }
        }, 1500)
        var tl = gsap.timeline()
        tl.to('.worldvision .badges-wrapper', {
          opacity: 0,
          duration: 0.5
        })
        tl.to('.worldvision .hero-white', {
          opacity: 0,
          duration: 2
        }, 0.5)
        tl.from(scrollIndicator, {
          opacity: 0,
          duration: 3
        }, 2.5)
        tl.play()
        initScrollIndicator(scrollIndicator)
        window.state.set('scene', 'worldvision')
      }, 2000)
    })
  }
}

export default worldvision
