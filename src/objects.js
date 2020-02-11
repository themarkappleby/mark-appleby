import * as THREE from 'three'

const objects = []
objects.push(addCube())
objects.push(addEnv())

function addCube () {
  var geometry = new THREE.BoxGeometry(1, 1, 1)
  var material = new THREE.MeshLambertMaterial({ color: 0x0000ff })
  var cube = new THREE.Mesh(geometry, material)
  cube.position.y = 0.51
  cube.castShadow = true
  return cube
}

function addEnv () {
  var geometry = new THREE.PlaneGeometry(10, 10)
  var material = new THREE.MeshLambertMaterial({
    color: 0xeeeeee
    // side: THREE.DoubleSide
  })

  var backWall = new THREE.Mesh(geometry, material)
  backWall.position.z = -5
  backWall.position.y = 5
  objects.push(backWall)

  var frontWall = new THREE.Mesh(geometry, material)
  frontWall.position.z = 5
  frontWall.position.y = 5
  frontWall.rotation.y = THREE.Math.degToRad(180)
  objects.push(frontWall)

  var leftWall = new THREE.Mesh(geometry, material)
  leftWall.position.x = -5
  leftWall.position.y = 5
  leftWall.rotation.y = THREE.Math.degToRad(90)
  objects.push(leftWall)

  var rightWall = new THREE.Mesh(geometry, material)
  rightWall.position.x = 5
  rightWall.position.y = 5
  rightWall.rotation.y = THREE.Math.degToRad(-90)
  objects.push(rightWall)

  var floor = new THREE.Mesh(geometry, material)
  floor.rotation.x = THREE.Math.degToRad(-90)
  floor.receiveShadow = true
  return floor
}

export default objects
