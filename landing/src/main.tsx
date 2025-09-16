import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './app.css'
import './brand/tokens.css'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
const ProjectsGrid = React.lazy(() => import('./components/ProjectsGrid.lazy'))
const Manifesto = React.lazy(() => import('./components/Manifesto.lazy'))

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navbar />
    <Hero />
    <Suspense fallback={null}>
      <ProjectsGrid />
      <Manifesto />
    </Suspense>
    <Footer />
  </React.StrictMode>
)
