function init (initialState) {
  const changeEvent = document.createEvent('Event')
  changeEvent.initEvent('statechange', true, true)
  window.state = initialState
  window.state.set = (name, newValue) => {
    const previousValue = window.state[name]
    if (previousValue !== newValue) {
      changeEvent.name = name
      changeEvent.previousValue = previousValue
      changeEvent.value = newValue
      window.dispatchEvent(changeEvent)
    }
    window.state[name] = newValue
  }
}

export default init
