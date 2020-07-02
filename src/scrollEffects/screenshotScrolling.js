import gsap from 'gsap'

function screenshotScrolling () {
  gsap.utils.toArray('.project-previewFrame').forEach(frame => {
    const image = frame.children[0]
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: frame,
        scrub: true,
        start: 'top center'
      }
    })
    tl.to(image, { yPercent: -70 })
    tl.to(frame, { rotationY: -5 }, 0)
  })
}

export default screenshotScrolling
