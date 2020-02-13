/* global rand */

import * as THREE from 'three'
import * as CANNON from 'cannon'
import Body from './body'
import Light from './light'
import Tube from './tube'
import materials from '../materials'
import { initJointMatrix, getRandomJoints } from '../utils/joints'

export default function Robot (x = 0, y = 0, z = 0) {
  var decals = [Light, Tube]
  var colour = materials.colours[rand(Object.keys(materials.colours))]
  var robot = new THREE.Group()
  var body = Body()
  robot.add(body)

  var jointMatrix = initJointMatrix({
    mesh: body,
    parts: 4,
    inset: rand(0.2, 0.4)
  })

  var randomJoints = getRandomJoints(jointMatrix, rand(1, 10, true))
  randomJoints.forEach(joint => {
    var decal = rand(decals)(colour)
    decal.position.set(...joint.position)
    decal.rotation.set(...joint.rotation)
    robot.add(decal)
  })

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
