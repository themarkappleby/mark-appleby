import gsap from 'gsap'

function cardIntros () {
  gsap.utils.toArray('.card').forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        toggleActions: 'restart none none pause'
      },
      y: 50,
      scale: 1.1,
      opacity: 0,
      duration: 0.5,
      ease: 'power1'
    })
  })
  gsap.utils.toArray('.card-item').forEach(cardItem => {
    gsap.from(cardItem, {
      scrollTrigger: {
        trigger: cardItem,
        toggleActions: 'restart none none pause'
      },
      opacity: 0,
      y: 30,
      duration: 1.5,
      ease: 'power4.out'
    }, 0.5)
  })
}

export default cardIntros
