import gsap from 'gsap'
import motext from 'motext'

function intro (chest) {
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
          gsap.to('.home-text', { opacity: 1, duration: 3 })
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

export default intro
