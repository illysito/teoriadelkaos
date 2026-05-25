import gsap from 'gsap'

function photoIn() {
  const projectHeadings = [...document.querySelectorAll('.foto-project-h')]
  const projectMeta = [...document.querySelectorAll('.foto-meta-p')]
  const projectDescriptions = [...document.querySelectorAll('.foto-desc-p')]
  const arrows = [...document.querySelectorAll('.selection-arrow')]
  const uiWrapper = document.querySelector('.foto__scroll__section')
  // nav (maybe refactor later!)
  const logoH = document.querySelector('.logo-h')
  const navH = [...document.querySelectorAll('.nav-h')]

  gsap.to(logoH, {
    delay: 0.2,
    opacity: 1,
    duration: 1.2,
    ease: 'power1.inOut',
  })

  gsap.to(navH, {
    delay: 0.2,
    yPercent: -100,
    opacity: 1,
    duration: 1.2,
    ease: 'power1.inOut',
  })

  // MAIN PHOTO STUFF

  gsap.to(uiWrapper, {
    delay: 0.2,
    opacity: 1,
    duration: 1.2,
    ease: 'power1.inOut',
  })

  arrows.forEach((arrow) => {
    if (arrow.classList.contains('is--active')) {
      gsap.to(arrow, {
        delay: 0.4,
        opacity: 1,
        duration: 1.8,
        ease: 'power1.inOut',
      })
    }
  })

  projectHeadings.forEach((h) => {
    gsap.to(h, {
      delay: 0.2,
      yPercent: -100,
      opacity: 1,
      duration: 1.2,
      ease: 'power1.inOut',
    })
  })

  projectMeta.forEach((h) => {
    const wrapper = document.createElement('div')

    wrapper.style.overflow = 'hidden'
    wrapper.style.display = 'block'

    h.parentNode.insertBefore(wrapper, h)
    wrapper.appendChild(h)

    gsap.to(h, {
      delay: 0.2,
      yPercent: -100,
      opacity: 1,
      duration: 1.2,
      ease: 'power1.inOut',
    })
  })

  projectDescriptions.forEach((h) => {
    const wrapper = document.createElement('div')

    wrapper.style.overflow = 'hidden'
    wrapper.style.display = 'block'

    h.parentNode.insertBefore(wrapper, h)
    wrapper.appendChild(h)

    gsap.to(h, {
      delay: 0.2,
      yPercent: -100,
      opacity: 1,
      duration: 1.2,
      ease: 'power1.inOut',
    })
  })
}

export default photoIn
