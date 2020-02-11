import * as THREE from 'three'

const lights = []
lights.push(dirLight())
lights.push(ambientLight())

function ambientLight () {
  const light = new THREE.AmbientLight(0xffffff, 0.5)
  return light
}

function dirLight () {
  const light = new THREE.DirectionalLight(0xffffff, 0.6)
  light.position.set(2, 4, 2)
  light.castShadow = true
  light.shadow.camera.left = -1.5
  light.shadow.camera.right = 1.5
  light.shadow.camera.top = 1.5
  light.shadow.camera.bottom = -1.5
  console.log(light.shadow.camera)

  /*
  const cameraHelper = new THREE.CameraHelper(light.shadow.camera)
  lights.push(cameraHelper)
  */

  return light
}

export default lights
