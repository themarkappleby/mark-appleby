/* global debug */

import * as THREE from 'three'

const outline = new THREE.MeshLambertMaterial({
  color: 'black',
  side: THREE.BackSide
})
outline.onBeforeCompile = (shader) => {
  const token = '#include <begin_vertex>'
  const customTransform = `
      vec3 transformed = position + objectNormal*0.02;
  `
  shader.vertexShader = shader.vertexShader.replace(token, customTransform)
}

const materials = {
  outline,
  colours: {
    yellow: new THREE.MeshLambertMaterial({ color: '#eeb92f' }),
    blue: new THREE.MeshLambertMaterial({ color: '#02408a' }),
    green: new THREE.MeshLambertMaterial({ color: '#05706f' }),
    red: new THREE.MeshLambertMaterial({ color: '#df493f' })
  },
  grey: new THREE.MeshLambertMaterial({ color: '#eeeeee' }),
  black: new THREE.MeshLambertMaterial({ color: '#1d1c21' }),
  white: new THREE.MeshLambertMaterial({
    color: '#ffffff',
    side: THREE.DoubleSide
  }),
  toon: new THREE.MeshToonMaterial({ color: '#ffffff', wireframe: debug }),
  glass: new THREE.MeshPhongMaterial({ color: '#e7e9f1', shininess: 500 })
}

export default materials
