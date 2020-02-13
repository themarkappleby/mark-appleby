/* global rand */

import * as THREE from 'three'
import Body from './body'
import Light from './light'
import getBoxSegments from '../utils/getBoxSegments'

export default function Robot (x = 0, y = 1, z = 0) {
  var robot = new THREE.Group()

  var body = Body()
  robot.add(body)

  var segments = getBoxSegments({
    mesh: body,
    parts: 4,
    inset: rand(0.1, 0.3)
  })
  Object.keys(segments).forEach(face => {
    var rotation = segments[face].rotation
    segments[face].vertices.forEach(x => {
      x.forEach(y => {
        var light = Light()
        light.position.set(...y)
        light.rotation.set(...rotation)
        robot.add(light)
      })
    })
  })

  robot.position.set(x, y, z)
  return robot
}
