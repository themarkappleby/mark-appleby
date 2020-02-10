/* global window requestAnimationFrame */

import * as THREE from 'three'

var camera, scene, renderer, cube

init()
animate()

function init () {
  // Create Renderer
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  // Create Scene
  scene = new THREE.Scene()

  // Create Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 2

  // Add Lighting
  var dirLight = new THREE.DirectionalLight(0xffffff, 100)
  dirLight.position.y = 200
  scene.add(dirLight)

  // Add Cube
  var geometry = new THREE.BoxGeometry()
  var material = new THREE.MeshBasicMaterial({ color: 0x0000ff })
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
}

// Handle Window Resize
window.addEventListener('resize', onWindowResize, false)
function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// Animate
function animate () {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  render()
}

// Render
function render () {
  renderer.render(scene, camera)
}
