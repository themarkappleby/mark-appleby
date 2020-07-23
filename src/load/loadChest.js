/* global window */

import initChest from '../misc/chest'
import { addProgress } from './progress'

function loadChest (progress, chestClickHandler, chestMouseoverHandler) {
  return initChest({
    file: 'assets/chest.glb',
    container: document.querySelector('.ecobee .hero-chest')
  }).then(data => {
    window.chest = data
    addProgress(progress)
  })
}

export default loadChest
