import gsap from 'gsap'
import * as THREE from 'three'

import disp_frag from './shaders/fragShader'
import vert from './shaders/vertexShader'

const canvas = document.getElementById('omy-canvas')
const wrapper = document.querySelector('.three-canvas')
const heroWrapper = document.querySelector('.hero-img-wrapper')
const dpr = Math.min(window.devicePixelRatio || 1, 2)

function githubToJsDelivr(permalink) {
  return permalink
    .replace('github.com', 'cdn.jsdelivr.net/gh')
    .replace('/blob/', '@')
}

export default class WorldHome {
  constructor() {
    this.lastTime = performance.now()
    this.frameCount = 0

    this.time = 0
    this.isScrolling = false
    this.isResizing = false

    // sizes
    this.w = canvas.clientWidth
    this.h = canvas.clientHeight

    // scene
    this.scene = new THREE.Scene()

    // camera
    this.fov = 45
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.w / this.h,
      100,
      2000
    )
    this.camera.position.z = 600
    this.updateCamera()

    // images
    this.domImageWrappers = [
      ...document.querySelectorAll('.content-img-wrapper'),
    ]

    // renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      // antialias: true,
      alpha: true,
    })
    this.renderer.setSize(this.w, this.h)
    this.renderer.setPixelRatio(dpr)
    this.renderer.setClearColor(0x000000, 0)

    this.resize()
    this.init()
  }

  async init() {
    await this.addHeroImg()
    this.setupListeners()
    this.render()
    this.resize()

    setTimeout(async () => {
      await this.addImages()
      this.setupObserver()
      this.setImagePositions()
      this.resize()
    }, 600) // tweak: 300–1500ms depending on feel
  }

  setupObserver() {
    this.io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const item = entry.target.__threeItem
          item.isVisible = entry.isIntersecting
          item.mesh.visible = entry.isIntersecting

          // optional: if it just became visible, you can force a one-time rect update
          if (entry.isIntersecting) {
            item.needsRect = true
            const dly = 0.2 * Math.random()
            // IMAGE LIQUID REVEAL
            gsap.to(item.mesh.material.uniforms.u_scroll, {
              delay: 0.2 + dly,
              value: 2.0,
              duration: 1.2,
              ease: 'power2.inOut',
            })
          }
        }
      },
      {
        root: null,
        rootMargin: '20px', // pre-activate before it appears
        threshold: 0,
      }
    )

    this.imageStore.forEach((item) => {
      item.img.__threeItem = item
      this.io.observe(item.img)
    })
  }

  setupListeners() {
    let scrollTimeout
    let resizeTimeout
    // window.addEventListener('resize', this.resize.bind(this))
    window.addEventListener('resize', () => {
      this.resize()
      this.isResizing = true

      clearTimeout(resizeTimeout)

      resizeTimeout = setTimeout(() => {
        this.isResizing = false
        // run heavy resize logic once
      }, 100) // adjust if needed
    })

    window.addEventListener(
      'scroll',
      () => {
        this.isScrolling = true

        clearTimeout(scrollTimeout)

        scrollTimeout = setTimeout(() => {
          this.isScrolling = false
        }, 100) // 100ms after last scroll event = stopped
      },
      { passive: true }
    )
  }

  resize() {
    this.w = wrapper.clientWidth
    this.h = wrapper.clientHeight
    this.renderer.setPixelRatio(dpr)
    const pr = this.renderer.getPixelRatio()

    // update canvas resolutions (only need it for the big one, the others are always squares)
    if (this.mainMesh) {
      this.mainMesh.material.uniforms.u_resolution.value.set(
        heroWrapper.clientWidth * pr,
        heroWrapper.clientHeight * pr
      )
      this.mainMesh.scale.set(
        heroWrapper.clientWidth,
        heroWrapper.clientHeight,
        1
      )
    }

    if (this.imageStore) {
      this.imageStore.forEach((item) => {
        const rect = item.img.getBoundingClientRect()
        item.mesh.material.uniforms.u_resolution.value.set(
          rect.width * pr,
          rect.height * pr
        )
        item.mesh.scale.set(rect.width, rect.height, 1)
      })
    }

    this.renderer.setSize(this.w, this.h)
    this.camera.aspect = this.w / this.h
    this.updateCamera()
    this.camera.updateProjectionMatrix()
  }

  render() {
    this.time += 0.5

    // FPS
    this.frameCount++
    const now = performance.now()
    if (now - this.lastTime >= 1000) {
      console.log('FPS:', this.frameCount)
      this.frameCount = 0
      this.lastTime = now
    }

    if (this.mainMesh) {
      this.mainMesh.material.uniforms.u_time.value = this.time * 0.0002
      // this.mainMesh.material.uniforms.u_mouseX.value = currentX
      // this.mainMesh.material.uniforms.u_mouseY.value = currentY
    }
    // time for main canvas
    if (this.imageStore) {
      this.imageStore.forEach((img) => {
        img.mesh.material.uniforms.u_time.value = 0.002 * this.time
      })
    }
    // time for image canvas
    if ((this.isScrolling || this.isResizing) && this.imageStore) {
      this.setImagePositions()
    }
    // render & loop
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render.bind(this))
  }

  updateCamera() {
    this.fov =
      (2 * Math.atan(window.innerHeight / 2 / this.camera.position.z) * 180) /
      Math.PI
    this.camera.fov = this.fov
    // console.log(this.camera.fov)
  }

  // main plane
  async loadMainTextures() {
    const loader = new THREE.TextureLoader()
    const viviImg = await loader.loadAsync(
      // githubToJsDelivr(
      //   'https://github.com/illysito/peso/blob/0294519c879b1beb194295665bea435293f643fa/imgs/perlinSquare.jpg'
      // )
      githubToJsDelivr(
        'https://github.com/illysito/teoriadelkaos/blob/de8b6cce72ec738387aa41fbe097f74cd8feff49/imgs/vivi.jpg'
      )
    )

    return viviImg
  }

  async addHeroImg() {
    const texture = await this.loadMainTextures()
    // create a mesh for each image
    // let mainGeometry = new THREE.PlaneGeometry(this.w, this.h, 1, 1)
    let mainGeometry = new THREE.PlaneGeometry(1, 1, 1, 1)
    let mainMaterial = new THREE.ShaderMaterial({
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
    mainMaterial.transparent = true
    mainMaterial.depthWrite = false
    this.mainMesh = new THREE.Mesh(mainGeometry, mainMaterial)

    this.scene.add(this.mainMesh)
  }

  // images
  async loadTextures() {
    const loader = new THREE.TextureLoader()
    const perlin = await loader.loadAsync(
      githubToJsDelivr(
        'https://github.com/illysito/peso/blob/0294519c879b1beb194295665bea435293f643fa/imgs/perlinSquare.jpg'
      )
    )

    const limeBG = await loader.loadAsync(
      githubToJsDelivr(
        'https://github.com/illysito/peso/blob/825c07466e0db27442ea707ee43327609a049fe7/imgs/lime-square.png'
      )
    )

    const texturesFront = await Promise.all([
      // galdar en danza
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/0b321199ab67aa71ec8601bcf7461aa1525e9cee/imgs/GaldarEnDanza_1.webp'
        )
      ),
      // dama
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/38bc5380f28b8fafcbd41781dc03235e8ead29ef/imgs/Dama1.webp'
        )
      ),
      // almagre
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/dd1718beb93789193912c29e1614805c9db31ec2/imgs/Almagre1.webp'
        )
      ),
      // david y goliat
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/0b321199ab67aa71ec8601bcf7461aa1525e9cee/imgs/DavidGoliat_1.webp'
        )
      ),
      // sorites
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/dd1718beb93789193912c29e1614805c9db31ec2/imgs/Sorites4.webp'
        )
      ),
      // azahar
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/44ca43cf8d88d16f4fa3bce0caeb8f25b0c31a60/imgs/_Azahar1.webp'
        )
      ),
    ])

    const texturesBack = await Promise.all([
      // galdar en danza
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/53ea88445a66cd11da545f987ef8fc53a0d330c3/imgs/GaldarEnDanza_2.webp'
        )
      ),
      // dama
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/38bc5380f28b8fafcbd41781dc03235e8ead29ef/imgs/Dama2.webp'
        )
      ),
      // almagre
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/dd1718beb93789193912c29e1614805c9db31ec2/imgs/Almagre2.webp'
        )
      ),
      // david y goliat
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/53ea88445a66cd11da545f987ef8fc53a0d330c3/imgs/DavidGoliat_2.webp'
        )
      ),
      // sorites
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/dd1718beb93789193912c29e1614805c9db31ec2/imgs/Sorites3.webp'
        )
      ),
      // azahar
      loader.loadAsync(
        githubToJsDelivr(
          'https://github.com/illysito/peso/blob/44ca43cf8d88d16f4fa3bce0caeb8f25b0c31a60/imgs/_Azahar2.webp'
        )
      ),
    ])

    return { perlin, limeBG, texturesFront, texturesBack }
  }

  async addImages() {
    const { perlin, limeBG, texturesFront, texturesBack } =
      await this.loadTextures()
    this.imageStore = this.domImageWrappers.map((img, index) => {
      let bounds = img.getBoundingClientRect()

      // create a mesh for each image
      // let geometry = new THREE.PlaneGeometry(bounds.width, bounds.height, 1, 1)
      let geometry = new THREE.PlaneGeometry(1, 1, 1, 1)
      let material = new THREE.ShaderMaterial({
        fragmentShader: disp_frag,
        vertexShader: vert,
        uniforms: {
          u_time: { value: 0 },
          u_resolution: { value: new THREE.Vector2(1, 1) },
          u_offset: { value: 0 },
          u_scroll: { value: 0 },
          u_red: { value: 0 },
          u_green: { value: 0 },
          u_blue: { value: 0 },
          u_image_1: { value: texturesFront[index] },
          u_image_2: { value: texturesBack[index] },
          u_displacement: { value: perlin },
          u_bg: { value: limeBG },
        },
      })
      // material.transparent = true
      let mesh = new THREE.Mesh(geometry, material)

      this.scene.add(mesh)

      return {
        img: img,
        mesh: mesh,
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height,
        isVisible: true,
      }
    })

    this.renderer.compile(this.scene, this.camera)
    this.renderer.render(this.scene, this.camera)
  }

  setImagePositions() {
    // console.log(this.imageStore)
    this.imageStore.forEach((item) => {
      if (!item.isVisible) return
      const rect = item.img.getBoundingClientRect()

      item.mesh.position.x = rect.left - this.w / 2 + rect.width / 2 // operating with img width and screen width shift coord system from DOM to three.js
      item.mesh.position.y = -rect.top + this.h / 2 - rect.height / 2
    })
  }
}
