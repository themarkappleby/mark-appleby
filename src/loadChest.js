/* global requestAnimationFrame */

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { TweenMax, TimelineMax, Power1, Back } from 'gsap'
import { TweenMax, Power1 } from 'gsap'
// import rand from './utils/rand'

const FRAME_RATE = 20 / 1000
const helpers = []

function loadChest ({ path, canvas }) {
  const renderer = initRenderer(canvas)
  const camera = initCamera(canvas)
  loadGLTF(path, gltf => {
    const scene = new THREE.Scene()
    scene.children = gltf.scene.children
    scene.childrenMap = {}
    scene.traverse(node => {
      scene.childrenMap[node.name] = node
      if (node.material && node.material.roughness) {
        node.material.roughness = 0
      }

      /*
      var box = new THREE.BoxHelper(node, 0xff0000)
      node.updateMatrixWorld(true)
      box.applyMatrix4(node.matrixWorld)
      helpers.push(box)
      scene.add(box)
      */

      node.frustumCulled = false // TODO: something weird with chest geometry, needs investigation
      node.castShadow = true
    })
    scene.add(initFloor())
    scene.add(initLight())
    const pickHelper = initPickHelper()
    scene.add(pickHelper)
    scene.childrenMap.Pick_Helper = pickHelper
    console.log(scene.childrenMap)

    const mixer = getAnimationMixer(scene, gltf.animations)
    render(renderer, scene, camera, mixer)
    initMouseTracking(renderer, scene, camera)
    initResizeTracking(renderer, canvas, camera)
    // animate(scene)
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
  renderer.toneMapping = THREE.LinearToneMapping
  renderer.toneMappingExposure = 2
  renderer.setPixelRatio(window.devicePixelRatio)
  return renderer
}

function initCamera (canvas) {
  const camera = new THREE.PerspectiveCamera(50, canvas.offsetWidth / canvas.offsetHeight, 0.01, 30000)
  camera.position.set(0, 0.5, 6.5)
  // camera.position.set(0, 0.5, 5)
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
  // const light = new THREE.DirectionalLight(0xffffff, 0.4)
  const light = new THREE.DirectionalLight(0xffffff, 0.4)
  light.position.set(1, 5, 5)
  // light.position.set(0, 5, 0)
  // light.position.set(3, 3, 3)
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
  helpers.forEach(helper => {
    helper.update()
  })
  renderer.render(scene, camera)
  requestAnimationFrame(() => {
    render(renderer, scene, camera, mixer)
  })
}

function initMouseTracking (renderer, scene, camera) {
  const canvas = renderer.domElement
  const raycaster = new THREE.Raycaster()
  const pickHelper = scene.childrenMap.Pick_Helper
  window.onmousemove = event => {
    const pos = getPickPosition(event, canvas)

    scene.childrenMap.Scene_Empty.lookAt(new THREE.Vector3(pos.x, pos.y, 15))
    // scene.childrenMap.Scene_Empty.lookAt(new THREE.Vector3(pos.x, pos.y, 2))

    raycaster.setFromCamera(new THREE.Vector2(pos.x, pos.y), camera)
    var intersects = raycaster.intersectObjects([pickHelper])

    // var intersects = raycaster.intersectObjects(scene.childrenMap.Chest_Empty.children, true)
    if (intersects.length) {
      console.log(intersects)
      chestUp(scene)
    } else {
      chestDown(scene)
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

export default loadChest
