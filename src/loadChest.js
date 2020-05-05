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
    console.log(scene.childrenMap)
    scene.add(initFloor())
    scene.add(initLight())
    render(renderer, scene, camera)
    initMouseTracking(renderer, scene, camera)
    animate(scene)
  })
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
  // const mouse = new THREE.Vector2()

  window.addEventListener('mousemove', function (e) {
    const canvas = renderer.domElement
    const width = canvas.width
    const height = canvas.height
    const left = canvas.offsetLeft
    const top = canvas.offsetTop
    const mouseX = e.clientX
    const mouseY = e.clientY
    const canvasCenterX = left + width / 2
    const canvasCenterY = top + height / 2

    /*
    // mouse.x = (mouseX / width) * 2 - 1
    // mouse.y = -(mouseY / height) * 2 + 1
    mouse.x = mouseX - left
    mouse.y = mouseY - top
    console.log(mouse.x, mouse.y)
    raycaster.setFromCamera(mouse, camera)
    var intersects = raycaster.intersectObjects(scene.children)
    // console.log(intersects)
    */

    const x = mouseX - canvasCenterX
    const y = -(mouseY - canvasCenterY)
    const z = 3000

    const mouse2DPosition = new THREE.Vector2(x, y)
    const mouse3DPosition = new THREE.Vector3(x, y, z)
    const mouse3DPositionFar = new THREE.Vector3(x, y, z * 5)
    const chest = scene.children[1]
    const island = scene.children[2]
    chest.lookAt(mouse3DPosition)
    island.lookAt(mouse3DPositionFar)

    var canvasPosition = renderer.domElement.getBoundingClientRect()
    var mouseX2 = e.clientX - canvasPosition.left
    var mouseY2 = e.clientY - canvasPosition.top
    var mouseVector = new THREE.Vector2(2 * (mouseX2 / window.innerWidth) - 1, 1 - 2 * (mouseY2 / window.innerHeight))

    raycaster.setFromCamera(mouseVector, camera)
    var meshes = [
      scene.childrenMap['Island  Mesh_0'],
      scene.childrenMap['Island  Mesh_1'],
      scene.childrenMap['Island  Mesh_2']
    ]
    // console.log('meshes', meshes)
    var intersects = raycaster.intersectObjects(scene.children, true)
    console.log(intersects)
  })
}

export default loadChest
