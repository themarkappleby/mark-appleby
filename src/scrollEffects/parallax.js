import gsap from 'gsap'

function init () {
  gsap.utils.toArray('.hero').forEach(hero => {
    const title = hero.querySelector('.hero-title')
    const horizon = hero.querySelector('.hero-horizon')
    const chest = hero.querySelector('.hero-chest')
    const scrollTrigger = {
      trigger: hero,
      scrub: 0.25,
      start: 'top top',
      end: 'bottom top'
    }
    gsap.to(horizon, { yPercent: -30, scrollTrigger })
    gsap.to(title, { yPercent: -70, scrollTrigger })
    gsap.to(chest, { yPercent: -30, scrollTrigger })
  })
}

export default init
