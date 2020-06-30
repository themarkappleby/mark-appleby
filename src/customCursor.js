function init () {
  const el = document.querySelector('.cursor')
  window.addEventListener('mousemove', event => {
    el.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
  })
}

export default init
