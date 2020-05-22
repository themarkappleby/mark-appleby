/* global requestAnimationFrame */

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const FRAME_RATE = 20 / 1000

let renderer, canvas, camera, scene, animations, target, targetWeight, mouse

function init (params) {
  canvas = params.canvas
  initRenderer()
  initCamera()
  initResizeTracking()
  loadGLTF(params.file, gltf => {
    initScene(gltf.scene)
    initAnimations(gltf.animations)
    render()
    animations.intro.play()
    animations.hover.play()
    animations.hover.weight = 0
    window.setTimeout(() => {
      animations.intro.fadeOut(1)
      scene.add(initPickHelper())
      initMouseTracking()
    }, 1000)
  })
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
  renderer.toneMappingExposure = 2.5
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
  const material = new THREE.ShadowMaterial()
  material.opacity = 0.05
  const floor = new THREE.Mesh(geometry, material)
  floor.receiveShadow = true
  floor.position.y = -2
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
  mouseMoveTracking()
  mouseClickTracking()
}

function mouseMoveTracking () {
  target = new THREE.Vector3()
  target.z = 50
  window.addEventListener('mousemove', event => {
    mouse = getRelativeMousePosition(event)
    targetWeight = 1 - getMouseDistanceFromCenter()
  })
}

function mouseClickTracking () {
  const raycaster = new THREE.Raycaster()
  window.addEventListener('click', event => {
    mouse = getRelativeMousePosition(event)
    const pickHelper = scene.getObjectByName('pickHelper')
    if (pickHelper && window.state.scene === 'intro') {
      raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), camera)
      var intersects = raycaster.intersectObjects([pickHelper])
      if (intersects.length) {
        animations.ecobee.play()
        animations.hover.crossFadeTo(animations.ecobee, 0.5)
        window.state.set('scene', 'ecobee')
      }
    }
  })
}

function getMouseDistanceFromCenter () {
  let distance = 0
  let x = mouse.x
  let y = mouse.y
  if (x < 0) x *= -1
  if (y < 0) y *= -1
  distance = (x + y) / 2
  if (distance > 1) distance = 1
  return distance
}

function initPickHelper () {
  const geometry = new THREE.BoxGeometry(1.8, 1.5, 2)
  const material = new THREE.MeshBasicMaterial({
    color: 0x44aa88,
    opacity: 0,
    transparent: true
  })
  const pickHelper = new THREE.Mesh(geometry, material)
  pickHelper.position.set(-0.05, 0.6, 1)
  pickHelper.name = 'pickHelper'
  return pickHelper
}

function getRelativeMousePosition (event) {
  const pos = getRelativeCanvasPosition(event)
  return {
    x: (pos.x / canvas.width) * 2 - 1,
    y: (pos.y / canvas.height) * -2 + 1
  }
}

function getRelativeCanvasPosition (event) {
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
  if (mouse) {
    const chest = scene.getObjectByName('chest_and_island')
    target.x += (mouse.x - target.x) * 0.04
    target.y += (mouse.y - target.y) * 0.04
    target.z -= (target.z - 8) * 0.04
    chest.lookAt(target)
  }
  if (targetWeight !== undefined && window.state.scene === 'intro') {
    animations.hover.weight += (targetWeight - animations.hover.weight) * 0.1
  }
  scene.mixer.update(FRAME_RATE)
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

export default init
