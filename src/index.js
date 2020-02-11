/* global window requestAnimationFrame */

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import objects from './objects'
import lights from './lights'

var camera, scene, renderer, controls

init()
animate()

function init () {
  // Create Renderer
  renderer = new THREE.WebGLRenderer()
  renderer.shadowMap.enabled = true
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  // Create Scene
  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0xFFFFFF, 0.1)

  // Create Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.y = 2
  camera.position.z = 2
  scene.add(camera)

  // Add Orbit Controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.1
  controls.minDistance = 2
  // controls.maxDistance = 5

  // Add Lights
  lights.forEach(light => scene.add(light))

  // Add Objects
  objects.forEach(object => scene.add(object))
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
  controls.update()
  render()
  requestAnimationFrame(animate)
}

// Render
function render () {
  renderer.render(scene, camera)
}
