import logoFull from '../../assets/brand/logo-full.png'
import logoMark from '../../assets/brand/logo-mark.png'
import logoWordmark from '../../assets/brand/logo-wordmark.png'
import { goHome } from '../../lib/nav'

/** The "P + check" mark on its own. Decorative unless given an alt. */
export function LogoMark({ className = 'h-10 w-auto', alt = '' }) {
  return (
    <img
      src={logoMark}
      alt={alt}
      aria-hidden={alt ? undefined : 'true'}
      width={197}
      height={185}
      decoding="async"
      draggable="false"
      className={`select-none ${className}`}
    />
  )
}

/** Horizontal lockup (mark + wordmark) used in the navbar. */
export function Logo({ className = '' }) {
  return (
    <a href="/" onClick={goHome} className={`group inline-flex items-center gap-2.5 rounded-md ${className}`} aria-label="PrepCheck home">
      <LogoMark className="h-10 w-auto drop-shadow-[0_6px_12px_rgb(29_78_216_/_0.25)] transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110 sm:h-[46px]" />
      <img
        src={logoWordmark}
        alt=""
        aria-hidden="true"
        width={459}
        height={41}
        decoding="async"
        draggable="false"
        className="h-[13px] w-auto select-none sm:h-[17px]"
      />
    </a>
  )
}

/** Full stacked logo, as supplied — used in the footer. */
export function LogoStacked({ className = 'h-[104px] w-auto' }) {
  return (
    <a href="/" onClick={goHome} className="group inline-block rounded-md" aria-label="PrepCheck home">
      <img
        src={logoFull}
        alt="PrepCheck"
        width={461}
        height={240}
        loading="lazy"
        decoding="async"
        draggable="false"
        className={`select-none transition-transform duration-500 ease-out group-hover:scale-[1.03] ${className}`}
      />
    </a>
  )
}
