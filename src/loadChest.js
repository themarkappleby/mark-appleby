/* global requestAnimationFrame */

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TweenMax, TimelineMax, Power1, Back } from 'gsap'
import rand from './utils/rand'

const FRAME_RATE = 20 / 1000

function loadChest ({ path, canvas }) {
  const renderer = initRenderer(canvas)
  const camera = initCamera(canvas)
  loadGLTF(path, gltf => {
    console.log('gltf', gltf)
    const scene = gltf.scene
    scene.childrenMap = {}
    scene.traverse(node => {
      scene.childrenMap[node.name] = node
      if (node.material && node.material.roughness) {
        node.material.roughness = 0
      }
      node.castShadow = true
    })
    scene.add(initFloor())
    scene.add(initLight())
    const mixer = getAnimationMixer(scene, gltf.animations)
    render(renderer, scene, camera, mixer)
    // initMouseTracking(renderer, scene, camera)
    initResizeTracking(renderer, canvas, camera)
    animate(scene)
  })
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

function animate (scene) {
  /*
  const island = scene.childrenMap.Island
  const chest = scene.childrenMap.Chest_Empty

  const tl = new TimelineMax()
  tl.from(island.scale, {
    x: 0,
    y: 0,
    z: 0,
    duration: 0.7,
    ease: Back.easeOut
  })
  tl.from(chest.scale, {
    x: 0,
    y: 0,
    z: 0,
    duration: 0.4,
    ease: Back.easeOut
  }, '-=0.2')
  tl.from(chest.position, {
    y: 0.15,
    duration: 0.4,
    ease: Power1.easeInOut
  }, '-=0.2')
  tl.to(island.position, 3, { y: -0.35, ease: Power1.easeInOut })
  tl.to(island.position, 3, { y: -0.25, ease: Power1.easeInOut })
  tl.to(island.position, 3, {
    repeat: -1,
    yoyo: true,
    y: -0.35,
    ease: Power1.easeInOut
  })
  tl.to(chest.position, 4, {
    repeat: -1,
    yoyo: true,
    y: -0.1,
    ease: Power1.easeInOut
  }, '-=9')
  */

  /*
  popIn(island, () => {
    float(island, -0.35, -0.25)
  })
  popIn(chest, () => {
    float(chest, -0.1, 0.05)
  })
  */
}

/*
function popIn (el, cb) {
  TweenMax.from(el.scale, {
    x: 0,
    y: 0,
    z: 0,
    duration: 0.5,
    ease: Back.easeOut,
    onComplete: cb
  })
}

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
  const light = new THREE.DirectionalLight(0xffffff, 0.4)
  light.position.set(0, 8, 0)
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
  console.log(mixer)
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
