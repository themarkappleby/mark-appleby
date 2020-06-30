function rand (min, max, whole = true) {
  if (Array.isArray(min)) {
    return min[Math.floor(Math.random() * min.length)]
  } else {
    if (whole) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    } else {
      var range = max - min
      var foo = Math.random()
      var bar = foo * range
      var baz = bar + min
      return baz
    }
  }
}

export default rand
