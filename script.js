/* global window THREE dat */

// Create Renderer
var renderer = new THREE.WebGLRenderer({
  alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Create Scene
var scene = new THREE.Scene()

// Create Camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 4

var r = 'https://threejs.org/examples/textures/cube/Bridge2/'
var urls = [r + 'posx.jpg', r + 'negx.jpg',
  r + 'posy.jpg', r + 'negy.jpg',
  r + 'posz.jpg', r + 'negz.jpg']

var textureCube = new THREE.CubeTextureLoader().load(urls)
textureCube.format = THREE.RGBFormat

// Create Cube
var geometry = createBoxWithRoundedEdges(1, 1, 1, 0.05, 16)
var material = new THREE.MeshStandardMaterial({
  // color: 0xf4b822,
  // roughness: 0.2,
  // metalness: 0.5,
  envMap: textureCube
})
var cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// Ref: https://discourse.threejs.org/t/round-edged-box/1402
function createBoxWithRoundedEdges (width, height, depth, radius0, smoothness) {
  const shape = new THREE.Shape()
  const eps = 0.00001
  const radius = radius0 - eps
  shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true)
  shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true)
  shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true)
  shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true)
  const geometry = new THREE.ExtrudeBufferGeometry(shape, {
    amount: depth - radius0 * 2,
    bevelEnabled: true,
    bevelSegments: smoothness * 2,
    steps: 1,
    bevelSize: radius,
    bevelThickness: radius0,
    curveSegments: smoothness
  })
  geometry.center()
  return geometry
}

// Create Light
var light = new THREE.DirectionalLight(0xffffff, 3)
light.position.set(-1, 2, 4)
scene.add(light)

var controls = new THREE.OrbitControls(camera, renderer.domElement)

// Animate
function animate () {
  window.requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
}
animate()

// Handle Resize
window.addEventListener('resize', onWindowResize, false)
function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
