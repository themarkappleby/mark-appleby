import * as THREE from 'three'

const lights = []
lights.push(dirLight())
// lights.push(pointLight())
lights.push(ambientLight())

/*
function pointLight () {
  const light = new THREE.PointLight(0xffffff, 0.8)
  light.position.set(4, 5, 4)
  const helper = new THREE.PointLightHelper(light)
  lights.push(helper)
  return light
}
*/

function ambientLight () {
  const light = new THREE.AmbientLight(0xffffff, 0.5)
  return light
}

function dirLight () {
  const light = new THREE.DirectionalLight(0xffffff, 0.5)
  light.position.set(2, 4, 2)
  light.castShadow = true

  const lightHelper = new THREE.DirectionalLightHelper(light, 5)
  lights.push(lightHelper)

  const cameraHelper = new THREE.CameraHelper(light.shadow.camera)
  lights.push(cameraHelper)

  return light
}

export default lights
