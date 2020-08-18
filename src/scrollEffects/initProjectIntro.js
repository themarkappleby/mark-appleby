import gsap from 'gsap'

function initProjectIntro (section) {
  gsap.from(`.${section} .project-intro *`, {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: `.${section} .project-intro`,
      start: 'top 60%',
      once: true
    }
  })
}

export default initProjectIntro
