import gsap from 'gsap'

function screenshotScrolling () {
  gsap.utils.toArray('.project-previewFrame').forEach(frame => {
    const image = frame.children[0]
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: frame,
        scrub: 0.25,
        start: 'top 40%',
        end: 'bottom top'
      }
    })
    tl.to(image, { yPercent: -40 })
    tl.to(frame, { rotationY: -5, y: -125 }, 0)
  })
  gsap.utils.toArray('.project-previewBackground').forEach(bkg => {
    gsap.from(bkg, {
      scrollTrigger: {
        trigger: bkg,
        scrub: true
      },
      marginTop: -100,
      opacity: 0,
      scale: 0.9
    })
  })
}

export default screenshotScrolling
