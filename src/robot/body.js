import * as THREE from 'three'
import materials from '../utils/materials'

export default (width, height, depth) => {
  var body = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    materials.black
  )
  body.receiveShadow = true
  body.castShadow = true
  return body
}
