import * as THREE from 'three'
import * as CANNON from 'cannon'
import { materials } from '../utils'

export default function Stage (size = 40) {
  var stage = new THREE.Group()
  stage.name = 'Stage'

  var geometry = new THREE.PlaneGeometry(size, size)

  var backWall = new THREE.Mesh(geometry, materials.white)
  backWall.position.z = size / -2
  backWall.position.y = size / 2
  stage.add(backWall)

  var frontWall = new THREE.Mesh(geometry, materials.white)
  frontWall.position.z = size / 2
  frontWall.position.y = size / 2
  frontWall.rotation.y = THREE.Math.degToRad(180)
  stage.add(frontWall)

  var leftWall = new THREE.Mesh(geometry, materials.white)
  leftWall.position.x = size / -2
  leftWall.position.y = size / 2
  leftWall.rotation.y = THREE.Math.degToRad(90)
  stage.add(leftWall)

  var rightWall = new THREE.Mesh(geometry, materials.white)
  rightWall.position.x = size / 2
  rightWall.position.y = size / 2
  rightWall.rotation.y = THREE.Math.degToRad(-90)
  stage.add(rightWall)

  var ceil = new THREE.Mesh(geometry, materials.white)
  ceil.rotation.x = THREE.Math.degToRad(90)
  ceil.position.y = size / 2
  stage.add(ceil)

  var floor = new THREE.Mesh(geometry, materials.white)
  floor.rotation.x = THREE.Math.degToRad(-90)
  floor.receiveShadow = true
  stage.physics = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(
      size / 2,
      size / 2,
      0.1
    )),
    mass: 0
  })
  stage.physics.position.set(0, -0.1, 0)
  stage.physics.quaternion.copy(floor.quaternion)
  stage.add(floor)

  return stage
}
