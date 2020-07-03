/* global window */

import initChest from '../chest'
import { addProgress } from './progress'

function loadChest (chestClickHandler, chestMouseoverHandler) {
  return initChest({
    file: 'assets/chest.glb',
    container: document.querySelector('.ecobee .hero-chest'),
    onClick: chestClickHandler,
    onMouseover: chestMouseoverHandler
  }).then(data => {
    window.chest = data
    addProgress(60)
  })
}

export default loadChest
