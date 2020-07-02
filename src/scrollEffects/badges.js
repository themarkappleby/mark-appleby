import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function init () {
  gsap.utils.toArray('.badges-wrapper').forEach(wrapper => {
    ScrollTrigger.create({
      trigger: wrapper,
      onEnter: update,
      onEnterBack: update
    })
  })
}

function update (e) {
  const el = e.trigger
  if (el.children.length === 0) {
    const badges = document.querySelector('.badges')
    el.appendChild(badges)
  }
}

export default init
