function displaySize (e) {
  const width = window.innerWidth
  const height = window.innerHeight
  sizeDisplay.innerText = `${width}  /  ${height}`
}
const sizeDisplay = document.getElementById('size')
if (sizeDisplay) {
  window.addEventListener('resize', displaySize)
  window.addEventListener('load', displaySize)
}
