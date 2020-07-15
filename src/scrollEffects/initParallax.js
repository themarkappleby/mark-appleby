import gsap from 'gsap'

function init (section) {
  if (window.width > 960) {
    gsap.utils.toArray(`.${section} .hero`).forEach(hero => {
      const chest = hero.querySelector('.hero-chest')
      gsap.to(chest, {
        yPercent: -70,
        scrollTrigger: {
          trigger: hero,
          scrub: 0.15,
          start: 'top top',
          end: 'bottom top'
        }
      })
    })
  }
}

export default init
