import gsap from 'gsap'

function screenshotScrolling () {
  gsap.utils.toArray('.project-previewFrame').forEach(frame => {
    const image = frame.children[0]
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: frame,
        scrub: 0.25,
        start: 'top 33%'
      }
    })
    tl.to(image, { yPercent: -40 })
    tl.to(frame, { rotationY: -5 }, 0)
  })
}

export default screenshotScrolling
