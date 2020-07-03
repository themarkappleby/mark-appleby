export function simulateProgress () {
  const interval = setInterval(() => {
    const progress = getProgress()
    if (progress > 90) {
      clearInterval(interval)
    } else {
      addProgress(1.5)
    }
  }, 100)
}

export function addProgress (amount) {
  const el = document.querySelector('.progress')
  const val = el.getAttribute('value') * 100
  const newAmount = (val + amount) / 100
  el.setAttribute('value', newAmount)
}

export function getProgress () {
  const el = document.querySelector('.progress')
  const val = el.getAttribute('value') * 100
  return val
}
