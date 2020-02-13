import * as THREE from 'three'

function Tube (colour) {
  var tube = new THREE.Group()

  // Create stalk
  var stalk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.15, 0.5, 32),
    colour
  )
  stalk.castShadow = true
  // stalk.position.set(0, 1, 0)
  stalk.rotation.x = THREE.Math.degToRad(-90)
  tube.add(stalk)

  // Create base
  var base = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.4, 0.01),
    colour
  )
  base.receiveShadow = true
  tube.add(base)

  return tube
}

export default Tube
