/* global rand */

import * as THREE from 'three'
import * as CANNON from 'cannon'
import Body from './body'
import Wheel from './wheel'
import decals from './decals'
import materials from '../utils/materials'
import { initJointMatrix, getRandomJoints } from '../utils/joints'

export default function Robot (x = 0, y = 0, z = 0) {
  var colour = materials.colours[rand(Object.keys(materials.colours))]
  var robot = new THREE.Group()
  robot.name = 'Robot'
  var body = Body(
    rand(0.4, 1.2),
    rand(0.4, 1.2),
    rand(0.4, 1.2)
  )
  robot.add(body)

  var jointMatrix = initJointMatrix({
    mesh: body,
    parts: 4,
    inset: rand(0.1, 0.3)
  })

  // Position specific part at bottom left on front face for testing
  var testPart = Wheel(colour)
  testPart.position.set(...jointMatrix.front.vertices[0][0])
  testPart.rotation.set(...jointMatrix.front.rotation)
  robot.add(testPart)

  /*
  var parts = [Wheel]
  Object.keys(decals).forEach(key => {
    parts.push(decals[key])
  })

  var randomJoints = getRandomJoints(jointMatrix, rand(1, 3, true))
  randomJoints.forEach(joint => {
    var partFactory = rand(parts)
    var part = partFactory(colour)
    part.position.set(...joint.position)
    part.rotation.set(...joint.rotation)
    robot.add(part)
  })
  */

  robot.position.set(x, y, z)

  robot.physics = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(
      body.geometry.parameters.width / 2,
      body.geometry.parameters.height / 2,
      body.geometry.parameters.depth / 2
    )),
    mass: 30
    /*
    angularVelocity: new CANNON.Vec3(5, 2, 1),
    angularDamping: 0.5
    */
  })
  robot.physics.position.copy(robot.position)
  robot.physics.quaternion.copy(robot.quaternion)

  return robot
}
