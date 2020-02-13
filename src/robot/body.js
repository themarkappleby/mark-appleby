/* global rand */

import * as THREE from 'three'
import materials from '../materials'

export default () => {
  var body = new THREE.Mesh(
    new THREE.BoxGeometry(
      rand(1, 2),
      rand(1, 2),
      rand(1, 2)
    ),
    materials.black
  )
  body.receiveShadow = true
  body.castShadow = true
  return body
}
