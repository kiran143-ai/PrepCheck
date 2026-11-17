import { MotionConfig } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { DemoProvider } from './components/DemoContext'
import { ScrollManager } from './components/ScrollManager'
import { Footer } from './components/sections/Footer'
import { Navbar } from './components/sections/Navbar'
import HomePage from './pages/HomePage'

const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const CoursesPage = lazy(() => import('./pages/CoursesPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <DemoProvider>
        <ScrollManager />
        <a
          href="#main"
          className="sr-only z-[200] rounded-full bg-brand px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </DemoProvider>
    </MotionConfig>
  )
}
