import gsap, { Power1 } from 'gsap'

function init (chest) {
  const transitions = {}

  transitions.intro = instant => {
    if (instant) {
      chest.gotoAndStop('intro', true)
    } else {
      window.setTimeout(() => {
        chest.gotoAndPlay('intro')
      }, 1700)
    }
    var tl = gsap.timeline()
    tl.to('.loading', { opacity: 0, duration: 0 })
    tl.from('.home-title', { opacity: 0, duration: 2 })
    tl.from('.home-text', { opacity: 0, duration: 2 }, '-=0.75')
    tl.from('.ecobee .hero-horizon', { opacity: 0, duration: 2 }, '-=1.5')
    if (instant) tl.totalProgress(1)
    window.state.set('scene', 'intro')
  }

  transitions.ecobee = instant => {
    if (instant) {
      chest.gotoAndStop('ecobee', true)
    } else {
      chest.gotoAndPlay('ecobee')
    }
    var tl = gsap.timeline()
    tl.to('.home', {
      left: '-25%',
      opacity: 0,
      duration: 2,
      ease: Power1.easeOut
    })
    tl.to('.ecobee .hero-chest', {
      left: '-25%',
      marginLeft: 0,
      duration: 2,
      ease: Power1.easeOut
    }, 0)
    tl.to('.ecobee .hero-white', {
      opacity: 0,
      duration: 2,
      ease: Power1.easeOut
    }, 0.5)
    tl.to('.ecobee .hero-title', {
      opacity: 1,
      duration: instant ? 0 : 3,
      ease: Power1.easeOut
    }, instant ? 0 : 2)
    tl.play()
    if (instant) tl.totalProgress(1)
    window.state.set('scene', 'ecobee')
  }

  transitions.audi = instant => {
    chest.gotoAndPlay('audi') // TODO audi
    var tl = gsap.timeline()
    tl.to('.audi .hero-white', {
      opacity: 0,
      duration: 2,
      ease: Power1.easeOut
    }, 0.5)
    tl.to('.audi .hero-title', {
      opacity: 1,
      duration: instant ? 0 : 3,
      ease: Power1.easeOut
    }, instant ? 0 : 2)
    tl.play()
    if (instant) tl.totalProgress(1)
    window.state.set('scene', 'audi')
  }

  return transitions
}

export default init
