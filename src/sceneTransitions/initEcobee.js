import gsap from 'gsap'
import { show } from '../utils/showHide'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SIDE_BY_SIDE_BP = 1000

function ecobee (chest) {
  return () => {
    chest.gotoAndPlay('ecobee')
    window.setTimeout(() => {
      show('.ecobee .section-content')
      show('.audi .hero')
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
      tl.to('.home-overlay', {
        opacity: 0,
        duration: 2
      }, 0)
      /*
      tl.to('.ecobee .hero-chest', {
        yPercent: 25,
        duration: 2,
        ease: 'power1.easeOut'
      }, 0)
      */
    }
    tl.to('.ecobee .hero-white', {
      opacity: 0,
      duration: 2,
      ease: 'power1.easeOut'
    }, 0.5)
    tl.to('.ecobee .hero-title', {
      opacity: 1,
      duration: 3,
      ease: 'power1.easeOut'
    }, 2)
    tl.play()
    window.state.set('scene', 'ecobee')
  }
}

export default ecobee
