import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getNextScene } from '../utils'

function initScrollTrigger (chest, particles) {
  gsap.utils.toArray('.hero-chest').forEach(hero => {
    ScrollTrigger.create({
      trigger: hero,
      onEnter: self => {
        moveChest(self, chest, particles)
      },
      onEnterBack: self => {
        moveChest(self, chest, particles)
      }
    })
  })
}

function moveChest (e, chest, particles) {
  const el = e.trigger
  const section = el.closest('.section').dataset.section
  if (shouldApplySwap(e, section, chest, particles)) {
    el.appendChild(chest.canvas)
    chest.resize()
    el.parentElement.querySelector('.hero-particles').appendChild(particles.canvas)
    if (section === window.state.scene) {
      chest.setWeight(window.state.scene, 1)
    } else {
      chest.setWeight(window.state.scene, 0)
    }
  }
}

function shouldApplySwap (e, section, chest, particles) {
  return (section === window.state.scene || section === getNextScene()) && chest && particles && e.progress > 0 && e.progress < 1
}

export default initScrollTrigger
