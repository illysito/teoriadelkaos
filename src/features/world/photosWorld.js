import gsap from 'gsap'
import * as THREE from 'three'
// import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

import disp_frag_photos from './shaders/fragShaderPhotos'
import vert from './shaders/vertexShader'

function worldPhoto() {
  function githubToJsDelivr(permalink) {
    return permalink
      .replace('github.com', 'cdn.jsdelivr.net/gh')
      .replace('/blob/', '@')
  }

  const canvas = document.getElementById('photo-canvas')
  // Scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x060606)

  // Camera
  const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  )
  camera.position.z = 9

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  })
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))

  // Main Image
  const imgLoader = new THREE.TextureLoader()

  const urls = [
    githubToJsDelivr(
      'https://github.com/illysito/teoriadelkaos/blob/bccebb8d94c4d8193376fc104fbcdbd66d98818b/imgs/cloudsmoke.png'
    ),
    githubToJsDelivr(
      'https://github.com/illysito/teoriadelkaos/blob/17cec003107d6d13a4556ed21aec386397d058b9/imgs/PerlinOmy.jpg'
    ),
    githubToJsDelivr(
      'https://github.com/illysito/teoriadelkaos/blob/17cec003107d6d13a4556ed21aec386397d058b9/imgs/OmyBlackBG.jpg'
    ),
  ]

  function loadTexture(url) {
    return new Promise((resolve, reject) => {
      imgLoader.load(
        url,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace
          texture.minFilter = THREE.LinearFilter
          texture.magFilter = THREE.LinearFilter
          texture.generateMipmaps = false
          resolve(texture)
        },
        undefined,
        reject
      )
    })
  }
  let imgPlane = null

  Promise.all(urls.map(loadTexture)).then(([omy, perlin, bg]) => {
    const planeGeometry = new THREE.PlaneGeometry(0.75, 1)

    const planeMaterial = new THREE.ShaderMaterial({
      fragmentShader: disp_frag_photos,
      vertexShader: vert,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(0.75, 1) },
        u_offset: { value: 0.05 },
        u_mouseX: { value: 0 },
        u_mouseY: { value: 0 },

        u_img: { value: omy },
        u_perlin: { value: perlin },
        u_bg: { value: bg },

        u_mix1: { value: 0.0 },
        u_mix2: { value: 0.0 },
      },
    })

    imgPlane = new THREE.Mesh(planeGeometry, planeMaterial)

    const planeScale = 2.6 * 3
    imgPlane.position.z = 0
    // imgPlane.position.x = -0.4
    imgPlane.scale.set(planeScale, planeScale, planeScale)

    scene.add(imgPlane)
  })

  // Loop
  let counter = 0

  let mouseX = 0
  let mouseY = 0

  let targetX = 0
  let targetY = 0

  let currentX = 0
  let currentY = 0

  function lerp(a, b, t) {
    return a + (b - a) * t
  }

  function animate() {
    currentX = lerp(currentX, targetX, 0.008)
    currentY = lerp(currentY, targetY, 0.008)

    counter += 0.002

    if (imgPlane) {
      imgPlane.material.uniforms.u_time.value = counter
      imgPlane.material.uniforms.u_mouseX.value = currentX
      imgPlane.material.uniforms.u_mouseY.value = currentY
    }

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }
  animate()

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    targetX = gsap.utils.mapRange(0, window.innerWidth, -0.12, 0.12, mouseX)

    targetY = gsap.utils.mapRange(0, window.innerHeight, -0.08, 0.08, mouseY)
  })

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(canvas.clientWidth / canvas.clientHeight)
  })

  // Transition OUT
  window.addEventListener('transitionIsNeeded', () => {
    console.log('event received')
    gsap.to(imgPlane.material.uniforms.u_offset, {
      delay: 0.2,
      value: 1,
      duration: 1.2,
    })
    gsap.to(imgPlane.position, {
      delay: 0.2,
      x: -1,
      duration: 2.4,
      ease: 'power2.in',
    })
  })

  // Transition IN
  window.addEventListener('pageIsPreloaded', () => {
    console.log('event received')
    gsap.to(imgPlane.material.uniforms.u_offset, {
      value: 0,
      duration: 1.2,
    })
    gsap.to(imgPlane.position, {
      x: 0,
      duration: 2.4,
      ease: 'power2.inOut',
    })
  })
}

export default worldPhoto
