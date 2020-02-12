import * as THREE from 'three'
import * as CANNON from 'cannon'
import materials from './materials'
import robot from './robot'

const objects = []
// objects.push(addCube())
objects.push(addEnv())
objects.push(robot())

function addEnv () {
  const size = 30
  var geometry = new THREE.PlaneGeometry(size, size)

  var backWall = new THREE.Mesh(geometry, materials.grey)
  backWall.position.z = size / -2
  backWall.position.y = size / 2
  objects.push(backWall)

  var frontWall = new THREE.Mesh(geometry, materials.grey)
  frontWall.position.z = size / 2
  frontWall.position.y = size / 2
  frontWall.rotation.y = THREE.Math.degToRad(180)
  objects.push(frontWall)

  var leftWall = new THREE.Mesh(geometry, materials.grey)
  leftWall.position.x = size / -2
  leftWall.position.y = size / 2
  leftWall.rotation.y = THREE.Math.degToRad(90)
  objects.push(leftWall)

  var rightWall = new THREE.Mesh(geometry, materials.grey)
  rightWall.position.x = size / 2
  rightWall.position.y = size / 2
  rightWall.rotation.y = THREE.Math.degToRad(-90)
  objects.push(rightWall)

  var floor = new THREE.Mesh(geometry, materials.grey)
  floor.rotation.x = THREE.Math.degToRad(-90)
  floor.receiveShadow = true
  floor.physics = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(
      size / 2,
      size / 2,
      0.1
    )),
    mass: 0
  })
  floor.physics.position.set(0, -0.1, 0)
  floor.physics.quaternion.copy(floor.quaternion)

  return floor
}

function addCube () {
  // Add Cannon test cube
  var cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshLambertMaterial({ color: '#eeb92f' })
  )
  cube.position.set(0, 3, 0)
  cube.castShadow = true
  cube.physics = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(0.25, 0.25, 0.25)),
    mass: 30,
    angularVelocity: new CANNON.Vec3(5, 2, 1),
    angularDamping: 0.5
  })
  cube.physics.position.copy(cube.position)
  cube.physics.quaternion.copy(cube.quaternion)
  return cube
}

/*
function addRobot () {
  var body = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    materials.black
  )
  body.position.y = 0.51
  body.receiveShadow = true
  body.castShadow = true

  var light = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 32, 32),
    materials.glass
  )
  light.position.set(0, 0.5, 0.5)
  objects.push(light)

  var torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.1, 0.04, 6, 16),
    materials.glass
  )
  torus.position.set(0, 0.5, 0.5)
  objects.push(torus)

  var tube = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.15, 0.5, 32),
    materials.yellow
  )
  tube.castShadow = true
  tube.position.set(0, 1, 0)
  objects.push(tube)

  var tubeBase = new THREE.Mesh(
    new THREE.PlaneGeometry(0.4, 0.4),
    materials.yellow
  )
  tubeBase.receiveShadow = true
  tubeBase.position.set(0, 1.02, 0)
  tubeBase.rotation.x = THREE.Math.degToRad(-90)
  objects.push(tubeBase)

  return body
}
*/

export default objects
