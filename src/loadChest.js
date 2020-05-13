/* global requestAnimationFrame */

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { TweenMax, TimelineMax, Power1, Back } from 'gsap'

const FRAME_RATE = 20 / 1000
const helpers = []

function loadChest ({ path, canvas }) {
  const renderer = initRenderer(canvas)
  const camera = initCamera(canvas)
  loadGLTF(path, gltf => {
    const scene = new THREE.Scene()
    scene.children = gltf.scene.children
    scene.traverse(node => { node.castShadow = true })
    scene.add(initFloor())
    scene.add(initLight())
    const pickHelper = initPickHelper()
    scene.add(pickHelper)
    scene.elements = {
      pickHelper: pickHelper,
      chestAndIsland: scene.getObjectByName('chest_and_island')
    }

    const mixer = getAnimationMixer(scene, gltf.animations)
    render(renderer, scene, camera, mixer)
    initMouseTracking(renderer, scene, camera)
    initResizeTracking(renderer, canvas, camera)
  })
}

// Three JS Raycasting does not work with skinned meshes (of which the Chest is one), as noted here: https://stackoverflow.com/questions/55462615/three-js-raycast-on-skinning-mesh. Since my geometry is simply a GPU picking library like: https://github.com/bzztbomb/three_js_gpu_picking seems like overkills. Instead I'll have a simple transparent cube follow the mesh and act as the pick target.
function initPickHelper () {
  const geometry = new THREE.BoxGeometry(1.8, 1.5, 2)
  const material = new THREE.MeshBasicMaterial({
    color: 0x44aa88,
    opacity: 0,
    transparent: true
  })
  const pickHelper = new THREE.Mesh(geometry, material)
  pickHelper.position.set(0.1, 0.8, 1)
  return pickHelper
}

function getAnimationMixer (scene, clips) {
  const mixer = new THREE.AnimationMixer(scene)
  var clip = THREE.AnimationClip.findByName(clips, 'intro')
  var action = mixer.clipAction(clip)
  action.clampWhenFinished = true
  action.setLoop(THREE.LoopOnce).play()
  return mixer
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
  const canvas = renderer.domElement
  const raycaster = new THREE.Raycaster()
  const pickHelper = scene.elements.pickHelper
  window.onmousemove = event => {
    const pos = getPickPosition(event, canvas)
    scene.elements.chestAndIsland.lookAt(new THREE.Vector3(pos.x, pos.y, 15))
    raycaster.setFromCamera(new THREE.Vector2(pos.x, pos.y), camera)
    var intersects = raycaster.intersectObjects([pickHelper])
    if (intersects.length) {
      console.log(intersects)
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

function render (renderer, scene, camera, mixer) {
  mixer.update(FRAME_RATE)
  helpers.forEach(helper => {
    helper.update()
  })
  renderer.render(scene, camera)
  requestAnimationFrame(() => {
    render(renderer, scene, camera, mixer)
  })
}

export default loadChest
