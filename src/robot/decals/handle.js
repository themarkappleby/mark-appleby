import * as THREE from 'three'

function Handle (colour) {
  var handle = new THREE.Group()
  handle.name = 'Handle'
  var geometry = new THREE.CylinderGeometry(0.05, 0.05, 0.35, 32)

  // Create bar
  var bar = new THREE.Mesh(geometry, colour)
  bar.position.set(0, 0, 0.13)
  bar.rotation.set(0, 0, THREE.Math.degToRad(90))
  handle.add(bar)

  // Create back bar
  var back = new THREE.Mesh(geometry, colour)
  back.position.set(0, 0, -0.22)
  back.rotation.set(0, 0, THREE.Math.degToRad(90))
  handle.add(back)

  // Create left
  var left = new THREE.Mesh(geometry, colour)
  left.position.set(-0.13, 0, -0.08)
  left.rotation.set(0, THREE.Math.degToRad(90), THREE.Math.degToRad(90))
  handle.add(left)

  // Create right
  var right = new THREE.Mesh(geometry, colour)
  right.position.set(0.13, 0, -0.08)
  right.rotation.set(0, THREE.Math.degToRad(90), THREE.Math.degToRad(90))
  handle.add(right)

  return handle
}

export default Handle
