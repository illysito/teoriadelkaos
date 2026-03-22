import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function mousemoveGallery() {
  const imgs = document.querySelectorAll('.img')
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

    imgs.forEach((cont) => {
      cont.dataset.inViewport = 'false'
      observer.observe(cont)
    })
  }
  markIfInViewport()

  // MOUSEMOVE
  let mouseX = 0
  let mouseY = 0

  let targetX = 0
  let targetY = 0

  let currentX = 0
  let currentY = 0

  function lerp(a, b, t) {
    return a + (b - a) * t
  }

  // compute random indexes!
  const amplitudes = []
  imgs.forEach(() => {
    const amplitude = Math.random() * 6
    amplitudes.push(amplitude)
  })

  function animate() {
    // const randomAmp = 300
    // const random = randomAmp * Math.random() - randomAmp / 2

    currentX = lerp(currentX, targetX, 0.008)
    currentY = lerp(currentY, targetY, 0.008)

    imgs.forEach((img, index) => {
      if (img.dataset.inViewport !== 'true') return

      gsap.set(img, {
        x: currentX * amplitudes[index],
        y: currentY * amplitudes[index],
      })
    })

    requestAnimationFrame(animate)
  }
  animate()

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    targetX = gsap.utils.mapRange(0, window.innerWidth, -40, 40, mouseX)

    targetY = gsap.utils.mapRange(0, window.innerHeight, -32, 32, mouseY)
  })
}

export default mousemoveGallery
