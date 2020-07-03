const changeEvent = document.createEvent('Event')
changeEvent.initEvent('statechange', true, true)

const APPLY_AS_BODY_CLASS = ['scene']

window.state = {}

window.state.set = (name, newValue) => {
  const previousValue = window.state[name]
  if (previousValue !== newValue) {
    if (APPLY_AS_BODY_CLASS.indexOf(name) > -1) {
      updateBodyClass(name, previousValue, newValue)
    }
    changeEvent.name = name
    changeEvent.previousValue = previousValue
    changeEvent.value = newValue
    window.dispatchEvent(changeEvent)
  }
  window.state[name] = newValue
}

function updateBodyClass (name, previousValue, newValue) {
  document.body.classList.remove(`${name}--${previousValue}`)
  document.body.classList.add(`${name}--${newValue}`)
}

function init (initialState) {
  Object.keys(initialState).forEach(key => {
    window.state.set(key, initialState[key])
  })
}

export default init
