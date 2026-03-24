import './styles/style.css'

console.log('Teoria del Kaos - Omy ft. Illy `26')

// new WorldHome()
async function runHomeFunctions() {
  const { default: home } = await import('./features/home/home')
  const { default: parallax } = await import('./features/home/parallax')
  const { default: mousemoveGallery } = await import(
    './features/home/mousemoveGallery'
  )
  const { default: preloader } = await import('./features/scripts/preloader')
  const { default: transitionHome } = await import(
    './features/transitions/transitionHome'
  )
  const { default: worldHome } = await import('./features/world/homeWorld')

  home()
  preloader()
  worldHome()
  parallax()
  mousemoveGallery()
  transitionHome()
}

async function runPhotoFunctions() {
  console.log('photo!')
  const { default: worldPhoto } = await import('./features/world/photosWorld')
  const { default: photoScroll } = await import('./features/photo/photoScroll')

  worldPhoto()
  photoScroll()
}
async function runFilmFunctions() {
  console.log('film!')
}
async function runContactFunctions() {
  console.log('contact!')
}

if (document.body.classList.contains('body__home')) runHomeFunctions()
if (document.body.classList.contains('body__foto')) runPhotoFunctions()
if (document.body.classList.contains('body__film')) runFilmFunctions()
if (document.body.classList.contains('body__contact')) runContactFunctions()
