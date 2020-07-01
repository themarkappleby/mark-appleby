import gsap, { Power1 } from 'gsap'
import motext from 'motext'
import Rellax from 'rellax'

const rellax = Rellax('.rellax', {
  center: true
})

function init (chest) {
  const transitions = {}

  const titleAnimation = motext.init('.home-title', {
    strokeWidth: 7,
    strokeLinejoin: 'miter',
    revealAmount: -10,
    revealEase: 'power4',
    staggerAmount: 0.03
  })

  transitions.intro = () => {
    return new Promise(resolve => {
      gsap.to('.progress', {
        height: 1,
        width: 300,
        opacity: 0,
        duration: 2.5,
        ease: 'power4.inOut'
      }).then(() => {
        const loading = document.querySelector('.loading')
        loading.parentNode.removeChild(loading)
        titleAnimation.play()
        window.setTimeout(() => {
          gsap.to('.home-text', { opacity: 1, duration: 3 })
        }, 1300)
        window.setTimeout(() => {
          gsap.to('.ecobee .hero-horizon', { opacity: 0.1, duration: 2.5 })
          resolve()
        }, 3500)
        window.setTimeout(() => {
          chest.gotoAndPlay('intro')
          window.state.set('scene', 'intro')
        }, 2500)
      })
    })
  }

  transitions.ecobee = () => {
    chest.gotoAndPlay('ecobee')
    window.setTimeout(() => {
      show('.ecobee .section-content')
      show('.audi .hero')
      rellax.refresh()
    }, 1500)
    var tl = gsap.timeline()
    tl.to('.home-copy', {
      opacity: 0,
      duration: 1
    })
    tl.to('.home', {
      left: '-25%',
      opacity: 0,
      duration: 2,
      ease: Power1.easeOut
    }, 0)
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
      duration: 3,
      ease: Power1.easeOut
    }, 2)
    tl.play()
    window.state.set('scene', 'ecobee')
  }

  transitions.audi = () => {
    scrollTo(document.body.scrollHeight, () => {
      window.setTimeout(() => {
        hide('.ecobee .hero')
        hide('.ecobee .section-content')
        show('.audi .section-content')
        show('.worldvision .hero')
        rellax.refresh()
      }, 2000)
      chest.gotoAndPlay('audi')
      var tl = gsap.timeline()
      tl.to('.audi .hero-white', {
        opacity: 0,
        duration: 2,
        ease: Power1.easeOut
      }, 0.5)
      tl.to('.audi .hero-title', {
        opacity: 1,
        duration: 3,
        ease: Power1.easeOut
      }, 2)
      tl.play()
      window.state.set('scene', 'audi')
    })
  }

  transitions.worldvision = () => {
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
        duration: 3,
        ease: Power1.easeOut
      }, 2)
      tl.play()
      window.state.set('scene', 'worldvision')
    })
  }

  transitions.contact = () => {
    scrollTo(document.body.scrollHeight, () => {
      hide('.worldvision .hero')
      hide('.worldvision .section-content')
      show('.contact .section-content')
      show('.footer')
      rellax.refresh()
      chest.gotoAndPlay('contact')
      var tl = gsap.timeline()
      tl.to('.contact .hero-white', {
        opacity: 0,
        duration: 2,
        ease: Power1.easeOut
      }, 0.5)
      tl.to('.contact .hero-title', {
        opacity: 1,
        duration: 3,
        ease: Power1.easeOut
      }, 2)
      tl.play()
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
