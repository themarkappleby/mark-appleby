/* global rand */

import * as THREE from 'three'
import Body from './body'
import Light from './light'

export default function Robot (x = 0, y = 1, z = 0) {
  var robot = new THREE.Group()

  var body = Body()
  // var pos = getPositions(body)
  robot.add(body)

  /*
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
  */

  robot.position.set(x, y, z)
  return robot
}

/*
function getPositions (body) {
  const SEGMENTS = 3
  var w = body.geometry.parameters.width / 2
  var h = body.geometry.parameters.height / 2
  var d = body.geometry.parameters.depth / 2
  var o = rand(0.15, 0.25) // offset

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
*/

var segments = get3DSegments([-3, -2, -1], [3, 2, 1])
console.log(segments)

function get3DSegments (start, end, parts = 5) {
  var f = {
    left: start[0],
    right: end[0],
    top: end[1],
    bottom: start[1],
    front: start[2],
    back: end[2]
  }

  var front = get2DSegments(
    [f.bottom, f.left],
    [f.top, f.right]
  )
  front.forEach(item => {
    item.forEach(inner => {
      inner.push(f.front)
    })
  })

  var back = get2DSegments(
    [f.bottom, f.left],
    [f.top, f.right]
  )
  back.forEach(item => {
    item.forEach(inner => {
      inner.push(f.back)
    })
  })

  // TODO
  var left = get2DSegments(
    [f.bottom, f.left],
    [f.top, f.right]
  )
  left.forEach(item => {
    item.forEach(inner => {
      inner.push(f.back)
    })
  })

  var segments = {
    front,
    back,
    left
  }
  return segments
}

function get2DSegments (start, end, parts = 5) {
  var segments = []
  var xSegments = get1DSegments(start[0], end[0], parts)
  var ySegments = get1DSegments(start[1], end[1], parts)
  xSegments.forEach(x => {
    segments.push([])
    ySegments.forEach(y => {
      segments[segments.length - 1].push([
        x, y
      ])
    })
  })
  return segments
}

function get1DSegments (start, end, parts = 5) {
  var segments = []
  var distance = end - start
  var step = distance / (parts - 1)
  for (var i = 0; i < parts; i++) {
    segments.push(start + (step * i))
  }
  return segments
}
