/* global window requestAnimationFrame */

import * as THREE from 'three'
import * as CANNON from 'cannon'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import objects from './objects'
import lights from './lights'

// Three shared variables
var camera, scene, renderer, controls

// Cannon shared variables
const TIME_STEP = 1 / 60
const GRAVITY = -9.82
var world, body, mesh

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
  camera.position.y = 3
  camera.position.z = 4
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

  // Add Cannon test object
  var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  var material = new THREE.MeshLambertMaterial({ color: '#eeb92f' })
  mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(0, 1, 0)
  mesh.castShadow = true
  scene.add(mesh)
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
  world.gravity.set(0, GRAVITY, 0)
  world.broadphase = new CANNON.NaiveBroadphase()
  world.solver.iterations = 10

  body = new CANNON.Body({ mass: 1 })
  body.addShape(new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)))
  body.position.set(0, 3, 0)
  body.angularVelocity.set(8, 8, 8)
  body.angularDamping = 0.5
  world.addBody(body)

  var floor = new CANNON.Body({ mass: 0 })
  floor.addShape(new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)))
  floor.position.set(0, 0, 0)
  world.addBody(floor)
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
  world.step(TIME_STEP)
  mesh.position.copy(body.position)
  mesh.quaternion.copy(body.quaternion)
}
