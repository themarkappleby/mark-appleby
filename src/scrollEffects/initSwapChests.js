import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getNextScene } from '../utils'

function init (section) {
  gsap.utils.toArray('.hero-chest').forEach(hero => {
    ScrollTrigger.create({
      trigger: hero,
      onEnter: moveChest,
      onEnterBack: moveChest
    })
  })
}

function moveChest (e) {
  const el = e.trigger
  const chest = window.chest
  const particles = window.particles
  const section = el.closest('.section').dataset.section
  if (shouldApplySwap(e, section, chest)) {
    el.appendChild(chest.canvas)
    chest.resize()
    if (particles) {
      el.closest('.hero').querySelector('.hero-particles').appendChild(particles.canvas)
    }
    if (section === window.state.scene) {
      chest.setWeight(window.state.scene, 1)
    } else {
      chest.setWeight(window.state.scene, 0)
    }
  }
}

function shouldApplySwap (e, section, chest) {
  return (section === window.state.scene || section === getNextScene()) && chest && e.progress > 0 && e.progress < 1
}

export default init
