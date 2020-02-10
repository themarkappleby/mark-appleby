/* global window requestAnimationFrame */

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import content from './content'

var camera, scene, renderer, controls

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
  camera.position.y = 1
  camera.position.z = 2

  // Add Orbit Controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.1
  controls.minDistance = 0
  controls.maxDistance = 200

  // Add Lighting
  var dirLight = new THREE.DirectionalLight(0xffffff, 100)
  dirLight.position.y = 200
  scene.add(dirLight)

  // Add Content
  content.forEach(item => {
    scene.add(item)
  })
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
