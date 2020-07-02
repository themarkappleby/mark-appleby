import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

function init () {
  gsap.registerPlugin(ScrollTrigger)
  initScreenshotScrolling()
}

function initScreenshotScrolling () {
  gsap.utils.toArray('.project-previewFrame').forEach(frame => {
    const image = frame.children[0]
    console.dir(frame)
    console.log(image)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: frame,
        markers: true,
        scrub: 2,
        start: 'top center'
      }
    })
    tl.to(image, {
      yPercent: -70,
      ease: 'none'
    })
    tl.to(frame, {
      rotationY: -5
    }, 0)
  })
}

/*
gsap.utils.toArray('.card-item').forEach((cardItem, i) => {
  gsap.from(cardItem, {
    opacity: 0,
    scrollTrigger: {
      id: 'card-item-' + i,
      markers: true,
      trigger: cardItem,
      start: 'top bottom',
      end: 'top center',
      scrub: true
    }
  })
})
*/

export default init
