/* global debug */

import * as THREE from 'three'

const lights = []
lights.push(dirLight())
lights.push(ambientLight())

function ambientLight () {
  const light = new THREE.AmbientLight(0xffffff, 0.7)
  return light
}

function dirLight () {
  const shadowMapSize = 5
  const light = new THREE.DirectionalLight(0xffffff, 0.3)
  light.position.set(2, 4, 2)
  light.castShadow = true
  light.shadow.radius = 3
  light.shadow.camera.left = shadowMapSize * -1
  light.shadow.camera.right = shadowMapSize
  light.shadow.camera.top = shadowMapSize
  light.shadow.camera.bottom = shadowMapSize * -1

  if (debug) {
    const cameraHelper = new THREE.CameraHelper(light.shadow.camera)
    lights.push(cameraHelper)
  }

  return light
}

export default lights
