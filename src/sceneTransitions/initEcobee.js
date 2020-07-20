import gsap from 'gsap'
import { show, hide } from '../utils/showHide'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import initScrollEffects from '../scrollEffects'
import initScrollIndicator from './initScrollIndicator'

const SIDE_BY_SIDE_BP = 1000

function ecobee (chest) {
  return () => {
    const scrollIndicator = document.querySelector('.ecobee .hero-scroll')
    chest.gotoAndPlay('ecobee')
    window.setTimeout(() => {
      show('.ecobee .section-content')
      show('.audi .hero')
      hide('.home-copy')
      document.querySelector('.ecobee .hero-title').classList.add('hero-title--intro')
      initScrollEffects('ecobee')
      ScrollTrigger.refresh()
    }, 1500)
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
  }
}

export default ecobee
