function init (initialState = {}) {
  const changeEvent = document.createEvent('Event')
  changeEvent.initEvent('statechange', true, true)
  window.state = initialState
  window.state.set = (name, newValue) => {
    const previousValue = window.state[name]
    if (previousValue !== newValue) {
      updateBodyClass(previousValue, newValue)
      changeEvent.name = name
      changeEvent.previousValue = previousValue
      changeEvent.value = newValue
      window.dispatchEvent(changeEvent)
    }
    window.state[name] = newValue
  }
}

function updateBodyClass (previousValue, newValue) {
  document.body.classList.remove('scene--' + previousValue)
  document.body.classList.add('scene--' + newValue)
}

export default init
