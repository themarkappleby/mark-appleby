import initIntro from './initIntro'
import initEcobee from './initEcobee'
import initAudi from './initAudi'
import initWorldvision from './initWorldvision'
import initContact from './initContact'

function init () {
  const chest = window.chest
  const transitions = {}
  transitions.intro = initIntro(chest)
  transitions.ecobee = initEcobee(chest)
  transitions.audi = initAudi(chest)
  transitions.worldvision = initWorldvision(chest)
  transitions.contact = initContact(chest)
  return transitions
}

export default init
