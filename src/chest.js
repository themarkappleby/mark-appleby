/* global requestAnimationFrame */

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const FRAME_RATE = 20 / 1000

let renderer, canvas, camera, scene, animations

function init (params) {
  canvas = params.canvas
  initState()
  initRenderer()
  initCamera()
  initResizeTracking()
  loadGLTF(params.file, gltf => {
    initScene(gltf.scene)
    initAnimations(gltf.animations)
    initMouseTracking()
    render()
    animations.intro.play()
    window.setTimeout(() => {
      animations.intro.fadeOut(1)
      scene.add(initPickHelper())
    }, 1000)
  })
}

function initState () {
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
}

function initRenderer () {
  renderer = new THREE.WebGLRenderer({
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
}

function initCamera () {
  camera = new THREE.PerspectiveCamera(50, canvas.offsetWidth / canvas.offsetHeight, 0.01, 30000)
  camera.position.set(0, 0.5, 6.5)
  camera.fov = 55
  camera.updateProjectionMatrix()
}

function loadGLTF (path, cb) {
  var loader = new GLTFLoader()
  loader.load(path, gltf => { cb(gltf) })
}

function initScene (gltfScene) {
  scene = new THREE.Scene()
  scene.children = gltfScene.children
  scene.traverse(node => { node.castShadow = true })
  scene.add(initFloor())
  scene.add(initLight())
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

function initResizeTracking () {
  window.addEventListener('resize', () => {
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight
    camera.updateProjectionMatrix()
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false)
  })
}

function initMouseTracking () {
  const LOOK_AT_FACTOR = 10
  const raycaster = new THREE.Raycaster()
  const chestAndIsland = scene.getObjectByName('chest_and_island')
  window.addEventListener('mousemove', event => {
    const pickHelper = scene.getObjectByName('pickHelper')
    const pos = getPickPosition(event)
    chestAndIsland.lookAt(new THREE.Vector3(pos.x, pos.y, LOOK_AT_FACTOR))
    if (pickHelper && window.state.scene === 'intro') {
      raycaster.setFromCamera(new THREE.Vector2(pos.x, pos.y), camera)
      var intersects = raycaster.intersectObjects([pickHelper])
      if (intersects.length) {
        window.state.set('chestHover', true, () => {
          animations.hover.enabled = true
          animations.hover.fadeIn(0.7).play()
        })
      } else {
        window.state.set('chestHover', false, () => {
          animations.hover.fadeOut(0.7).play()
        })
      }
    }
  })
  window.addEventListener('click', event => {
    if (window.state.chestHover) {
      window.state.set('scene', 'ecobee')
      animations.ecobee.play()
      animations.hover.crossFadeTo(animations.ecobee, 0.5)
    }
  })
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

function getPickPosition (event) {
  const pos = getCanvasRelativePosition(event)
  return {
    x: (pos.x / canvas.width) * 2 - 1,
    y: (pos.y / canvas.height) * -2 + 1
  }
}

function getCanvasRelativePosition (event) {
  const rect = canvas.getBoundingClientRect()
  return {
    x: (event.clientX - rect.left) * canvas.width / rect.width,
    y: (event.clientY - rect.top) * canvas.height / rect.height
  }
}

function initAnimations (clips) {
  animations = {}
  scene.mixer = new THREE.AnimationMixer(scene)
  animations.intro = getClipAction('intro', clips)
  animations.intro.setLoop(THREE.LoopOnce)
  animations.intro.clampWhenFinished = true
  animations.hover = getClipAction('hover', clips)
  animations.hover.setLoop(THREE.LoopRepeat)
  animations.ecobee = getClipAction('ecobee', clips)
  animations.ecobee.setLoop(THREE.LoopOnce)
  animations.ecobee.clampWhenFinished = true
}

function getClipAction (name, clips) {
  const clip = THREE.AnimationClip.findByName(clips, name)
  return scene.mixer.clipAction(clip)
}

function render () {
  scene.mixer.update(FRAME_RATE)
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

export default init
