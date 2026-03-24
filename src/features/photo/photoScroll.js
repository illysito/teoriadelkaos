import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function photoScroll() {
  const scrollImgs = [...document.querySelectorAll('.foto-carrousel-img')]

  scrollImgs.forEach((img) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: img,
          start: 'top 532px',
          end: 'bottom 522px',
          scrub: true,
        },
      })
      .to(img, { opacity: 1, ease: 'none' }, 0)
      .to(img, { opacity: 0.4, ease: 'none' }, 1)
  })
}

export default photoScroll
