/** Faint concentric rings used behind the dark stats panel and the blue CTA. */
export function Rings({ cx = '50%', cy = '60%', count = 7, step = 80, start = 80, stroke = 'rgb(255 255 255 / 0.07)' }) {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full">
      {Array.from({ length: count }, (_, i) => (
        <circle key={i} cx={cx} cy={cy} r={start + i * step} fill="none" stroke={stroke} strokeWidth="1" />
      ))}
    </svg>
  )
}
