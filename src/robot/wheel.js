/* global rand */

import * as THREE from 'three'
import * as CANNON from 'cannon'

export default (colour) => {
  const radius = rand(0.1, 0.6)
  const thickness = rand(0.1, 0.4)
  var wheel = new THREE.Group()
  wheel.name = 'Wheel'

  var distance = rand(thickness, thickness * 2)

  // Create tire
  var tire = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, thickness, 32),
    colour
  )
  tire.position.set(0, 0, distance)
  tire.rotation.set(THREE.Math.degToRad(90), 0, 0)
  tire.receiveShadow = true
  tire.castShadow = true
  tire.name = 'Tire'
  tire.physics = new CANNON.Body({
    shape: new CANNON.Cylinder(radius, radius, thickness, 32),
    mass: 30,
    velocity: new CANNON.Vec3(5, 5, 5)
  })
  // tire.physics.position.copy(tire.position)
  // tire.physics.quaternion.copy(tire.quaternion)
  wheel.add(tire)

  // Create axle
  var axleRadius = radius / rand(5, 10)
  var axle = new THREE.Mesh(
    new THREE.CylinderGeometry(axleRadius, axleRadius, distance, 32),
    colour
  )
  axle.position.set(0, 0, distance / 2)
  axle.rotation.set(THREE.Math.degToRad(90), 0, 0)
  axle.castShadow = true
  axle.name = 'Axle'
  wheel.add(axle)

  // Create rotation indicator
  var rotationIndicator = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, (radius * 2) - 0.1, 0.05),
    colour
  )
  rotationIndicator.position.set(0, 0, distance + thickness / 2)
  rotationIndicator.castShadow = true
  rotationIndicator.name = 'Rotation Indicator'
  wheel.add(rotationIndicator)

  return wheel
}
