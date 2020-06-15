import gsap, { Power1 } from 'gsap'
import Rellax from 'rellax'

const rellax = Rellax('.rellax', {
  center: true
})

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
      show('.ecobee .section-content')
      show('.audi .hero')
      rellax.refresh()
    } else {
      chest.gotoAndPlay('ecobee')
      window.setTimeout(() => {
        show('.ecobee .section-content')
        show('.audi .hero')
        rellax.refresh()
      }, 1500)
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
    scrollTo(document.body.scrollHeight, () => {
      if (instant) {
        hide('.ecobee .hero')
        hide('.ecobee .section-content')
        show('.audi .section-content')
        show('.worldvision .hero')
        rellax.refresh()
      } else {
        window.setTimeout(() => {
          hide('.ecobee .hero')
          hide('.ecobee .section-content')
          show('.audi .section-content')
          show('.worldvision .hero')
          rellax.refresh()
        }, 2000)
      }
      chest.gotoAndPlay('audi')
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
    })
  }

  transitions.worldvision = instant => {
    scrollTo(document.body.scrollHeight, () => {
      hide('.audi .hero')
      hide('.audi .section-content')
      show('.worldvision .section-content')
      show('.contact .hero')
      rellax.refresh()
      chest.gotoAndPlay('worldvision')
      var tl = gsap.timeline()
      tl.to('.worldvision .hero-white', {
        opacity: 0,
        duration: 2,
        ease: Power1.easeOut
      }, 0.5)
      tl.to('.worldvision .hero-title', {
        opacity: 1,
        duration: instant ? 0 : 3,
        ease: Power1.easeOut
      }, instant ? 0 : 2)
      tl.play()
      if (instant) tl.totalProgress(1)
      window.state.set('scene', 'worldvision')
    })
  }

  transitions.contact = instant => {
    scrollTo(document.body.scrollHeight, () => {
      hide('.worldvision .hero')
      hide('.worldvision .section-content')
      show('.contact .section-content')
      show('.footer')
      // chest.gotoAndPlay('contact') // TODO contact
      var tl = gsap.timeline()
      tl.to('.contact .hero-white', {
        opacity: 0,
        duration: 2,
        ease: Power1.easeOut
      }, 0.5)
      tl.to('.contact .hero-title', {
        opacity: 1,
        duration: instant ? 0 : 3,
        ease: Power1.easeOut
      }, instant ? 0 : 2)
      tl.play()
      if (instant) tl.totalProgress(1)
      window.state.set('scene', 'contact')
    })
  }

  return transitions
}

function show (elem) {
  document.querySelector(elem).classList.remove('hide')
}

function hide (elem) {
  document.querySelector(elem).classList.add('hide')
}

// Ref: https://stackoverflow.com/a/55686711/918060
function scrollTo (offset, cb) {
  function onScroll () {
    const end = window.pageYOffset + window.innerHeight
    if (offset === end) {
      window.removeEventListener('scroll', onScroll)
      window.setTimeout(cb)
    }
  }
  window.addEventListener('scroll', onScroll)
  onScroll()
  window.scrollTo({
    top: offset,
    behavior: 'smooth'
  })
}

export default init
