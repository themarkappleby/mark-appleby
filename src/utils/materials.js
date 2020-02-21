/* global debug */

import * as THREE from 'three'

const materials = {
  colours: {
    yellow: new THREE.MeshLambertMaterial({ color: '#eeb92f' }),
    blue: new THREE.MeshLambertMaterial({ color: '#02408a' }),
    green: new THREE.MeshLambertMaterial({ color: '#05706f' }),
    red: new THREE.MeshLambertMaterial({ color: '#df493f' })
  },
  grey: new THREE.MeshLambertMaterial({ color: '#eeeeee' }),
  black: new THREE.MeshLambertMaterial({ color: '#1d1c21', wireframe: debug }),
  white: new THREE.MeshLambertMaterial({ color: '#ffffff', wireframe: debug }),
  toon: new THREE.MeshToonMaterial({ color: '#ffffff', wireframe: debug }),
  glass: new THREE.MeshPhongMaterial({ color: '#e7e9f1', shininess: 500 })
}

export default materials
