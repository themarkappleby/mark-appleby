import gsap from 'gsap'

const SIDE_BY_SIDE_BP = 1000

function initScrollIndicator (item) {
  const hero = item.closest('.hero')
  item.style.zIndex = 5
  item.addEventListener('click', e => {
    gsap.to(window, {
      duration: window.outerWidth >= SIDE_BY_SIDE_BP ? 2.5 : 1.25,
      ease: 'power4.out',
      scrollTo: {
        y: hero.clientHeight - 180,
        autoKill: window.outerWidth >= SIDE_BY_SIDE_BP
      }
    })
  })
}

export default initScrollIndicator
