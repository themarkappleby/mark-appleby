/* global requestAnimationFrame */

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TweenMax, Power1 } from 'gsap'
import rand from './utils/rand'

function loadChest ({ path, canvas }) {
  const renderer = initRenderer(canvas)
  const camera = initCamera(canvas)
  loadScene(path, scene => {
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
    render(renderer, scene, camera)
    initMouseTracking(renderer, scene, camera)
    initResizeTracking(renderer, canvas, camera)
    animate(scene)
  })
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

function animate (scene) {
  const island = scene.children[2]
  float(island)
}

function float (island) {
  TweenMax.to(island.position, {
    y: rand(-0.3, -0.2, false),
    duration: rand(1, 1.5, false),
    ease: Power1.easeInOut,
    onComplete: () => { float(island) }
  })
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

function loadScene (path, cb) {
  var loader = new GLTFLoader()
  loader.load(path, gltf => { cb(gltf.scene) })
}

function initFloor () {
  const geometry = new THREE.PlaneGeometry(10, 10)
  const material = new THREE.ShadowMaterial()
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

function render (renderer, scene, camera) {
  renderer.render(scene, camera)
  requestAnimationFrame(() => {
    render(renderer, scene, camera)
  })
}

function initMouseTracking (renderer, scene, camera) {
  const raycaster = new THREE.Raycaster()
  window.addEventListener('mousemove', function (e) {
    const canvas = renderer.domElement
    const width = canvas.width
    const height = canvas.height
    const left = canvas.offsetLeft
    const top = canvas.offsetTop
    const mouseX = e.clientX
    const mouseY = e.clientY
    const mouseX2 = e.clientX - left
    const mouseY2 = e.clientY - top
    const canvasCenterX = left + width / 2
    const canvasCenterY = top + height / 2

    const x = mouseX - canvasCenterX
    const y = -(mouseY - canvasCenterY)
    const z = 3000

    const mouse2DPosition = new THREE.Vector2(2 * (mouseX2 / width) - 1, 1 - 2 * (mouseY2 / height))
    const mouse3DPosition = new THREE.Vector3(x, y, z)
    const mouse3DPositionFar = new THREE.Vector3(x, y, z * 5)
    const chest = scene.children[1]
    const island = scene.children[2]
    chest.lookAt(mouse3DPosition)
    island.lookAt(mouse3DPositionFar)

    raycaster.setFromCamera(mouse2DPosition, camera)
    var intersects = raycaster.intersectObjects(scene.children, true)

    if (intersects.length > 0 && intersects[0].object.name !== 'Floor') {
      chestUp(scene)
    } else {
      chestDown(scene)
    }
  })
}

export default loadChest
