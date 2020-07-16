import gsap from 'gsap'

function screenshotScrolling (section) {
  gsap.utils.toArray(`.${section} .project-previewFrame`).forEach(frame => {
    const image = frame.children[0]
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: frame,
        scrub: 0.25,
        start: 'top bottom',
        end: 'bottom top'
      }
    })
    if (window.innerWidth > 960) {
      tl.to(frame, {
        rotationY: -20,
        y: -125
      }, 0)
    } else {
      tl.to(frame, {
        rotationY: -20
      }, 0)
    }
    tl.to(image, {
      yPercent: -25,
      delay: 0.2
    }, 0)
  })

  if (window.innerWidth > 960) {
    gsap.utils.toArray(`.${section} .project-previewBackground`).forEach(bkg => {
      gsap.to(bkg, {
        scrollTrigger: {
          trigger: bkg,
          scrub: true
        },
        yPercent: -80,
        opacity: 0.8,
        scale: 1.2
      })
    })
  }
}

export default screenshotScrolling
