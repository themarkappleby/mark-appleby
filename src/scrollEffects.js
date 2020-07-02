import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

function init () {
  gsap.registerPlugin(ScrollTrigger)
  initScreenshotScrolling()
  initCardIntros()
}

function initScreenshotScrolling () {
  gsap.utils.toArray('.project-previewFrame').forEach(frame => {
    const image = frame.children[0]
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: frame,
        scrub: 2,
        start: 'top center'
      }
    })
    tl.to(image, { yPercent: -70 })
    tl.to(frame, { rotationY: -5 }, 0)
  })
}

function initCardIntros () {
  gsap.utils.toArray('.card').forEach(card => {
    const cardItems = card.querySelectorAll('.card-item')
    const cardImage = card.querySelector('.card-image')
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        toggleActions: 'restart none none pause'
      }
    })
    tl.from(card, {
      y: 50,
      scale: 1.1,
      opacity: 0,
      duration: 1,
      ease: 'power1'
    })
    tl.from(cardImage, {
      x: -50,
      opacity: 0,
      duration: 1.2,
      ease: 'power1'
    }, 0)
    tl.from(cardItems, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power1'
    }, 1)
  })
}

export default init
