import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFoundPage() {
  usePageTitle('Page not found — PrepCheck')
  return (
    <section className="container-site flex min-h-[70vh] flex-col items-center justify-center pt-[70px] text-center">
      <p className="text-[14px] font-semibold text-brand">404</p>
      <h1 className="heading-lg mt-2 text-[clamp(2rem,4vw,2.75rem)] text-ink">We couldn’t find that page</h1>
      <p className="mt-3 max-w-[420px] text-[15px] text-muted">The page may have moved, or the link may be mistyped.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link to="/" className="inline-flex h-11 items-center rounded-full bg-brand px-6 text-[15px] font-semibold text-white shadow-brand transition-colors hover:bg-brand-600">
          Back to home
        </Link>
        <Link to="/courses" className="inline-flex h-11 items-center rounded-full border-[1.5px] border-brand px-6 text-[15px] font-semibold text-brand transition-colors hover:bg-brand-50">
          Browse courses
        </Link>
      </div>
    </section>
  )
}
