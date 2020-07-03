import gsap from 'gsap'

function init () {
  gsap.utils.toArray('.hero').forEach(hero => {
    const chest = hero.querySelector('.hero-chest')
    gsap.to(chest, {
      yPercent: -20,
      scrollTrigger: {
        trigger: hero,
        scrub: 0.15,
        start: 'top top',
        end: 'bottom top'
      }
    })
  })
}

export default init
