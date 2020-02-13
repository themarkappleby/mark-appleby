import * as THREE from 'three'
import materials from '../../utils/materials'

function Light () {
  var light = new THREE.Group()
  light.name = 'Light'

  // Create bulb
  var bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 32, 32),
    materials.glass
  )
  light.add(bulb)

  // Create ring
  var ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.1, 0.04, 6, 16),
    materials.glass
  )
  light.add(ring)

  return light
}

export default Light
