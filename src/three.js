/* global window */

/*
=======================================================
   = FILE HERE FOR REFERENCE ONLY - NOT LOADED =
=======================================================
*/

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const ADD_CONTROLS = false

const FRAME_RATE = 20 / 1000

// Three.js shared variables
var camera, scene, renderer, controls, mixer
var canvas = document.querySelector('.canvas')
var mouseX = 0
var mouseY = 0
var chest
var blenderImport

export function initThree () {
  // Create renderer
  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  })
  renderer.shadowMap.enabled = true
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false)

  // Ref: https://discourse.threejs.org/t/exporting-blender-scene-lighting-issues/11887/5
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.physicallyCorrectLights = true
  renderer.toneMappingExposure = 1.5

  getScene('scene-blue.glb', function (gltf) {
    blenderImport = gltf
    scene = gltf.scene

    scene.traverse(node => {
      console.log(node.name)
      if (node.name === 'Chest_Empty') {
        console.log(node)
        chest = node
      }
      node.frustumCulled = false
    })

    // Create camera
    camera = new THREE.PerspectiveCamera(50, canvas.offsetWidth / canvas.offsetHeight, 0.01, 30000)
    camera.position.set(0, 3, 10)
    camera.fov = 55
    camera.updateProjectionMatrix()
    scene.add(camera)

    // Add controls
    if (ADD_CONTROLS) {
      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.1
      controls.target.set(0, 3, 0)
    }

    run()
  })
}

export function playAnimations () {
  // Create an AnimationMixer, and get the list of AnimationClip instances
  mixer = new THREE.AnimationMixer(blenderImport.scene)
  var clips = blenderImport.animations

  // Play a specific animation
  var clip = THREE.AnimationClip.findByName(clips, 'Chest Fall')
  var action = mixer.clipAction(clip)
  action.clampWhenFinished = true
  action.setLoop(THREE.LoopOnce).play()
}

// Import Blender models/textures/animations
function getScene (file, cb) {
  var loader = new GLTFLoader()
  loader.setPath('assets/')
  loader.load(file, cb)
}

// Handle window resize
window.addEventListener('resize', onWindowResize, false)
function onWindowResize () {
  camera.aspect = canvas.offsetWidth / canvas.offsetHeight
  camera.updateProjectionMatrix()
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false)
}

canvas.addEventListener('mousemove', event => {
  mouseX = event.offsetX - canvas.width / 2
  mouseY = event.offsetY - canvas.height / 2
}, false)

// Run Three.js view
function run () {
  if (controls) {
    controls.update()
  } else {
    camera.position.x += (-(mouseX) - camera.position.x) * 0.00005
    camera.position.y += (mouseY - camera.position.y) * 0.000025
    if (camera.position.x < -2) camera.position.x = -2
    if (camera.position.x > 2) camera.position.x = 2
    if (camera.position.y < 0.75) camera.position.y = 0.75
    if (camera.position.y > 4) camera.position.y = 4
    camera.lookAt(
      new THREE.Vector3(
        chest.position.x,
        chest.position.y + 3,
        chest.position.z
      )
    )
  }
  if (mixer) mixer.update(FRAME_RATE)
  renderer.render(scene, camera)
  window.requestAnimationFrame(run)
}
