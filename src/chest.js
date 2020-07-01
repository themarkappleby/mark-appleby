/* global requestAnimationFrame */

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const FRAME_RATE = 20 / 1000

let renderer, canvas, camera, scene, animations, target, targetWeight, mouse, mouseX, mouseY, clickHandler, mouseoverHandler, mouseover

function init (params, cb) {
  return new Promise((resolve, reject) => {
    clickHandler = params.onClick
    mouseoverHandler = params.onMouseover
    initRenderer(params.container)
    initCamera()
    initResizeTracking()
    loadGLTF(params.file, gltf => {
      initScene(gltf.scene)
      initAnimations(gltf.animations)
      if (window.state.scene !== 'loading') {
        scene.add(initPickHelper())
        initMouseTracking()
      }
      render()
      animations.intro.play()
      animations.intro.paused = true
      resolve({
        canvas,
        gotoAndPlay,
        gotoAndStop,
        setWeight,
        resize
      })
    })
  })
}

function gotoAndPlay (animation) {
  if (animation === 'intro') {
    animations.intro.paused = false
    animations.hover.play()
    animations.hover.weight = 0
    window.setTimeout(() => {
      animations.intro.fadeOut(1)
      scene.add(initPickHelper())
      initMouseTracking()
    }, 1000)
  } else {
    if (animations[animation].paused) {
      animations[animation].paused = false
    } else {
      animations[animation].play()
    }
    animations[animation].weight = 1
    animations.hover.fadeOut(0.5)
  }
}

function gotoAndStop (animation, end) {
  scene.mixer.stopAllAction()
  animations.hover.fadeIn(0.5)
  if (end) {
    animations[animation].timeScale = 100
    animations[animation].play()
  } else {
    animations[animation].reset()
    animations[animation].play()
    animations[animation].paused = true
  }
}

function setWeight (animation, weight) {
  animations[animation].weight = weight
  if (weight > 0) {
    animations.hover.fadeOut()
  } else {
    animations.hover.reset()
    animations.hover.play()
  }
}

function initRenderer (container) {
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  })
  renderer.physicallyCorrectLights = true
  renderer.outputEncoding = THREE.sRGBEncoding

  renderer.setSize(container.offsetWidth, container.offsetHeight, false)
  renderer.shadowMap.enabled = true
  renderer.toneMapping = THREE.LinearToneMapping
  renderer.toneMappingExposure = 2.2
  renderer.setPixelRatio(window.devicePixelRatio)
  canvas = renderer.domElement
  resize(container)
  container.appendChild(canvas)
}

function initCamera () {
  camera = new THREE.PerspectiveCamera(50, canvas.offsetWidth / canvas.offsetHeight, 0.01, 30000)
  camera.position.set(0, 0.5, 6.5)
  camera.fov = 60
  camera.updateProjectionMatrix()
}

function loadGLTF (path, cb) {
  var loader = new GLTFLoader()
  loader.load(path, gltf => { cb(gltf) })
}

function initScene (gltfScene) {
  scene = new THREE.Scene()
  scene.children = gltfScene.children
  scene.traverse(node => {
    node.castShadow = true
    node.frustumCulled = false
  })
  initCubeMap()
  initFloor()
  scene.add(initAmbientLight())
  scene.add(initShadowLight())
}

function initFloor () {
  const floor = scene.getObjectByName('Floor')
  const material = new THREE.ShadowMaterial()
  material.opacity = 0.05
  floor.receiveShadow = true
  floor.material = material
}

function initCubeMap () {
  const loader = new THREE.CubeTextureLoader()
  const envMap = loader.load([
    'assets/env/px.png', 'assets/env/nx.png',
    'assets/env/py.png', 'assets/env/ny.png',
    'assets/env/pz.png', 'assets/env/nz.png'
  ])
  const audiBody = scene.getObjectByName('Audi_Body')
  audiBody.children.forEach(child => {
    child.material.envMap = envMap
    if (child.material.name === 'Clear Plastic' || child.material.name === 'Red Clear Plastic') {
      child.material.transparent = true
      child.material.opacity = 0.4
    }
  })
  const audiTires = scene.getObjectByName('Audi_Tires')
  audiTires.children.forEach(child => {
    child.material.envMap = envMap
  })
  const mugRight = scene.getObjectByName('Beer_Mug_Right')
  mugRight.material.envMap = envMap
  const mugLeft = scene.getObjectByName('Beer_Mug_Left')
  mugLeft.material.envMap = envMap
  const balloonRed = scene.getObjectByName('Balloon_Red')
  balloonRed.material.envMap = envMap
  const balloonGreen = scene.getObjectByName('Balloon_Green')
  balloonGreen.material.envMap = envMap
  const balloonBlue = scene.getObjectByName('Balloon_Blue')
  balloonBlue.material.envMap = envMap
}

function initAmbientLight () {
  const light = new THREE.AmbientLight(0xffffff, 2.2)
  return light
}

function initShadowLight () {
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
  window.addEventListener('resize', resize)
}

function resize () {
  if (camera) {
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight
    camera.updateProjectionMatrix()
  }
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false)
}

function initMouseTracking () {
  mouseMoveTracking()
  mouseScrollTracking()
  mouseClickTracking()
}

function mouseMoveTracking () {
  const raycaster = new THREE.Raycaster()
  target = new THREE.Vector3()
  target.z = 50
  window.addEventListener('mousemove', event => {
    mouseX = event.clientX
    mouseY = event.clientY
    mouse = getRelativeMousePosition(mouseX, mouseY)
    targetWeight = 1 - getMouseDistanceFromCenter()
    const pickHelper = scene.getObjectByName('pickHelper')
    if (pickHelper) {
      raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), camera)
      var intersects = raycaster.intersectObjects([pickHelper])
      mouseover = intersects.length > 0
      mouseoverHandler(mouseover)
    }
  })
}

function mouseScrollTracking () {
  window.addEventListener('scroll', event => {
    mouse = getRelativeMousePosition(mouseX, mouseY)
    targetWeight = 1 - getMouseDistanceFromCenter()
  })
}

function mouseClickTracking () {
  window.addEventListener('click', event => {
    if (mouseover) {
      clickHandler()
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

function getRelativeMousePosition (x, y) {
  const pos = getRelativeCanvasPosition(x, y)
  return {
    x: (pos.x / canvas.width) * 2 - 1,
    y: (pos.y / canvas.height) * -2 + 1
  }
}

function getRelativeCanvasPosition (x, y) {
  const rect = canvas.getBoundingClientRect()
  return {
    x: (x - rect.left) * canvas.width / rect.width,
    y: (y - rect.top) * canvas.height / rect.height
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
  animations.ecobee.play()
  animations.ecobee.paused = true
  animations.ecobee.weight = 0

  animations.audi = getClipAction('audi', clips)
  animations.audi.setLoop(THREE.LoopOnce)
  animations.audi.clampWhenFinished = true
  animations.audi.play()
  animations.audi.paused = true
  animations.audi.weight = 0

  animations.worldvision = getClipAction('worldvision', clips)
  animations.worldvision.setLoop(THREE.LoopOnce)
  animations.worldvision.clampWhenFinished = true
  animations.worldvision.play()
  animations.worldvision.paused = true
  animations.worldvision.weight = 0

  animations.contact = getClipAction('contact', clips)
  animations.contact.setLoop(THREE.LoopOnce)
  animations.contact.clampWhenFinished = true
  animations.contact.play()
  animations.contact.paused = true
  animations.contact.weight = 0
}

function getClipAction (name, clips) {
  const clip = THREE.AnimationClip.findByName(clips, name)
  return scene.mixer.clipAction(clip)
}

function render () {
  if (mouse) {
    const root = scene.getObjectByName('root')
    target.x += (mouse.x - target.x) * 0.07
    target.y += (mouse.y - target.y) * 0.07
    target.z = 4
    const yLimit = 0.5
    if (target.y < yLimit * -1) target.y = yLimit * -1
    if (target.y > yLimit) target.y = yLimit
    root.lookAt(target)
  }
  if (targetWeight !== undefined) {
    animations.hover.weight += (targetWeight - animations.hover.weight) * 0.1
  }
  scene.mixer.update(FRAME_RATE)
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

export default init
