import * as THREE from 'three'

function Tube (colour) {
  var tube = new THREE.Group()

  // Create stalk
  var stalk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.15, 0.5, 32),
    colour
  )
  stalk.castShadow = true
  stalk.position.set(0, 1, 0)
  tube.add(stalk)

  // Create base
  var base = new THREE.Mesh(
    new THREE.PlaneGeometry(0.4, 0.4),
    colour
  )
  base.receiveShadow = true
  base.position.set(0, 1.02, 0)
  base.rotation.x = THREE.Math.degToRad(-90)
  tube.add(base)

  return tube
}

export default Tube
