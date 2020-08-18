import gsap from 'gsap'

function initScrollIndicator (item) {
  const hero = item.closest('.hero')
  item.style.zIndex = 5
  item.addEventListener('click', e => {
    gsap.to(window, {
      duration: 2.5,
      ease: 'power4.out',
      scrollTo: {
        y: hero.clientHeight - 180,
        autoKill: true
      }
    })
  })
}

export default initScrollIndicator
