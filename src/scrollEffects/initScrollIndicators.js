import gsap from 'gsap'

function init () {
  gsap.utils.toArray('.hero-scrollArrow').forEach(scroll => {
    gsap.to(scroll, {
      opacity: 0,
      scrollTrigger: {
        trigger: scroll,
        scrub: true,
        end: 'bottom center'
      }
    })
  })
}

export default init
