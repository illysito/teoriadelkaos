import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function photoScroll() {
  const scrollImgs = [...document.querySelectorAll('.foto-carrousel-img')]

  let index = -1
  scrollImgs.forEach((img) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: img,
          start: 'top 532px',
          end: 'bottom 522px',
          scrub: true,

          onEnter: () => {
            index++
            showIndex()
          },

          onEnterBack: () => {
            index--
            showIndex()
          },
        },
      })
      .to(img, { opacity: 1, ease: 'none' }, 0)
      .to(img, { opacity: 0.4, ease: 'none' }, 1)
  })

  function showIndex() {
    window.dispatchEvent(
      new CustomEvent('pictureHasChanged', {
        detail: {
          index: index,
        },
      })
    )
  }
}

export default photoScroll
