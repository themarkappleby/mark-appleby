import * as THREE from 'three'
import materials from './materials'

const objects = []
objects.push(addCube())
objects.push(addEnv())

function addCube () {
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

function addEnv () {
  var geometry = new THREE.PlaneGeometry(10, 10)

  var backWall = new THREE.Mesh(geometry, materials.grey)
  backWall.position.z = -5
  backWall.position.y = 5
  objects.push(backWall)

  var frontWall = new THREE.Mesh(geometry, materials.grey)
  frontWall.position.z = 5
  frontWall.position.y = 5
  frontWall.rotation.y = THREE.Math.degToRad(180)
  objects.push(frontWall)

  var leftWall = new THREE.Mesh(geometry, materials.grey)
  leftWall.position.x = -5
  leftWall.position.y = 5
  leftWall.rotation.y = THREE.Math.degToRad(90)
  objects.push(leftWall)

  var rightWall = new THREE.Mesh(geometry, materials.grey)
  rightWall.position.x = 5
  rightWall.position.y = 5
  rightWall.rotation.y = THREE.Math.degToRad(-90)
  objects.push(rightWall)

  var floor = new THREE.Mesh(geometry, materials.grey)
  floor.rotation.x = THREE.Math.degToRad(-90)
  floor.receiveShadow = true
  return floor
}

export default objects
