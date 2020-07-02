import gsap from 'gsap'
import scrollTo from '../utils/scrollTo'
import { show, hide } from '../utils/showHide'

function contact (chest) {
  return () => {
    scrollTo(document.body.scrollHeight, () => {
      window.setTimeout(() => {
        hide('.worldvision .hero')
        hide('.worldvision .section-content')
        show('.contact .section-content')
        show('.footer')
      }, 2000)
      chest.gotoAndPlay('contact')
      var tl = gsap.timeline()
      tl.to('.contact .hero-white', {
        opacity: 0,
        duration: 2,
        ease: 'power1.easeOut'
      }, 0.5)
      tl.to('.contact .hero-title', {
        opacity: 1,
        duration: 3,
        ease: 'power1.easeOut'
      }, 2)
      tl.play()
      window.state.set('scene', 'contact')
    })
  }
}

export default contact
