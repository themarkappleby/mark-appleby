import gsap from 'gsap'
import motext from 'motext'

function intro (chest) {
  prepHomeText()
  const titleAnimation = motext.init('.home-title', {
    strokeWidth: 7,
    revealAmount: -10,
    revealEase: 'power4',
    staggerAmount: 0.03
  })
  return () => {
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
          gsap.to('.home-text > a', {
            opacity: 1,
            duration: 6
          })
          gsap.to('.home-text > span > span', {
            delay: 'random(0, 1.2)',
            opacity: 1,
            duration: 'random(3, 6)'
          })
        }, 1300)
        window.setTimeout(() => {
          gsap.to('.ecobee .hero-horizon', { opacity: 0.1, duration: 2.5 })
          resolve()
        }, 3500)
        window.setTimeout(() => {
          chest.gotoAndPlay('intro')
          window.state.set('scene', 'intro')
          window.setTimeout(() => {
            document.querySelector('.ecobee .hero-target').style.display = 'block'
          }, 1000)
        }, 2500)
      })
    })
  }
}

function prepHomeText () {
  const el = gsap.utils.toArray(document.querySelectorAll('.home-text > span'))
  el.forEach(span => {
    let newHTML = ''
    const text = span.innerHTML.split('')
    text.forEach(char => {
      newHTML += `<span aria-hidden="true">${char}</span>`
    })
    span.innerHTML = newHTML
  })
}

export default intro
