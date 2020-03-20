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

  // Ref: https://discourse.threejs.org/t/exporting-blender-scene-lighting-issues/11887/5
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.physicallyCorrectLights = true

  getScene('scene.glb', function (gltf) {
    scene = gltf.scene

    scene.traverse(node => {
      node.frustumCulled = false
    })

    // Add skybox
    scene.add(getSkybox())

    // Create camera
    camera = new THREE.PerspectiveCamera(50, canvas.offsetWidth / canvas.offsetHeight, 0.01, 30000)
    camera.position.set(0, 2, 18)
    camera.zoom = 2
    camera.updateProjectionMatrix()
    scene.add(camera)

    // Add controls
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.target.set(0, 3, 0)

    playAnimations(gltf)

    run()
  })
}

function getSkybox () {
  const materialArray = []
  const textureFt = new THREE.TextureLoader().load('assets/skybox_ft.jpg')
  const textureBk = new THREE.TextureLoader().load('assets/skybox_bk.jpg')
  const textureUp = new THREE.TextureLoader().load('assets/skybox_up.jpg')
  const textureDn = new THREE.TextureLoader().load('assets/skybox_dn.jpg')
  const textureRt = new THREE.TextureLoader().load('assets/skybox_rt.jpg')
  const textureLf = new THREE.TextureLoader().load('assets/skybox_lf.jpg')

  materialArray.push(new THREE.MeshBasicMaterial({ map: textureFt }))
  materialArray.push(new THREE.MeshBasicMaterial({ map: textureBk }))
  materialArray.push(new THREE.MeshBasicMaterial({ map: textureUp }))
  materialArray.push(new THREE.MeshBasicMaterial({ map: textureDn }))
  materialArray.push(new THREE.MeshBasicMaterial({ map: textureRt }))
  materialArray.push(new THREE.MeshBasicMaterial({ map: textureLf }))

  materialArray.forEach(material => {
    material.side = THREE.BackSide
  })

  const skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000)
  const skybox = new THREE.Mesh(skyboxGeo, materialArray)
  return skybox
}

function playAnimations (mesh) {
  // Create an AnimationMixer, and get the list of AnimationClip instances
  mixer = new THREE.AnimationMixer(mesh.scene)
  var clips = mesh.animations

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

// Run Three.js view
function run () {
  controls.update()
  mixer.update(FRAME_RATE)
  renderer.render(scene, camera)
  window.requestAnimationFrame(run)
}
