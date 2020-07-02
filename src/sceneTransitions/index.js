import initIntro from './intro'
import initEcobee from './ecobee'
import initAudi from './audi'
import initWorldvision from './worldvision'
import initContact from './contact'

function init (chest) {
  const transitions = {}
  transitions.intro = initIntro(chest)
  transitions.ecobee = initEcobee(chest)
  transitions.audi = initAudi(chest)
  transitions.worldvision = initWorldvision(chest)
  transitions.contact = initContact(chest)
  return transitions
}

export default init
