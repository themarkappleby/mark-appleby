/* global rand */

import * as THREE from 'three'
import materials from '../materials'

export default () => {
  var body = new THREE.Mesh(
    new THREE.BoxGeometry(
      3, 2, 1
      /*
      rand(0.5, 1.5),
      rand(0.5, 1.5),
      rand(0.5, 1.5)
      */
    ),
    materials.black
  )
  body.receiveShadow = true
  body.castShadow = true
  return body
}
