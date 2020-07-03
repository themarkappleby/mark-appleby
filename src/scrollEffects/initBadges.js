import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const played = []
let lottie = null

function init (ref) {
  lottie = ref
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
  if (played.indexOf(section) === -1 && e.progress > 0.3 && e.progress !== 1) {
    played.push(section)
    lottie.play(section)
  }
}

export default init
