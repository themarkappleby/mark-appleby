/* global rand */

import * as THREE from 'three'
import * as CANNON from 'cannon'
import materials from '../utils/materials'

export default function Chest () {
  var chest = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1, 1),
    materials.white
  )
  chest.position.set(0, 8, 0)
  chest.rotation.set(
    THREE.Math.degToRad(rand(-10, 10)),
    THREE.Math.degToRad(rand(-35, -30)),
    THREE.Math.degToRad(rand(-10, 10))
  )
  chest.receiveShadow = true
  chest.castShadow = true
  chest.name = 'Chest'

  chest.physics = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(0.75, 0.5, 0.5)),
    mass: 5000
  })
  chest.physics.position.copy(chest.position)
  chest.physics.quaternion.copy(chest.quaternion)

  return chest
}
