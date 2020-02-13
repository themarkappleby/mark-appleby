/* global rand */
import * as THREE from 'three'

/*
initJointMatrix
Given a box geometry return a 3D matrix of vertices mapped against the
provided geometry. "Parts" determines the numbers of rows/columns
per face. And "inset" determines how far from the edges the vertices
should start.
*/
export function initJointMatrix ({ mesh, parts, inset }) {
  const { width, height, depth } = mesh.geometry.parameters
  var joints = get3DSegments(
    [width / -2, height / -2, depth / -2],
    [width / 2, height / 2, depth / 2],
    parts, inset
  )
  return joints
}

/*
getRandomJoints
Given a 3D joint matrix, return an array of N unique random joints.
Where N is defined by count.
*/
export function getRandomJoints (matrix, count) {
  var joints = []
  for (var i = 0; i < count; i++) {
    var randomJoint = getRandomJoint(matrix)
    if (randomJoint.face === 'bottom') {
      i--
    } else {
      var unique = true
      joints.forEach(joint => {
        if (sameJoint(randomJoint, joint)) { unique = false }
      })
      if (unique) {
        joints.push(randomJoint)
      } else {
        i--
      }
    }
  }
  return joints
}

/*
getRandomJoint
Given a 3D joint matrix, return a single random joint.
*/
export function getRandomJoint (matrix) {
  var faceName = rand(Object.keys(matrix))
  var face = matrix[faceName]
  var row = rand(face.vertices)
  var joint = rand(row)
  return {
    face: faceName,
    position: joint,
    rotation: face.rotation
  }
}

/*
sameJoint
Given joint1 and joint2 return either "true" if the two are identical,
or "false" if they are not.
*/
function sameJoint (joint1, joint2) {
  console.log(joint1, joint2)
  var same = true
  joint1.position.forEach((pos, i) => {
    if (joint2.position[i] !== pos) same = false
  })
  joint1.rotation.forEach((rot, i) => {
    if (joint2.rotation[i] !== rot) same = false
  })
  return same
}

function get3DSegments (start, end, parts, inset) {
  var f = {
    left: start[0],
    right: end[0],
    top: end[1],
    bottom: start[1],
    back: start[2],
    front: end[2]
  }

  var front = get2DSegments(
    [f.left, f.bottom],
    [f.right, f.top],
    parts, inset
  )
  front.forEach(item => {
    item.forEach(inner => {
      inner.push(f.front)
    })
  })

  var back = get2DSegments(
    [f.left, f.bottom],
    [f.right, f.top],
    parts, inset
  )
  back.forEach(item => {
    item.forEach(inner => {
      inner.push(f.back)
    })
  })

  var left = get2DSegments(
    [f.bottom, f.front],
    [f.top, f.back],
    parts, inset
  )
  left.forEach(item => {
    item.forEach(inner => {
      inner.unshift(f.left)
    })
  })

  var right = get2DSegments(
    [f.bottom, f.front],
    [f.top, f.back],
    parts, inset
  )
  right.forEach(item => {
    item.forEach(inner => {
      inner.unshift(f.right)
    })
  })

  var top = get2DSegments(
    [f.left, f.front],
    [f.right, f.back],
    parts, inset
  )
  top.forEach(item => {
    item.forEach(inner => {
      inner.splice(1, 0, f.top)
    })
  })

  var bottom = get2DSegments(
    [f.left, f.front],
    [f.right, f.back],
    parts, inset
  )
  bottom.forEach(item => {
    item.forEach(inner => {
      inner.splice(1, 0, f.bottom)
    })
  })

  var segments = {
    front: {
      rotation: [0, 0, 0],
      vertices: front
    },
    back: {
      rotation: [0, THREE.Math.degToRad(180), 0],
      vertices: back
    },
    left: {
      rotation: [0, THREE.Math.degToRad(90), 0],
      vertices: left
    },
    right: {
      rotation: [0, THREE.Math.degToRad(-90), 0],
      vertices: right
    },
    top: {
      rotation: [THREE.Math.degToRad(-90), 0, 0],
      vertices: top
    },
    bottom: {
      rotation: [THREE.Math.degToRad(90), 0, 0],
      vertices: bottom
    }
  }
  return segments
}

function get2DSegments (start, end, parts, inset) {
  var segments = []
  var xSegments = get1DSegments(start[0], end[0], parts, inset)
  var ySegments = get1DSegments(start[1], end[1], parts, inset)
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

function get1DSegments (start, end, parts = 5, inset = 0) {
  if (start < end) {
    start += inset; end -= inset
  } else {
    start -= inset; end += inset
  }
  var segments = []
  var distance = end - start
  var step = distance / (parts - 1)
  for (var i = 0; i < parts; i++) {
    segments.push(start + (step * i))
  }
  return segments
}
