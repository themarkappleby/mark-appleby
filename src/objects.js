import * as THREE from 'three'

const objects = [
  addCube(),
  addPlane()
]

function addCube () {
  var geometry = new THREE.BoxGeometry(1, 1, 1)
  var material = new THREE.MeshLambertMaterial({ color: 0x0000ff })
  var cube = new THREE.Mesh(geometry, material)
  cube.position.y = 0.51
  return cube
}

function addPlane () {
  var geometry = new THREE.PlaneGeometry(50, 50)
  var material = new THREE.MeshBasicMaterial({
    color: 0xeeeeee,
    side: THREE.DoubleSide
  })
  var plane = new THREE.Mesh(geometry, material)
  plane.rotation.x = Math.PI / -2
  return plane
}

export default objects
