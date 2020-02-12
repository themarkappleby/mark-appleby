/* global rand */

import * as THREE from 'three'
import Body from './body'
import Light from './light'

export default function Robot (x = 0, y = 1, z = 0) {
  var robot = new THREE.Group()

  var body = Body()
  var pos = getPositions(body)
  robot.add(body)

  Object.keys(pos).forEach(face => {
    Object.keys(pos[face]).forEach(horz => {
      if (horz === 'rotation') return
      Object.keys(pos[face][horz]).forEach(vert => {
        var light = Light()
        light.position.set(...pos[face][horz][vert])
        light.rotation.set(...pos[face].rotation)
        robot.add(light)
      })
    })
  })

  robot.position.set(x, y, z)
  return robot
}

function getPositions (body) {
  var w = body.geometry.parameters.width / 2
  var h = body.geometry.parameters.height / 2
  var d = body.geometry.parameters.depth / 2
  var o = rand(0.15, 0.25)

  return {
    front: {
      rotation: [0, 0, 0],
      left: {
        top: [w * -1 + o, h - o, d],
        middle: [w * -1 + o, 0, d],
        bottom: [w * -1 + o, h * -1 + o, d]
      },
      middle: {
        top: [0, h - o, d],
        middle: [0, 0, d],
        bottom: [0, h * -1 + o, d]
      },
      right: {
        top: [w - o, h - o, d],
        middle: [w - o, 0, d],
        bottom: [w - o, h * -1 + o, d]
      }
    },
    left: {
      rotation: [0, THREE.Math.degToRad(90), 0],
      left: {
        top: [w * -1, h - o, d * -1 + o],
        middle: [w * -1, 0, d * -1 + o],
        bottom: [w * -1, h * -1 + o, d * -1 + o]
      },
      middle: {
        top: [w * -1, h - o, 0],
        middle: [w * -1, 0, 0],
        bottom: [w * -1, h * -1 + o, 0]
      },
      right: {
        top: [w * -1, h - o, d - o],
        middle: [w * -1, 0, d - o],
        bottom: [w * -1, h * -1 + o, d - o]
      }
    }
  }
}
