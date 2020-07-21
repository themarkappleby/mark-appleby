function scrollToBottom (cb) {
  alert('scrollToBottom START')
  // ref: https://stackoverflow.com/a/55686711/918060
  const offset = document.body.scrollHeight
  function onScroll () {
    const end = window.pageYOffset + window.innerHeight
    if (offset === end) {
      window.removeEventListener('scroll', onScroll)
      alert('scrollToBottom END')
      window.setTimeout(cb)
    }
  }
  window.addEventListener('scroll', onScroll)
  onScroll()
  window.setTimeout(() => {
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    })
  }, 100)
}

export default scrollToBottom
