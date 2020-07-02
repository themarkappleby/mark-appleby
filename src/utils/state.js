const changeEvent = document.createEvent('Event')
changeEvent.initEvent('statechange', true, true)

window.state = {}

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

function init (initialState) {
  Object.keys(initialState).forEach(key => {
    window.state.set(key, initialState[key])
  })
}

export default init
