/* global debug */

import * as THREE from 'three'

const materials = {
  black: new THREE.MeshLambertMaterial({ color: '#1d1c21', wireframe: debug }),
  yellow: new THREE.MeshLambertMaterial({ color: '#eeb92f' }),
  blue: new THREE.MeshLambertMaterial({ color: '#02408a' }),
  green: new THREE.MeshLambertMaterial({ color: '#05706f' }),
  red: new THREE.MeshLambertMaterial({ color: '#df493f' }),
  glass: new THREE.MeshPhongMaterial({ color: '#e7e9f1', shininess: 500 }),
  grey: new THREE.MeshLambertMaterial({ color: '#a2a3a5' })
}

export default materials
