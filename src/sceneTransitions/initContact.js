import gsap from 'gsap'
import { scrollToBottom, show, hide } from '../utils'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import initScrollEffects from '../scrollEffects'
import initScrollIndicator from './initScrollIndicator'
import initDrawingCanvas from '../misc/initDrawingCanvas'
import mailgo from 'mailgo'

let trackedEvent = false

function contact (chest) {
  return () => {
    const scrollIndicator = document.querySelector('.contact .hero-scroll')
    scrollToBottom(() => {
      chest.gotoAndPlay('contact')
      if (window.gtag) {
        window.gtag('event', 'Chest - Contact')
      }
      window.setTimeout(() => {
        show('.contact .hero-title')
        window.setTimeout(() => {
          hide('.worldvision .hero')
          hide('.worldvision .section-content')
          show('.contact .section-content')
          show('.footer')
          initDrawingCanvas()
          document.querySelector('.contact .hero-title').classList.add('hero-title--intro')
          window.scrollTo(0, 0)
          initScrollEffects('contact')
          ScrollTrigger.refresh()
          mailgo()
          if (window.gtag) {
            document.querySelector('.footer-linkedin').addEventListener('click', handledLinkedIn)
          }
        }, 2000)
        var tl = gsap.timeline()
        tl.to('.contact .badges-wrapper', {
          opacity: 0,
          duration: 0.5
        })
        tl.to('.contact .hero-white', {
          opacity: 0,
          duration: 2
        }, 0.5)
        tl.from(scrollIndicator, {
          opacity: 0,
          duration: 3
        }, 2.5)
        tl.play()
        initScrollIndicator(scrollIndicator)
        window.state.set('scene', 'contact')
      }, 2000)
    })
  }
}

function handledLinkedIn () {
  if (!trackedEvent) {
    window.gtag('event', 'LinkedIn Clicked - Footer')
    trackedEvent = true
    document.querySelector('.footer-linkedin').removeEventListener('click', handledLinkedIn)
  }
}

export default contact
