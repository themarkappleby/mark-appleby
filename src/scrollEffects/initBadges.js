import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const played = []

function init () {
  gsap.utils.toArray('.badges-wrapper').forEach(wrapper => {
    ScrollTrigger.create({
      trigger: wrapper,
      onUpdate: update,
      onEnter: update,
      onEnterBack: update
    })
  })
}

function update (e) {
  const el = e.trigger
  const section = el.closest('.section').dataset.section
  if (el.children.length === 0) {
    const badges = document.querySelector('.badges')
    el.appendChild(badges)
  }
  const animationName = el.dataset.play
  if (shouldPlayAnimation(e, animationName)) {
    played.push(animationName)
    window.lottie.play(animationName)
    gsap.to(`.badge--${animationName} .badge-label`, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      delay: 0.5
    })
  }
}

function shouldPlayAnimation (e, animationName) {
  return played.indexOf(animationName) === -1 && e.progress > 0.2 && e.progress !== 1 && animationName === window.state.scene
}

export default init
