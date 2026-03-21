import gsap from 'gsap'

import dispHandler from './disp_handler'

function dispUI() {
  function githubToJsDelivr(permalink) {
    return permalink
      .replace('github.com', 'cdn.jsdelivr.net/gh')
      .replace('/blob/', '@')
  }
  //prettier-ignore
  const canvasUI = document.querySelectorAll('.work-canvas')

  // canvases
  const aboutCanvas = document.querySelector('#about-canvas')
  const derivaCanvas = document.querySelector('#work-deriva-canvas')
  const padmiCanvas = document.querySelector('#work-padmi-canvas')
  const liubaCanvas = document.querySelector('#work-liuba-canvas')
  const barrenaCanvas = document.querySelector('#work-barrrena-canvas')
  const cachanchanCanvas = document.querySelector('#work-cachanchan-canvas')
  const postersCanvas = document.querySelector('#work-posters-canvas')

  const p2o = 'power2.out'
  const duration = 0.8

  // Aux arrays
  const updateUniforms = []
  const offsets = []

  // About
  const offsetRefME = { current: 0 }
  // const image1_URL_ME = githubToJsDelivr(
  //   'https://github.com/illysito/illy/blob/4b2380e8efe928758960c126503d94824b64fb30/public/imgs_cdn/fotiwini.jpeg'
  // )
  const image1_URL_ME = githubToJsDelivr(
    'https://github.com/illysito/illy/blob/142a7eaa8ce153930d95af48b995ced0a4a6f9aa/public/imgs_cdn/ME%20MAIN%203.webp'
  )

  const image2_URL_ME = githubToJsDelivr(
    'https://github.com/illysito/illy/blob/4b2380e8efe928758960c126503d94824b64fb30/public/imgs_cdn/fotiwini.jpeg'
  )
  const updateUniformsME = dispHandler(
    aboutCanvas,
    offsetRefME,
    image1_URL_ME,
    image2_URL_ME
  )
  updateUniforms.push(updateUniformsME)
  offsets.push(offsetRefME)

  // Deriva
  const offsetRefLIRIOS = { current: 0 }
  const image1_URL_LIRIOS = githubToJsDelivr(
    'https://github.com/illysito/illy/blob/46e763e5e639f4794f949c3390e286404259a29b/public/imgs_cdn/Deriva-Mobile-MOCKUP.jpg'
  )
  const image2_URL_LIRIOS = githubToJsDelivr(
    'https://github.com/illysito/illy/blob/46e763e5e639f4794f949c3390e286404259a29b/public/imgs_cdn/Deriva-PC-MOCKUP.jpg'
  )
  const updateUniformsLIRIOS = dispHandler(
    derivaCanvas,
    offsetRefLIRIOS,
    image1_URL_LIRIOS,
    image2_URL_LIRIOS
  )
  updateUniforms.push(updateUniformsLIRIOS)
  offsets.push(offsetRefLIRIOS)

  // Padmi
  const offsetRefPADMI = { current: 0 }
  const image1_URL_PADMI = githubToJsDelivr(
    'https://github.com/illysito/illy/blob/4b2380e8efe928758960c126503d94824b64fb30/public/imgs_cdn/WORK%20IMG%20--05.webp'
  )
  const image2_URL_PADMI = githubToJsDelivr(
    'https://github.com/illysito/illy/blob/4b2380e8efe928758960c126503d94824b64fb30/public/imgs_cdn/WORK%20IMG%20--09.webp'
  )
  const updateUniformsPADMI = dispHandler(
    padmiCanvas,
    offsetRefPADMI,
    image1_URL_PADMI,
    image2_URL_PADMI
  )
  updateUniforms.push(updateUniformsPADMI)
  offsets.push(offsetRefPADMI)

  // Liuba
  const offsetRefLIUBA = { current: 0 }
  const image1_URL_LIUBA = githubToJsDelivr(
    'https://github.com/illysito/illy/blob/27ac402bb534bc9916861b9361fc800f5de6ace7/public/imgs_cdn/WORK%20IMG%20--08-08.webp'
  )
  const image2_URL_LIUBA = githubToJsDelivr(
    'https://github.com/illysito/illy/blob/822021800fa75736aa9673784e88eacd2557d0dd/public/imgs_cdn/WORK%20IMG%20--11-11.webp'
  )
  const updateUniformsLIUBA = dispHandler(
    liubaCanvas,
    offsetRefLIUBA,
    image1_URL_LIUBA,
    image2_URL_LIUBA
  )
  updateUniforms.push(updateUniformsLIUBA)
  offsets.push(offsetRefLIUBA)

  // Barrrena
  const offsetRefBARRENA = { current: 0 }
  const image1_URL_BARRENA = githubToJsDelivr(
    'https://github.com/illysito/illy/blob/4b2380e8efe928758960c126503d94824b64fb30/public/imgs_cdn/WORK%20IMG%20--06.webp'
  )
  const image2_URL_BARRENA = githubToJsDelivr(
    'https://github.com/illysito/illy/blob/4b2380e8efe928758960c126503d94824b64fb30/public/imgs_cdn/WORK%20IMG%20--10.webp'
  )
  const updateUniformsBARRENA = dispHandler(
    barrenaCanvas,
    offsetRefBARRENA,
    image1_URL_BARRENA,
    image2_URL_BARRENA
  )
  updateUniforms.push(updateUniformsBARRENA)
  offsets.push(offsetRefBARRENA)

  // Cachanchan
  const offsetRefCACHANCHAN = { current: 0 }
  const image1_URL_CACHANCHAN = githubToJsDelivr(
    'https://github.com/illysito/illy/blob/4b2380e8efe928758960c126503d94824b64fb30/public/imgs_cdn/WORK%20IMG%20-%202%20-05.webp'
  )
  const image2_URL_CACHANCHAN = githubToJsDelivr(
    'https://github.com/illysito/illy/blob/4b2380e8efe928758960c126503d94824b64fb30/public/imgs_cdn/WORK%20IMG%20-%202%20-06.webp'
  )
  const updateUniformsCACHANCHAN = dispHandler(
    cachanchanCanvas,
    offsetRefCACHANCHAN,
    image1_URL_CACHANCHAN,
    image2_URL_CACHANCHAN
  )
  updateUniforms.push(updateUniformsCACHANCHAN)
  offsets.push(offsetRefCACHANCHAN)

  // Posters
  const offsetRefPOSTERS = { current: 0 }
  const image1_URL_POSTERS = githubToJsDelivr(
    'https://github.com/illysito/illy/blob/a092342a2a0be47bdc85d62434c3562abca9dc76/public/imgs_cdn/WORK-12-11.webp'
  )
  const image2_URL_POSTERS = githubToJsDelivr(
    'https://github.com/illysito/illy/blob/963f3776fb40172e02f93e017839a7d30c11baa7/imgs/PalestineTatreezWork.jpg'
  )
  const updateUniformsPOSTERS = dispHandler(
    postersCanvas,
    offsetRefPOSTERS,
    image1_URL_POSTERS,
    image2_URL_POSTERS
  )
  updateUniforms.push(updateUniformsPOSTERS)
  offsets.push(offsetRefPOSTERS)

  function hoverIn(index) {
    gsap.to(offsets[index], {
      current: 1,
      duration: duration,
      ease: p2o,
      onUpdate: updateUniforms[index],
    })
    gsap.to(canvasUI[index], {
      borderRadius: 12,
      duration: duration - 0.2,
      ease: p2o,
    })
  }

  function hoverOut(index) {
    gsap.to(offsets[index], {
      current: 0,
      duration: duration,
      ease: p2o,
      onUpdate: updateUniforms[index],
    })
    gsap.to(canvasUI[index], {
      borderRadius: 0,
      duration: duration - 0.2,
      ease: p2o,
    })
  }

  canvasUI.forEach((canvas, index) => {
    canvas.addEventListener('mouseover', () => {
      hoverIn(index)
    })

    canvas.addEventListener('mouseleave', () => {
      hoverOut(index)
    })
  })
}

export default dispUI
