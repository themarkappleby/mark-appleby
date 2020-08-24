import gsap from 'gsap'
import motext from 'motext'

function intro (chest) {
  prepHomeText()
  const titleAnimation = motext.init('.home-title', {
    revealAmount: -10,
    revealDuration: 0.5,
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
            duration: 1.5
          })
          gsap.to('.home-text > span > span', {
            delay: 'random(0, 0.7)',
            opacity: 1,
            duration: 'random(0.5, 1.5)'
          })
        }, 3000)
        window.setTimeout(() => {
          gsap.to('.ecobee .hero-horizon', { opacity: 0.1, duration: 3 })
          resolve()
        }, 5500)
        window.setTimeout(() => {
          chest.gotoAndPlay('intro')
          window.state.set('scene', 'intro')
          window.setTimeout(() => {
            document.querySelector('.ecobee .hero-target').style.display = 'block'
          }, 1000)
        }, 4000)
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
