import initHeroParticles from './initHeroParticles'
import initLogoParticles from './initLogoParticles'

function init ({ heroEl, logoEl }) {
  initLogoParticles(logoEl)
  return initHeroParticles(heroEl)
}

export default init
