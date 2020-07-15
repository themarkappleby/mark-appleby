export function show (elem) {
  document.querySelector(elem).classList.remove('hide')
}

export function hide (elem) {
  document.querySelector(elem).classList.add('hide')
}
