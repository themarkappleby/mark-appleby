import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getNextScene } from '../utils'

function init (section) {
  ScrollTrigger.create({
    trigger: `.${section} .hero-chest`,
    onEnterBack: moveChest
  })
  const nextSection = getNextScene()
  if (nextSection) {
    ScrollTrigger.create({
      trigger: `.${nextSection} .hero-chest`,
      onEnter: moveChest
    })
  }
}

function moveChest (e) {
  const el = e.trigger
  const chest = window.chest
  const particles = window.particles
  const section = el.closest('.section').dataset.section
  el.appendChild(chest.canvas)
  chest.resize()
  if (particles) {
    el.closest('.hero').querySelector('.hero-particles').appendChild(particles.canvas)
  }
  if (section === window.state.scene) {
    chest.setWeight(window.state.scene, 1)
    if (particles) {
      particles.updateColors(section)
    }
  } else {
    chest.setWeight(window.state.scene, 0)
    if (particles) {
      particles.updateColors('default')
    }
  }
}

export default init
