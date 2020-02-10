import * as THREE from 'three'

const lights = []

function addDirLight () {
  var dirLight = new THREE.DirectionalLight(0xffffff, 100)
  dirLight.position.y = 200
  lights.push(dirLight)

  var helper = new THREE.DirectionalLightHelper(dirLight, 5)
  lights.push(helper)
}
addDirLight()

export default lights
