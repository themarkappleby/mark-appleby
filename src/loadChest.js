/* global requestAnimationFrame */

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function loadChest ({ path, canvas }) {
  const renderer = initRenderer(canvas)
  const camera = initCamera(canvas)
  loadScene(path, scene => {
    scene.traverse(node => {
      node.castShadow = true
    })
    scene.add(initFloor())
    scene.add(initLight())
    render(renderer, scene, camera)
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
    scene.children[1].rotation.y += 0.01
    render(renderer, scene, camera)
  })
}

export default loadChest
