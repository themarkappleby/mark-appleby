import Lottie from 'lottie-web'
import { addProgress } from './progress'

function loadLottie (progress) {
  return new Promise(resolve => {
    [
      {
        name: 'appleby',
        assetPath: 'logos/appleby.json',
        selector: '.footer-logo'
      }, {
        name: 'ecobee',
        assetPath: 'ecobee-badge.json',
        selector: '.badge--ecobee'
      }, {
        name: 'audi',
        assetPath: 'audi-badge.json',
        selector: '.badge--audi'
      }, {
        name: 'worldvision',
        assetPath: 'worldvision-badge.json',
        selector: '.badge--worldvision'
      }
    ].forEach(({ name, assetPath, selector }) => {
      Lottie.loadAnimation({
        name,
        container: document.querySelector(selector),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '/assets/' + assetPath
      })
    })
    window.lottie = Lottie
    addProgress(progress)
    resolve()
  })
}

export default loadLottie
