function initScrollIndicator (item) {
  const hero = item.closest('.hero')
  item.style.zIndex = 5
  item.addEventListener('click', e => {
    console.log('click')
    window.scrollTo({
      top: hero.clientHeight - 300,
      behavior: 'smooth'
    })
  })
}

export default initScrollIndicator
