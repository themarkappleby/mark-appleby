/* global window requestAnimationFrame THREE */

var camera, scene, renderer

init()
animate()

function init () {
  // Create Renderer
  renderer = new THREE.WebGLRenderer({
    alpha: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  // Create Scene
  scene = new THREE.Scene()

  // Create Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 200)

  // Setup Material
  // Ref: https://jsfiddle.net/f2Lommf5/15357/
  var r = 'https://threejs.org/examples/textures/cube/Bridge2/'
  var urls = [r + 'posx.jpg', r + 'negx.jpg',
    r + 'posy.jpg', r + 'negy.jpg',
    r + 'posz.jpg', r + 'negz.jpg']
  var textureCube = new THREE.CubeTextureLoader().load(urls)
  textureCube.format = THREE.RGBFormat
  var material = new THREE.MeshStandardMaterial({
    color: 0xf4b822,
    roughness: 0,
    metalness: 0.9,
    envMap: textureCube,
    side: THREE.DoubleSide
  })

  // Add leaves
  var leaves = new THREE.Group()
  for (var z = 0; z <= 2; z++) {
    for (var x = 0; x <= 5; x++) {
      var rope = getRope(material)
      rope.position.x = x * 40
      rope.position.y = 0
      rope.position.z = z * 40
      leaves.add(rope)
      for (var y = 0; y <= rand(8, 16); y++) {
        var leaf = getLeaf(material)
        leaf.position.x = x * 40
        leaf.position.y = y * rand(19, 21) * -1
        leaf.position.z = z * 40
        leaf.rotation.y = Math.PI / rand(-0.05, 0.05)
        leaves.add(leaf)
      }
    }
  }
  leaves.position.y = 150
  scene.add(leaves)

  var hemLight = new THREE.HemisphereLight(0xffffbb, 0xffffff, 5)
  scene.add(hemLight)

  var dirLight = new THREE.DirectionalLight(0xffffff, 5)
  dirLight.position.y = 8
  scene.add(dirLight)

  // Setup orbit controls
  var controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.minDistance = 200
  controls.maxDistance = 200
}

function getLeaf (material) {
  var geometry = new THREE.PlaneGeometry(6, 12)
  var leaf1 = new THREE.Mesh(geometry, material)
  var leaf2 = new THREE.Mesh(geometry, material)
  leaf1.rotation.x = Math.PI / 1.1
  leaf2.rotation.x = Math.PI / -1.1
  leaf1.position.z = 1.7
  leaf2.position.z = -1.7
  var leaf = new THREE.Group()
  leaf.add(leaf1)
  leaf.add(leaf2)
  return leaf
}

function getRope (material) {
  var geometry = new THREE.PlaneGeometry(0.3, 600)
  var rope = new THREE.Mesh(geometry, material)
  return rope
}

// Handle Resize
window.addEventListener('resize', onWindowResize, false)
function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// Animate
function animate () {
  requestAnimationFrame(animate)
  render()
}

// Render
function render () {
  renderer.render(scene, camera)
}

// Get a random number
function rand (min, max) {
  return Math.random() * (max - min) + min
}
