import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function parallax() {
  const imgContainers = document.querySelectorAll('.img-wrapper')
  // const imgs = document.querySelectorAll('.img')

  function markIfInViewport() {
    // OBSERVER
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.dataset.inViewport = entry.isIntersecting
            ? 'true'
            : 'false'

          // console.log(entry)
        })
      },
      {
        root: null, // viewport
        rootMargin: '80px',
        threshold: 0.0, // counts as visible when 10% is inside viewport
      }
    )

    imgContainers.forEach((cont) => {
      cont.dataset.inViewport = 'false'
      observer.observe(cont)
    })
  }
  markIfInViewport()

  // PARALLAX
  imgContainers.forEach((cont) => {
    const randomAmp = 280
    const random = randomAmp * Math.random() - randomAmp / 2
    gsap.to(cont, {
      y: 160 + random,
      scrollTrigger: {
        trigger: cont,
        start: 'top 120%',
        end: 'bottom top',
        scrub: true,
      },
    })
  })
}

export default parallax
