/* global requestAnimationFrame */

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const FRAME_RATE = 20 / 1000
const GLB_PATH = 'assets/chest.glb'

window.state = {
  scene: 'intro',
  chestHover: false,
  set: (name, value, changed) => {
    const previousValue = window.state[name]
    if (previousValue !== value && changed) {
      changed(previousValue, value)
    }
    window.state[name] = value
  }
}

function loadChest ({ canvas }) {
  const renderer = initRenderer(canvas)
  const camera = initCamera(canvas)
  loadGLTF(GLB_PATH, gltf => {
    const scene = new THREE.Scene()
    scene.children = gltf.scene.children
    scene.traverse(node => { node.castShadow = true })
    scene.add(initFloor())
    scene.add(initLight())
    initMouseTracking(renderer, scene, camera)
    initResizeTracking(renderer, canvas, camera)
    initAnimations(scene, gltf.animations)
    render(renderer, scene, camera)
    scene.animations.intro.play()
    window.setTimeout(() => {
      scene.animations.intro.fadeOut(1)
      scene.add(initPickHelper())
    }, 1000)
  })
}

function initAnimations (scene, clips) {
  scene.mixer = new THREE.AnimationMixer(scene)
  scene.animations = {}

  // Intro
  const intro = getClipAction('intro', scene, clips)
  intro.setLoop(THREE.LoopOnce)
  intro.clampWhenFinished = true
  scene.animations.intro = intro

  // Hover
  const hover = getClipAction('hover', scene, clips)
  hover.setLoop(THREE.LoopRepeat)
  scene.animations.hover = hover

  // ecobee
  const ecobee = getClipAction('ecobee', scene, clips)
  ecobee.setLoop(THREE.LoopOnce)
  ecobee.clampWhenFinished = true
  scene.animations.ecobee = ecobee
}

function getClipAction (name, scene, clips) {
  const clip = THREE.AnimationClip.findByName(clips, name)
  return scene.mixer.clipAction(clip)
}

// Target for mouse events
function initPickHelper () {
  const geometry = new THREE.BoxGeometry(1.8, 1.5, 2)
  const material = new THREE.MeshBasicMaterial({
    color: 0x44aa88,
    opacity: 0,
    transparent: true
  })
  const pickHelper = new THREE.Mesh(geometry, material)
  pickHelper.position.set(0.1, 0.8, 1)
  pickHelper.name = 'pickHelper'
  return pickHelper
}

function initResizeTracking (renderer, canvas, camera) {
  window.onresize = () => {
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight
    camera.updateProjectionMatrix()
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false)
  }
}

function initRenderer (canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  })
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false)
  renderer.shadowMap.enabled = true
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.physicallyCorrectLights = true
  renderer.toneMapping = THREE.LinearToneMapping
  renderer.toneMappingExposure = 2.25
  renderer.setPixelRatio(window.devicePixelRatio)
  return renderer
}

function initCamera (canvas) {
  const camera = new THREE.PerspectiveCamera(50, canvas.offsetWidth / canvas.offsetHeight, 0.01, 30000)
  camera.position.set(0, 0.5, 6.5)
  camera.fov = 55
  camera.updateProjectionMatrix()
  return camera
}

function loadGLTF (path, cb) {
  var loader = new GLTFLoader()
  loader.load(path, gltf => { cb(gltf) })
}

function initFloor () {
  const geometry = new THREE.PlaneGeometry(10, 10)
  const material = new THREE.MeshStandardMaterial()
  material.opacity = 0.07
  const floor = new THREE.Mesh(geometry, material)
  floor.receiveShadow = true
  floor.position.y = -1.8
  floor.rotation.x = THREE.Math.degToRad(-90)
  floor.name = 'Floor'
  return floor
}

function initLight () {
  const shadowMapSize = 2
  const light = new THREE.DirectionalLight(0xffffff, 0.01)
  light.position.set(0, 5, 0)
  light.castShadow = true
  light.shadow.radius = 3
  light.shadow.camera.left = shadowMapSize * -1
  light.shadow.camera.right = shadowMapSize
  light.shadow.camera.top = shadowMapSize
  light.shadow.camera.bottom = shadowMapSize * -1
  return light
}

function initMouseTracking (renderer, scene, camera) {
  const LOOK_AT_FACTOR = 10
  const canvas = renderer.domElement
  const raycaster = new THREE.Raycaster()
  const chestAndIsland = scene.getObjectByName('chest_and_island')
  window.onmousemove = event => {
    const pickHelper = scene.getObjectByName('pickHelper')
    const pos = getPickPosition(event, canvas)
    chestAndIsland.lookAt(new THREE.Vector3(pos.x, pos.y, LOOK_AT_FACTOR))
    if (pickHelper && window.state.scene === 'intro') {
      raycaster.setFromCamera(new THREE.Vector2(pos.x, pos.y), camera)
      var intersects = raycaster.intersectObjects([pickHelper])
      if (intersects.length) {
        window.state.set('chestHover', true, () => {
          scene.animations.hover.enabled = true
          scene.animations.hover.fadeIn(0.7).play()
        })
      } else {
        window.state.set('chestHover', false, () => {
          scene.animations.hover.fadeOut(0.7).play()
        })
      }
    }
  }
  window.onclick = event => {
    if (window.state.chestHover) {
      window.state.set('scene', 'ecobee')
      scene.animations.ecobee.play()
      scene.animations.hover.crossFadeTo(scene.animations.ecobee, 0.5)
    }
  }
}

function getPickPosition (event, canvas) {
  const pos = getCanvasRelativePosition(event, canvas)
  return {
    x: (pos.x / canvas.width) * 2 - 1,
    y: (pos.y / canvas.height) * -2 + 1
  }
}

function getCanvasRelativePosition (event, canvas) {
  const rect = canvas.getBoundingClientRect()
  return {
    x: (event.clientX - rect.left) * canvas.width / rect.width,
    y: (event.clientY - rect.top) * canvas.height / rect.height
  }
}

function render (renderer, scene, camera) {
  scene.mixer.update(FRAME_RATE)
  renderer.render(scene, camera)
  requestAnimationFrame(() => {
    render(renderer, scene, camera)
  })
}

export default loadChest
