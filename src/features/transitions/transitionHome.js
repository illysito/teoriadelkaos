import gsap from 'gsap'

function transitionHome() {
  const imgs = [...document.querySelectorAll('.img-wrapper')]
  const arrows = [...document.querySelectorAll('.link-arrow')]
  const txts = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p')
  const links = document.querySelectorAll('a')
  console.log(txts)

  let isClicked = false
  function fadeOut(href) {
    // imgs
    gsap.to(imgs, {
      opacity: 0,
      x: -20,
      duration: 1.2,
      stagger: {
        each: 0.01,
        from: 'random',
      },
      ease: 'expo.inOut',
    })
    // txts
    gsap.to(txts, {
      opacity: 0,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.delayedCall(0.2, () => {
          window.location.href = href
        })
      },
    })
    // arrows
    gsap.to(arrows, {
      opacity: 0,
      duration: 1.2,
      ease: 'power2.inOut',
    })
    window.dispatchEvent(new Event('transitionIsNeeded'))
  }

  function fadeIn() {
    gsap.to(imgs, {
      opacity: 1,
      duration: 0.4,
      stagger: {
        each: 0.01,
        from: 'random',
      },
    })
    gsap.to(txts, {
      opacity: 1,
      duration: 1.2,
      ease: 'power2.inOut',
    })
  }

  links.forEach((l) => {
    l.addEventListener('click', (e) => {
      e.preventDefault()
      const href = e.currentTarget.href
      if (!isClicked) {
        fadeOut(href)
      } else {
        fadeIn()
      }
      isClicked = !isClicked
    })
  })
}

export default transitionHome
