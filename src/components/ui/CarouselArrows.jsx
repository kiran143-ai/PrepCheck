import { ArrowLeft, ArrowRight } from 'lucide-react'

/** Prev/next pair. `tone="dark"` is used on the navy testimonials panel. */
export function CarouselArrows({ onPrev, onNext, label, tone = 'light', className = '' }) {
  const prev =
    tone === 'dark'
      ? 'border border-white/25 text-white hover:bg-white/10'
      : 'border border-line bg-white text-ink hover:border-ink/30'
  const next =
    tone === 'dark' ? 'bg-white text-ink hover:bg-brand-50' : 'bg-brand text-white shadow-brand hover:bg-brand-600'
  const base =
    'grid size-10 place-items-center rounded-full transition-all duration-300 hover:scale-105 active:scale-95'
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button type="button" onClick={onPrev} aria-label={`Previous ${label}`} className={`${base} ${prev}`}>
        <ArrowLeft className="size-4" strokeWidth={2} aria-hidden="true" />
      </button>
      <button type="button" onClick={onNext} aria-label={`Next ${label}`} className={`${base} ${next}`}>
        <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  )
}
