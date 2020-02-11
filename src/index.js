/* global window requestAnimationFrame */

import * as THREE from 'three'
import * as CANNON from 'cannon'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import objects from './objects'
import lights from './lights'

var camera, scene, renderer, controls
var world, shape, body

initThree()
initCannon()
animate()

function initThree () {
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

function initCannon () {
  world = new CANNON.World()
  world.gravity.set(0, -9.82, 0)
  world.broadphase = new CANNON.NaiveBroadphase()
  world.solver.iterations = 10

  shape = new CANNON.Box(new CANNON.Vec3(1, 100, 1))
  body = new CANNON.Body({
    mass: 1
  })
  body.addShape(shape)
  body.angularDamping = 0.5
  world.addBody(body)
}

// Animate
function animate () {
  controls.update()
  updatePhysics()
  render()
  requestAnimationFrame(animate)
}

// Render
function render () {
  renderer.render(scene, camera)
}

function updatePhysics () {
  // Step the physics world
  world.step(1 / 60)
  console.log(body.position.y)
}
