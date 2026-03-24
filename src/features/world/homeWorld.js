import gsap from 'gsap'
import * as THREE from 'three'
// import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

import disp_frag from './shaders/fragShader'
import vert from './shaders/vertexShader'

function worldHome() {
  function githubToJsDelivr(permalink) {
    return permalink
      .replace('github.com', 'cdn.jsdelivr.net/gh')
      .replace('/blob/', '@')
  }

  const canvas = document.getElementById('omy-canvas')
  // Scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x060606)

  // Camera
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
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
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))

  // Main Image
  const imgLoader = new THREE.TextureLoader()

  const urls = [
    githubToJsDelivr(
      'https://github.com/illysito/teoriadelkaos/blob/1e8b8592e633968e12a5df2fb697411a2a0092fe/imgs/Omy4.jpg'
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
      fragmentShader: disp_frag,
      vertexShader: vert,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(0.75, 1) },
        u_offset: { value: 0.5 },
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

    const planeScale = 1.6 * 3
    imgPlane.position.z = 0
    imgPlane.position.x = -0.4
    imgPlane.scale.set(planeScale, planeScale, planeScale)

    scene.add(imgPlane)
  })
  // imgLoader.load(
  //   // githubToJsDelivr(
  //   //   'https://github.com/illysito/teoriadelkaos/blob/de8b6cce72ec738387aa41fbe097f74cd8feff49/imgs/vivi.jpg'
  //   // ),
  //   githubToJsDelivr(
  //     'https://github.com/illysito/teoriadelkaos/blob/1e8b8592e633968e12a5df2fb697411a2a0092fe/imgs/Omy4.jpg'
  //   ),
  //   (texture) => {
  //     texture.colorSpace = THREE.SRGBColorSpace
  //     // texture.colorSpace = THREE.SRGBColorSpace
  //     texture.minFilter = THREE.LinearFilter
  //     texture.magFilter = THREE.LinearFilter
  //     texture.generateMipmaps = false

  //     // const distance = 2 // distance from camera
  //     // const fov = camera.fov * (Math.PI / 180)
  //     // const height = 2 * Math.tan(fov / 2) * distance
  //     // const width = height * camera.aspect

  //     const planeGeometry = new THREE.PlaneGeometry(0.75, 1)
  //     // const planeMaterial = new THREE.MeshBasicMaterial({
  //     //   map: texture,
  //     //   // alphaTest: 0.1,
  //     // })
  //     const planeMaterial = new THREE.ShaderMaterial({
  //       fragmentShader: disp_frag,
  //       vertexShader: vert,
  //       uniforms: {
  //         u_time: { value: 0 },
  //         u_resolution: { value: new THREE.Vector2(0.75, 1) },
  //         u_offset: { value: 1 },
  //         u_mouseX: { value: 0 },
  //         u_mouseY: { value: 0 },
  //         u_img: { value: texture },
  //       },
  //     })

  //     imgPlane = new THREE.Mesh(planeGeometry, planeMaterial)

  //     // move it behind your sphere
  //     let planeScale = 1.6 * 3
  //     imgPlane.position.z = 0
  //     imgPlane.scale.set(planeScale, planeScale, planeScale)
  //     scene.add(imgPlane)
  //   }
  // )

  // // Type
  // const typeLoader = new THREE.TextureLoader()
  // let typePlane = null
  // typeLoader.load(
  //   githubToJsDelivr(
  //     'https://github.com/illysito/teoriadelkaos/blob/510b39ea59dd7bd25e86b5438357a6e5b51b931d/imgs/omytype.png'
  //   ),
  //   (texture) => {
  //     texture.colorSpace = THREE.SRGBColorSpace
  //     // texture.colorSpace = THREE.SRGBColorSpace
  //     texture.minFilter = THREE.LinearFilter
  //     texture.magFilter = THREE.LinearFilter
  //     texture.generateMipmaps = false

  //     // const distance = 2 // distance from camera
  //     // const fov = camera.fov * (Math.PI / 180)
  //     // const height = 2 * Math.tan(fov / 2) * distance
  //     // const width = height * camera.aspect

  //     const planeGeometry = new THREE.PlaneGeometry(5, 1)
  //     // const planeMaterial = new THREE.MeshBasicMaterial({
  //     //   map: texture,
  //     //   alphaTest: 0.8,
  //     // })
  //     const planeMaterial = new THREE.ShaderMaterial({
  //       fragmentShader: disp_frag,
  //       vertexShader: vert,
  //       uniforms: {
  //         u_time: { value: 0 },
  //         u_resolution: { value: new THREE.Vector2(5, 1) },
  //         u_offset: { value: 1 },
  //         u_mouseX: { value: 0 },
  //         u_mouseY: { value: 0 },
  //         u_img: { value: texture },
  //       },
  //     })

  //     typePlane = new THREE.Mesh(planeGeometry, planeMaterial)

  //     // move it behind your sphere
  //     let planeScale = 2
  //     typePlane.position.z = 1
  //     typePlane.position.y = -2
  //     typePlane.scale.set(planeScale, planeScale, planeScale)
  //     scene.add(typePlane)
  //   }
  // )

  // Light
  // const light = new THREE.DirectionalLight(0xffffff, 1)
  // light.position.set(1, 1, 20)
  const ambient = new THREE.AmbientLight(0xffffff, 0.3)
  scene.add(ambient)
  // scene.add(light)

  // CUBE
  // const boxGeo = new THREE.BoxGeometry(0.6, 0.6, 0.6, 1, 1, 1)
  // const boxGeo = new RoundedBoxGeometry(1, 1, 1, 8, 0.02)
  // const boxGeo = new THREE.CylinderGeometry(1, 0.2, 0.1, 18, 8)

  const radius = 1

  const shape = new THREE.Shape()
  shape.absarc(0, 0, radius, 0, Math.PI * 2, false)

  const boxGeo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.05,
    curveSegments: 64,

    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 8,
  })

  boxGeo.center()

  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    // emissie: new Color(0x00ff00),
    // emissive: new Color(0x5511f6),
    emissive: 0x000000,
    emissiveIntensity: 0.4,
    transmission: 1.0,
    thickness: 0.82,
    ior: 2.5,
    roughness: 0.05,
    metalness: 0.0,
    reflectivity: 0.84,
    // attenuationColor: 0xddeeff,
    // attenuationColor: 0xffeeee,
    attenuationColor: 0xfffbf6,
    attenuationDistance: 7.5,
    dispersion: 2.2,
    // transparent: true,
    // wireframe: true,
    // side: THREE.DoubleSide,
  })
  const box = new THREE.Mesh(boxGeo, material)

  let boxScale = 0.58
  box.scale.set(boxScale, boxScale, boxScale)

  const group = new THREE.Group()

  group.add(box)
  scene.add(group)

  group.position.z = 2
  group.scale.set(2.8, 2.8, 2.8)
  // scene.add(sphere)

  // Loop
  let counter = 0

  let mouseX = 0
  let mouseY = 0

  let targetX = 0
  let targetY = 0

  let currentX = 0
  let currentY = 0

  let scroll = 0

  let animationId = null
  let isVisible = false

  let rotY = 0
  let rotYVel = 0.08

  function lerp(a, b, t) {
    return a + (b - a) * t
  }

  function animate() {
    currentX = lerp(currentX, targetX, 0.008)
    currentY = lerp(currentY, targetY, 0.008)

    counter += 0.002

    // decay velocity
    if (counter > 0.312) {
      rotYVel *= 0.996
      rotY += rotYVel
    }

    if (imgPlane) {
      imgPlane.material.uniforms.u_time.value = counter
      imgPlane.material.uniforms.u_mouseX.value = currentX
      imgPlane.material.uniforms.u_mouseY.value = currentY
    }
    group.rotation.y = 0.2 * counter + 0.2 * currentX - 0.0008 * scroll
    group.rotation.x = 0.8 * counter + 0.2 * currentY + 0.002 * scroll + rotY
    group.rotation.z = 0.6 * counter - 0.2 * currentX * currentY
    group.position.x = 1.2 * currentX
    group.position.y = -1.2 * currentY
    renderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }
  animate()

  function startRendering() {
    if (animationId !== null) return
    animationId = requestAnimationFrame(animate)
  }

  function stopRendering() {
    if (animationId === null) return
    cancelAnimationFrame(animationId)
    animationId = null
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting

      if (isVisible) {
        startRendering()
      } else {
        stopRendering()
      }
    },
    {
      threshold: 0.05,
    }
  )

  observer.observe(canvas)

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    targetX = gsap.utils.mapRange(0, window.innerWidth, -0.52, 0.52, mouseX)

    targetY = gsap.utils.mapRange(0, window.innerHeight, -0.48, 0.48, mouseY)
  })

  window.addEventListener('scroll', () => {
    scroll = window.scrollY
  })

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
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

export default worldHome
