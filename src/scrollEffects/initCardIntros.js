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
}

export default cardIntros
