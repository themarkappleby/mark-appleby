function initScrollIndicator (item) {
  const hero = item.closest('.hero')
  item.style.zIndex = 5
  item.addEventListener('click', e => {
    window.scrollTo({
      top: hero.clientHeight - 250,
      behavior: 'smooth'
    })
  })
}

export default initScrollIndicator
