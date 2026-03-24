import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function home() {
  const claimPs = [...document.querySelectorAll('.hero-p')]
  const servicesPs = document.querySelectorAll('.services-claim-p')
  const navLinks = [...document.querySelectorAll('.nav-h')]
  const heroH = document.querySelector('.hero-h')
  const logoH = document.querySelector('.logo-h')
  const gallerySection = document.querySelector('.gallery__section')
  // const footerSection = document.querySelector('.footer__section')
  // const flashOverlay = document.querySelector('.flash__overlay')

  window.addEventListener('pageIsPreloaded', () => {
    gsap.to([claimPs, servicesPs], {
      yPercent: -100,
      opacity: 1,
      duration: 1.2,
      ease: 'power1.inOut',
      stagger: 0.05,
    })
    gsap.to(navLinks, {
      yPercent: -100,
      opacity: 1,
      duration: 1.2,
      ease: 'power1.inOut',
    })
    gsap.to([heroH, logoH], {
      opacity: 1,
      duration: 1.2,
      ease: 'power1.inOut',
    })
  })

  // function flash() {
  //   gsap.to(flashOverlay, {
  //     opacity: 1,
  //     duration: 0.02,
  //     onComplete: () => {
  //       gsap.to(flashOverlay, {
  //         delay: 0.12,
  //         opacity: 0,
  //         duration: 0.2,
  //         ease: 'power2.out',
  //       })
  //     },
  //   })
  // }

  gsap.to(heroH, {
    scale: 0.12,
    y: -140,
    scrollTrigger: {
      trigger: gallerySection,
      start: 'bottom bottom',
      end: 'bottom -100%',
      scrub: 1.5,
    },
  })

  gsap.to([claimPs, servicesPs], {
    y: -20,
    scrollTrigger: {
      trigger: gallerySection,
      start: 'top 90%',
      end: 'top 60%',
      scrub: 4,
    },
  })

  // gsap.to(gallerySection, {
  //   y: -100,
  //   scrollTrigger: {
  //     trigger: footerSection,
  //     start: 'top bottom',
  //     end: 'top top',
  //     scrub: 1.5,
  //   },
  // })

  // window.addEventListener('click', flash)
}

export default home
