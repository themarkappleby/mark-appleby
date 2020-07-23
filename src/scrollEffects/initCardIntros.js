import gsap from 'gsap'

function cardIntros (section) {
  if (window.innerWidth > 960) {
    gsap.utils.toArray(`.${section} .card`).forEach(card => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 75%'
        }
      })
      tl.from(card, {
        y: 50,
        scale: 1.1,
        opacity: 0,
        duration: 0.7,
        ease: 'power1'
      })
      tl.from(card.querySelectorAll('.card-item'), {
        opacity: 0,
        y: 16,
        duration: 0.4,
        stagger: 0.2,
        ease: 'power1.out'
      })
    })
  }
}

export default cardIntros
