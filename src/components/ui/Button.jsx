import { ArrowRight } from 'lucide-react'

const VARIANTS = {
  primary:
    'bg-brand text-white shadow-brand hover:bg-brand-600 hover:shadow-[0_14px_30px_-8px_rgb(56_79_233_/_0.6)]',
  white: 'bg-white text-brand hover:bg-brand-50 shadow-[0_10px_24px_-10px_rgb(0_0_0_/_0.35)]',
  plain: 'bg-brand text-white hover:bg-brand-600',
}

/** Pill button with an optional trailing arrow that nudges on hover. */
export function Button({ variant = 'primary', arrow = false, className = '', children, ...rest }) {
  return (
    <button
      type="button"
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70 ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={2.2}
        />
      )}
    </button>
  )
}
