import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const played = []

function init (section) {
  gsap.utils.toArray(`.${section} .badges-wrapper`).forEach(wrapper => {
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
  if (shouldPlayAnimation(e, section)) {
    played.push(section)
    window.lottie.play(section)
    gsap.to(`.badge--${section} .badge-label`, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      delay: 0.5
    })
  }
}

function shouldPlayAnimation (e, section) {
  return played.indexOf(section) === -1 && e.progress > 0.2 && e.progress !== 1 && section === window.state.scene
}

export default init
