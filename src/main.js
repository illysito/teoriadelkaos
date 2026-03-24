import './styles/style.css'

import home from './features/home/home'
import mousemoveGallery from './features/home/mousemoveGallery'
import parallax from './features/home/parallax'
import preloader from './features/scripts/preloader'
import transitionHome from './features/transitions/transitionHome'
import world from './features/world/three'
// import WorldHome from './features/world/worldHome'

console.log('Teoria del Kaos - Omy ft. Illy `26')

home()
preloader()
world()
parallax()
mousemoveGallery()
transitionHome()
// new WorldHome()
