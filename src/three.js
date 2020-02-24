/* global debug window */

import * as THREE from 'three'
import * as CANNON from 'cannon'
import './utils/CannonDebugRenderer'
import { Chest, Stage, lights } from './scene'

// Three.js shared variables
var camera, scene, renderer //, controls
var chest = Chest()
var stage = Stage()
var canvas = document.querySelector('.canvas')

// Cannon.js shared variables
var physicsSimulation, cannonDebugger

// Init physics simulation
export function initCannon () {
  const GRAVITY = -9.82
  physicsSimulation = new CANNON.World()
  physicsSimulation.gravity.set(0, GRAVITY, 0)
  physicsSimulation.addBody(stage.physics)
  physicsSimulation.addBody(chest.physics)
}

export function initThree () {
  // Create renderer
  renderer = new THREE.WebGLRenderer({ canvas })
  renderer.shadowMap.enabled = true
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false)

  // Create scene
  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2('#ffffff', 0.08)
  if (debug) {
    cannonDebugger = new THREE.CannonDebugRenderer(scene, physicsSimulation)
  }

  // Create camera
  camera = new THREE.PerspectiveCamera(50, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000)
  camera.position.set(0, 1.2, 4.5)
  camera.target = new THREE.Vector3(0, 1.5, 0)
  scene.add(camera)

  // Add lights
  lights.forEach(light => scene.add(light))

  // Add stage
  scene.add(stage)

  // Add chest
  scene.add(chest)
}

// Handle window resize
window.addEventListener('resize', onWindowResize, false)
function onWindowResize () {
  camera.aspect = canvas.offsetWidth / canvas.offsetHeight
  camera.updateProjectionMatrix()
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false)
}

// Animate
export function animate () {
  if (physicsSimulation) updatePhysics()
  render()
  window.requestAnimationFrame(animate)
}

// Update physics
const TIME_STEP = 1 / 60
function updatePhysics () {
  physicsSimulation.step(TIME_STEP)
  if (debug) cannonDebugger.update()
  chest.position.copy(chest.physics.position)
  chest.quaternion.copy(chest.physics.quaternion)
}

// Render
function render () {
  renderer.render(scene, camera)
}
