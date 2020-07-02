function scrollTo (offset, cb) {
  // ref: https://stackoverflow.com/a/55686711/918060
  function onScroll () {
    const end = window.pageYOffset + window.innerHeight
    if (offset === end) {
      window.removeEventListener('scroll', onScroll)
      window.setTimeout(cb)
    }
  }
  window.addEventListener('scroll', onScroll)
  onScroll()
  window.scrollTo({
    top: offset,
    behavior: 'smooth'
  })
}

export default scrollTo
