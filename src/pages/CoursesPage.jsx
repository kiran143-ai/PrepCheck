import { useState } from 'react'
import { BoardsSection } from '../components/courses/BoardsSection'
import { CategoryGrid } from '../components/courses/CategoryGrid'
import { CourseCatalog } from '../components/courses/CourseCatalog'
import { CoursesHero } from '../components/courses/CoursesHero'
import { CtaSection } from '../components/sections/CtaSection'
import { usePageTitle } from '../hooks/usePageTitle'

export default function CoursesPage() {
  usePageTitle('Courses — PrepCheck')
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')

  const selectCategory = (id) => {
    setCategory((c) => (c === id ? 'all' : id))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('catalog')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <>
      <CoursesHero />
      <CategoryGrid selected={category} onSelect={selectCategory} />
      <CourseCatalog query={query} setQuery={setQuery} category={category} setCategory={setCategory} />
      <BoardsSection />
      <CtaSection
        eyebrow="Personalised guidance"
        title="Can’t Find What You’re Looking For?"
        description="Get personalized course recommendations from our academic experts. Tell us about your child and we’ll call you back with a plan."
        uppercase={false}
      />
    </>
  )
}
