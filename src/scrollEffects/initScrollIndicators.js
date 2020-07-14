import gsap from 'gsap'

function init (section) {
  gsap.utils.toArray(`.${section} .hero-scrollArrow`).forEach(scroll => {
    gsap.to(scroll, {
      opacity: 0,
      scrollTrigger: {
        trigger: scroll,
        scrub: true,
        end: 'bottom center',
        start: 'top 65%'
      }
    })
  })
}

export default init
