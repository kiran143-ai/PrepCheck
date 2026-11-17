import { AnimatePresence, motion } from 'framer-motion'
import { Search, SearchX, X } from 'lucide-react'
import { useId, useMemo } from 'react'
import { COURSES, COURSE_CATEGORIES } from '../../data/courses'
import { useDemo } from '../DemoContext'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { CourseCard } from './CourseCard'

const CATEGORY_TITLE = Object.fromEntries(COURSE_CATEGORIES.map((c) => [c.id, c.title]))
const haystack = (c) =>
  [c.title, CATEGORY_TITLE[c.category], c.formSubject, c.grades, c.text, c.badge ?? '', ...c.highlights].join(' ').toLowerCase()

function filterCourses(query, category) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  return COURSES.filter(
    (c) => (category === 'all' || c.category === category) && terms.every((t) => haystack(c).includes(t)),
  )
}

const chip = (active) =>
  `shrink-0 rounded-full px-4 py-2 text-[13.5px] font-semibold transition-all duration-200 ${
    active ? 'bg-brand text-white shadow-brand' : 'bg-white text-ink-700 ring-1 ring-line hover:text-brand hover:ring-brand/40'
  }`

/** Searchable, filterable grid of course cards. */
export function CourseCatalog({ query, setQuery, category, setCategory }) {
  const searchId = useId()
  const { openDemo } = useDemo()
  const results = useMemo(() => filterCourses(query, category), [query, category])
  const reset = () => {
    setQuery('')
    setCategory('all')
  }

  return (
    <section id="catalog" aria-labelledby="catalog-title" className="container-site pt-16 lg:pt-20">
      <Reveal className="rounded-3xl bg-panel px-4 py-10 sm:px-8 lg:px-10 lg:py-12">
        <h2 id="catalog-title" className="sr-only">
          All courses
        </h2>

        {/* search */}
        <div className="mx-auto max-w-[540px]">
          <label htmlFor={searchId} className="sr-only">
            Search courses
          </label>
          <div className="flex h-[52px] items-center gap-3 rounded-full bg-white px-5 shadow-[0_10px_30px_-18px_rgb(20_26_60_/_0.35)] ring-1 ring-line transition-shadow focus-within:ring-2 focus-within:ring-brand">
            <Search className="size-[18px] shrink-0 text-subtle" aria-hidden="true" />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a course, subject or category…"
              className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-subtle [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="grid size-7 place-items-center rounded-full bg-panel text-subtle transition-colors hover:text-ink"
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* category chips */}
        <div
          role="group"
          aria-label="Filter by category"
          className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
        >
          <button type="button" aria-pressed={category === 'all'} onClick={() => setCategory('all')} className={chip(category === 'all')}>
            All Courses
          </button>
          {COURSE_CATEGORIES.map((c) => (
            <button key={c.id} type="button" aria-pressed={category === c.id} onClick={() => setCategory(c.id)} className={chip(category === c.id)}>
              {c.title}
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-[13.5px] text-subtle" aria-live="polite">
          Showing <strong className="text-ink">{results.length}</strong> of {COURSES.length} courses
          {category !== 'all' && (
            <>
              {' '}in <strong className="text-ink">{CATEGORY_TITLE[category]}</strong>
            </>
          )}
          {query.trim() && (
            <>
              {' '}for “<strong className="text-ink">{query.trim()}</strong>”
            </>
          )}
        </p>

        {results.length ? (
          <motion.ul layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {results.map((c) => (
                <motion.li
                  key={c.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30, opacity: { duration: 0.2 } }}
                >
                  <CourseCard course={c} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        ) : (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-10 max-w-[420px] text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-white text-brand shadow-float">
              <SearchX className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-[18px] font-bold text-ink">No courses match your search</h3>
            <p className="mt-2 text-[14px] leading-[21px] text-muted">
              Try a different keyword or category — or tell us what your child needs and we’ll build a plan.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button variant="outline" className="h-10 px-5 text-[14px]" onClick={reset}>
                Show all courses
              </Button>
              <Button className="h-10 px-5 text-[14px]" onClick={() => openDemo({ subject: 'Not sure yet' })}>
                Talk to an Expert
              </Button>
            </div>
          </motion.div>
        )}
      </Reveal>
    </section>
  )
}
