import gsap from 'gsap'

function cardIntros () {
  gsap.utils.toArray('.card').forEach(card => {
    const cardItems = card.querySelectorAll('.card-item')
    const cardImage = card.querySelector('.card-image')
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        toggleActions: 'restart none none pause'
      }
    })
    tl.from(card, {
      y: 50,
      scale: 1.1,
      opacity: 0,
      duration: 0.5,
      ease: 'power1'
    })
    tl.from(cardImage, {
      x: -50,
      opacity: 0,
      duration: 1.2,
      ease: 'power1'
    }, 0)
    tl.from(cardItems, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power1'
    }, 0.5)
  })
}

export default cardIntros