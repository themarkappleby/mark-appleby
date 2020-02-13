/* global rand */

import * as THREE from 'three'

export default (radius, thickness, colour) => {
  var group = new THREE.Group()

  var distance = rand(thickness, thickness * 2)

  // Create wheel
  var wheel = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, thickness, 32),
    colour
  )
  wheel.position.set(0, 0, distance)
  wheel.rotation.set(THREE.Math.degToRad(90), 0, 0)
  wheel.receiveShadow = true
  wheel.castShadow = true
  group.add(wheel)

  var axleRadius = radius / rand(5, 10)
  var axle = new THREE.Mesh(
    new THREE.CylinderGeometry(axleRadius, axleRadius, distance, 32),
    colour
  )
  axle.position.set(0, 0, distance / 2)
  axle.rotation.set(THREE.Math.degToRad(90), 0, 0)
  axle.castShadow = true
  group.add(axle)

  var rotationIndicator = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, (radius * 2) - 0.1, 0.05),
    colour
  )
  rotationIndicator.position.set(0, 0, distance + thickness / 2)
  rotationIndicator.castShadow = true
  group.add(rotationIndicator)

  return group
}
