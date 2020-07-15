import gsap from 'gsap'

function cardIntros (section) {
  gsap.utils.toArray(`.${section} .card`).forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        toggleActions: 'restart reset restart reset'
      },
      y: 50,
      scale: 1.1,
      opacity: 0,
      duration: 1.5,
      ease: 'power1'
    })
  })
}

export default cardIntros
