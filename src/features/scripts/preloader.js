import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(CustomEase)

function preloader() {
  const preloader = document.querySelector('.preloader__section')
  const preloaderBars = [...document.querySelectorAll('.preloader-bar')]
  const directions = [-1, 1]

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(preloader, { zIndex: -1 })
    },
  })

  preloaderBars.forEach((p, i) => {
    tl.to(
      p,
      {
        delay: 0.4,
        yPercent: directions[i] * 4,
        ease: 'expo.inOut',
        duration: 0.4,
      },
      0
    )
      .to(
        p,
        {
          delay: 0.2,
          yPercent: 0,
          ease: 'power2.inOut',
          duration: 0.4,
        },
        '>'
      )
      .to(
        p,
        {
          delay: 0.2,
          yPercent: directions[i] * 100,
          ease: CustomEase.create(
            'custom',
            'M0,0 C0.25,0 0.355,0.012 0.396,0.039 0.489,0.099 0.466,0.292 0.498,0.502 0.532,0.73 0.535,0.88 0.589,0.928 0.628,0.962 0.698,1 1,1'
          ),
          duration: 2,
        },
        '>'
      )
  })

  tl.call(
    () => {
      window.dispatchEvent(new Event('pageIsPreloaded'))
    },
    null,
    tl.duration() - 1.2
  )
}

export default preloader
