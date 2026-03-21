import gsap from 'gsap'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

import disp_frag from './disp_shader'
import vert from './vertexShader'

function world() {
  function githubToJsDelivr(permalink) {
    return permalink
      .replace('github.com', 'cdn.jsdelivr.net/gh')
      .replace('/blob/', '@')
  }

  const canvas = document.getElementById('omy-canvas')
  // Scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x080808)

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

  // Background
  const loader = new THREE.TextureLoader()
  let plane = null
  loader.load(
    githubToJsDelivr(
      'https://github.com/illysito/teoriadelkaos/blob/de8b6cce72ec738387aa41fbe097f74cd8feff49/imgs/vivi.jpg'
    ),
    // githubToJsDelivr(
    //   ' https://github.com/illysito/teoriadelkaos/blob/8053c72f3b687c2a525e94a1c4ecec44f7258ba4/imgs/vivimasked.png'
    // ),
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace
      // texture.colorSpace = THREE.SRGBColorSpace
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.generateMipmaps = false

      // const distance = 2 // distance from camera
      // const fov = camera.fov * (Math.PI / 180)
      // const height = 2 * Math.tan(fov / 2) * distance
      // const width = height * camera.aspect

      const planeGeometry = new THREE.PlaneGeometry(0.75, 1)
      // const planeMaterial = new THREE.MeshBasicMaterial({
      //   map: texture,
      //   // alphaTest: 0.1,
      // })
      const planeMaterial = new THREE.ShaderMaterial({
        fragmentShader: disp_frag,
        vertexShader: vert,
        uniforms: {
          u_time: { value: 0 },
          u_resolution: { value: new THREE.Vector2(0.75, 1) },
          u_offset: { value: 1 },
          u_mouseX: { value: 0 },
          u_mouseY: { value: 0 },
          u_img: { value: texture },
        },
      })

      plane = new THREE.Mesh(planeGeometry, planeMaterial)

      // move it behind your sphere
      let planeScale = 1.6 * 3
      plane.position.z = 0
      plane.scale.set(planeScale, planeScale, planeScale)
      scene.add(plane)
    }
  )

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(1, 1, 20)
  scene.add(light)

  // CUBE
  // const boxGeo = new THREE.BoxGeometry(0.6, 0.6, 0.6, 1, 1, 1)
  const boxGeo = new RoundedBoxGeometry(1, 1, 1, 8, 0.02)
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    // emissie: new Color(0x00ff00),
    // emissive: new Color(0x5511f6),
    emissive: 0x000000,
    emissiveIntensity: 0.4,
    transmission: 1.0,
    thickness: 0.42,
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

  let boxScale = 0.8
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

  let animationId = null
  let isVisible = false

  function lerp(a, b, t) {
    return a + (b - a) * t
  }

  function animate() {
    currentX = lerp(currentX, targetX, 0.008)
    currentY = lerp(currentY, targetY, 0.008)

    counter += 0.002
    if (plane) {
      plane.material.uniforms.u_time.value = counter
      plane.material.uniforms.u_mouseX.value = currentX
      plane.material.uniforms.u_mouseY.value = currentY
    }
    group.rotation.y = counter + 0.2 * currentX
    group.rotation.x = 0.8 * counter + 0.2 * currentY
    group.rotation.z = 0.6 * counter - 0.2 * currentX * currentY
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

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}

export default world
