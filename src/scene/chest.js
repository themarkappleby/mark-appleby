import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as CANNON from 'cannon'
import { materials, rand } from '../utils'

var loader = new GLTFLoader()

export default function loadChest (cb) {
  loader.load(
    'assets/chest.glb',
    function (gltf) {
      var chest = new THREE.Group()

      var base = new THREE.Mesh(
        gltf.scene.children[0].geometry,
        materials.white
      )
      base.receiveShadow = true
      base.castShadow = true

      var outline = new THREE.Mesh(
        gltf.scene.children[0].geometry,
        materials.outline
      )
      var scale = 1.03
      outline.scale.set(scale, scale, scale)
      chest.add(outline)

      chest.scale.set(0.5, 0.5, 0.5)
      chest.name = 'Chest'
      chest.position.set(0, 8, 0)
      chest.rotation.set(
        THREE.Math.degToRad(rand(-10, 10)),
        THREE.Math.degToRad(rand(-35, -30)),
        THREE.Math.degToRad(rand(-10, 10))
      )
      chest.add(base)

      initPhysics(chest)

      cb(chest)
    }
  )
}

function initPhysics (mesh) {
  var bounds = new THREE.Box3().setFromObject(mesh).max

  // var bounds = mesh.geometry.boundingBox.max
  var x = bounds.x / 2
  var y = bounds.y / 30
  var z = bounds.z / 2
  console.log('bounds', bounds)

  mesh.physics = new CANNON.Body({
    // shape: new CANNON.Box(new CANNON.Vec3(0.75, 0.5, 0.5)),
    shape: new CANNON.Box(new CANNON.Vec3(x, y, z)),
    mass: 5000
  })
  mesh.physics.position.copy(mesh.position)
  mesh.physics.quaternion.copy(mesh.quaternion)
}

/*
export function ChestOld () {
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
*/
