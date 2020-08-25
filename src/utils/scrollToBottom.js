import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

function scrollToBottom (cb) {
  const distance = distanceFromBottom()
  const duration = distance * 0.003
  gsap.to(window, {
    duration,
    scrollTo: {
      y: 'max',
      autoKill: false
    }
  })
  window.setTimeout(cb, duration)
}

function distanceFromBottom () {
  const scrolled = window.scrollY + window.innerHeight
  const height = document.body.scrollHeight
  return height - scrolled
}

export default scrollToBottom
