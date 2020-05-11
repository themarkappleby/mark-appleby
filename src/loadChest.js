/* global requestAnimationFrame */

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { TweenMax, TimelineMax, Power1, Back } from 'gsap'
// import rand from './utils/rand'

const FRAME_RATE = 20 / 1000

function loadChest ({ path, canvas }) {
  const renderer = initRenderer(canvas)
  const camera = initCamera(canvas)
  loadGLTF(path, gltf => {
    // console.log('gltf', gltf)
    const scene = new THREE.Scene()
    scene.children = gltf.scene.children
    // const scene = gltf.scene
    // console.log('Imported Scene', scene)
    // console.log('Default Scene', basicScene)
    scene.childrenMap = {}
    scene.traverse(node => {
      scene.childrenMap[node.name] = node
      if (node.material && node.material.roughness) {
        node.material.roughness = 0
      }
      node.frustumCulled = false // TODO: something weird with chest geometry, needs investigation
      node.castShadow = true
    })
    scene.add(initFloor())
    scene.add(initLight())

    const mixer = getAnimationMixer(scene, gltf.animations)
    render(renderer, scene, camera, mixer)
    // initMouseTracking(renderer, scene, camera)
    initResizeTracking(renderer, canvas, camera)
    // animate(scene)
  })
}

function getAnimationMixer (scene, clips) {
  const mixer = new THREE.AnimationMixer(scene)
  var clip = clips[0]
  // var clip = THREE.AnimationClip.findByName(clips, 'intro')
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

/*
function chestUp (scene) {
  TweenMax.to(scene.childrenMap.Chest_Bone.position, {
    y: -0.6,
    duration: 0.4,
    ease: Power1.easeOut
  })
  TweenMax.to(scene.childrenMap.Lid_Bone.rotation, {
    x: THREE.Math.degToRad(-92),
    duration: 0.4,
    ease: Power1.easeOut
  })
  TweenMax.to(scene.childrenMap.Latch_Bone.rotation, {
    x: THREE.Math.degToRad(-50),
    duration: 0.3,
    ease: Power1.easeOut
  })
  TweenMax.to(scene.childrenMap.Left_Handle_Bone.rotation, {
    z: THREE.Math.degToRad(120),
    duration: 0.35,
    ease: Power1.easeOut
  })
  TweenMax.to(scene.childrenMap.Right_Handle_Bone.rotation, {
    z: THREE.Math.degToRad(240),
    duration: 0.2,
    ease: Power1.easeOut
  })
}

function chestDown (scene) {
  TweenMax.to(scene.childrenMap.Chest_Bone.position, {
    y: -0.727278470993042,
    duration: 0.4,
    ease: Power1.easeOut
  })
  TweenMax.to(scene.childrenMap.Lid_Bone.rotation, {
    x: -1.570795955400299,
    duration: 0.4,
    ease: Power1.easeOut
  })
  TweenMax.to(scene.childrenMap.Latch_Bone.rotation, {
    x: -1.5707958499653127,
    duration: 0.3,
    ease: Power1.easeOut
  })
  TweenMax.to(scene.childrenMap.Left_Handle_Bone.rotation, {
    z: 3.141592653589793,
    duration: 0.35,
    ease: Power1.easeOut
  })
  TweenMax.to(scene.childrenMap.Right_Handle_Bone.rotation, {
    z: 3.141592653589793,
    duration: 0.2,
    ease: Power1.easeOut
  })
}
*/

/*
function animate (scene) {
  const island = scene.childrenMap.Island
  const chest = scene.childrenMap.Chest_Empty
  float(island, -0.35, -0.25)
  float(chest, -0.1, 0.05)
}
*/

/*
function float (el, low, high) {
  const tl = new TimelineMax()
  tl.to(el.position, 3, { y: low, ease: Power1.easeInOut })
  tl.to(el.position, 3, { y: high, ease: Power1.easeInOut })
  tl.to(el.position, 3, {
    repeat: -1,
    yoyo: true,
    y: low,
    ease: Power1.easeInOut
  })
  tl.play()
}
*/

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
  renderer.toneMapping = THREE.Uncharted2ToneMapping
  renderer.toneMappingExposure = 2
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
  const shadowMapSize = 15
  // const light = new THREE.DirectionalLight(0xffffff, 0.4)
  const light = new THREE.DirectionalLight(0xffffff, 5)
  // light.position.set(0, 8, 0)
  light.position.set(3, 3, 3)
  light.castShadow = true
  light.shadow.radius = 3
  light.shadow.camera.left = shadowMapSize * -1
  light.shadow.camera.right = shadowMapSize
  light.shadow.camera.top = shadowMapSize
  light.shadow.camera.bottom = shadowMapSize * -1
  return light
}

function render (renderer, scene, camera, mixer) {
  mixer.update(FRAME_RATE)
  // console.log(mixer)
  renderer.render(scene, camera)
  requestAnimationFrame(() => {
    render(renderer, scene, camera, mixer)
  })
}

/*
function initMouseTracking (renderer, scene, camera) {
  const canvas = renderer.domElement
  const raycaster = new THREE.Raycaster()
  window.onmousemove = event => {
    const pos = getPickPosition(event, canvas)

    const chest = scene.childrenMap.Chest_Empty
    chest.lookAt(new THREE.Vector3(pos.x, pos.y, 15))

    const island = scene.childrenMap.Island
    island.lookAt(new THREE.Vector3(pos.x, pos.y, 30))

    raycaster.setFromCamera(new THREE.Vector2(pos.x, pos.y), camera)
    var intersects = raycaster.intersectObjects(chest.children, true)
    if (intersects.length) {
      chestUp(scene)
    } else {
      chestDown(scene)
    }
  }
}
*/

/*
function getPickPosition (event, canvas) {
  const pos = getCanvasRelativePosition(event, canvas)
  return {
    x: (pos.x / canvas.width) * 2 - 1,
    y: (pos.y / canvas.height) * -2 + 1
  }
}
*/

/*
function getCanvasRelativePosition (event, canvas) {
  const rect = canvas.getBoundingClientRect()
  return {
    x: (event.clientX - rect.left) * canvas.width / rect.width,
    y: (event.clientY - rect.top) * canvas.height / rect.height
  }
}
*/

export default loadChest
