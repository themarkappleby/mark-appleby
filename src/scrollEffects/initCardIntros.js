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
      tl.to(card, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.7
      })
      tl.from(card.querySelectorAll('.card-item'), {
        opacity: 0,
        y: 16,
        duration: 0.4,
        stagger: 0.2
      })
    })
  }
}

export default cardIntros
