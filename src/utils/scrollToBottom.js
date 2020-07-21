function scrollToBottom (cb) {
  alert('scrollToBottom 1')
  // ref: https://stackoverflow.com/a/55686711/918060
  const offset = document.body.scrollHeight
  alert(offset)
  function onScroll () {
    const end = window.pageYOffset + window.innerHeight
    if (offset === end) {
      window.removeEventListener('scroll', onScroll)
      window.setTimeout(cb)
    }
  }
  window.addEventListener('scroll', onScroll)
  onScroll()
  alert('scrollToBottom 2')
  window.setTimeout(() => {
    alert('scrollToBottom 3')
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    })
  }, 100)
}

export default scrollToBottom
