import gsap from 'gsap'
import { scrollToBottom, show, hide } from '../utils'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function contact (chest) {
  return () => {
    scrollToBottom(() => {
      window.setTimeout(() => {
        hide('.worldvision .hero')
        hide('.worldvision .section-content')
        show('.contact .section-content')
        show('.footer')
        ScrollTrigger.refresh()
        document.querySelector('.contact .hero-title').classList.add('hero-title--intro')
        window.scrollTo(0, 0)
      }, 2000)
      chest.gotoAndPlay('contact')
      var tl = gsap.timeline()
      tl.to('.contact .hero-white', {
        opacity: 0,
        duration: 2,
        ease: 'power1.easeOut'
      }, 0.5)
      tl.from('.contact .hero-scroll', {
        opacity: 0,
        duration: 3
      }, 2.5)
      tl.play()
      window.state.set('scene', 'contact')
    })
  }
}

export default contact
