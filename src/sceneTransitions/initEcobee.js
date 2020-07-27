import gsap from 'gsap'
import { show, hide } from '../utils/showHide'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import initScrollEffects from '../scrollEffects'
import initScrollIndicator from './initScrollIndicator'

const SIDE_BY_SIDE_BP = 1000

function ecobee (chest) {
  return () => {
    const scrollIndicator = document.querySelector('.ecobee .hero-scroll')
    if (window.gtag) {
      window.gtag('event', 'Chest - ecobee')
    }
    chest.gotoAndPlay('ecobee')
    window.setTimeout(() => {
      show('.ecobee .hero-title')
      window.setTimeout(() => {
        show('.ecobee .section-content')
        show('.audi .hero')
        const home = document.querySelector('.home')
        home.style.width = home.clientWidth + 'px'
        home.style.height = home.clientHeight + 'px'
        hide('.home-copy')
        document.querySelector('.ecobee .hero-title').classList.add('hero-title--intro')
        initScrollEffects('ecobee')
        ScrollTrigger.refresh()
        if (window.particles) {
          window.particles.updateColors('ecobee')
        }
      }, 1500)
      document.querySelector('.ecobee .hero-particles').style.zIndex = 1
      var tl = gsap.timeline()
      tl.to('.home-copy', {
        opacity: 0,
        duration: 1
      })
      if (window.outerWidth >= SIDE_BY_SIDE_BP) {
        tl.to('.home, .home-overlay', {
          left: '-25%',
          opacity: 0,
          duration: 2,
          ease: 'power1.easeOut'
        }, 0)
        tl.to('.ecobee .hero-chest', {
          left: '-25%',
          marginLeft: 0,
          duration: 2,
          ease: 'power1.easeOut'
        }, 0)
      } else {
        tl.to('.home-wrapper', {
          bottom: '-25%',
          duration: 2,
          ease: 'power1.easeOut'
        }, 0)
        tl.to('.hero-horizon', {
          height: '50%',
          duration: 2
        }, 0)
      }
      tl.to('.ecobee .hero-white', {
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
      window.state.set('scene', 'ecobee')
    }, 2000)
  }
}

export default ecobee
