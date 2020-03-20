/* global window */

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const FRAME_RATE = 24 / 1000

// Three.js shared variables
var camera, scene, renderer, controls, mixer
var canvas = document.querySelector('.canvas')

export function initThree () {
  // Create renderer
  renderer = new THREE.WebGLRenderer({ canvas })
  renderer.shadowMap.enabled = true
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false)

  // ref: https://discourse.threejs.org/t/exporting-blender-scene-lighting-issues/11887/5
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.physicallyCorrectLights = true

  getScene('scene.glb', function (gltf) {
    scene = gltf.scene
    scene.fog = new THREE.FogExp2('#ffffff', 0.01)

    scene.traverse(node => {
      node.frustumCulled = false
    })

    // Create camera
    camera = new THREE.PerspectiveCamera(50, canvas.offsetWidth / canvas.offsetHeight, 0.01, 1000)
    camera.position.set(5, 2, 23)
    // camera.target = new THREE.Vector3(0, 0, 30)
    camera.zoom = 1.5
    camera.updateProjectionMatrix()
    scene.add(camera)

    // Add controls
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    /*
    controls.minDistance = 1
    controls.maxDistance = 15
    */
    controls.target.set(0, 2, 0)

    playAnimations(gltf)

    run()
  })
}

function playAnimations (mesh) {
  // Create an AnimationMixer, and get the list of AnimationClip instances
  mixer = new THREE.AnimationMixer(mesh.scene)
  var clips = mesh.animations
  console.log('clips', clips)

  // Play a specific animation
  var clip = THREE.AnimationClip.findByName(clips, 'Chest Fall')
  var action = mixer.clipAction(clip)
  console.log('action', action)
  action.play()
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

// Run Three.js view
function run () {
  controls.update()
  mixer.update(FRAME_RATE)
  renderer.render(scene, camera)
  window.requestAnimationFrame(run)
}
