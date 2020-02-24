export default function rand (min, max, whole) {
  if (Array.isArray(min)) {
    var index = rand(0, min.length, true)
    return min[index]
  } else if (whole) {
    return Math.floor(Math.random() * (max - min)) + min
  } else {
    return Math.random() * (max - min) + min
  }
}
