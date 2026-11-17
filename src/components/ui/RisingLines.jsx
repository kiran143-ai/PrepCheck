import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const COLORS = [
  [56, 79, 233], // brand blue
  [56, 79, 233],
  [99, 102, 241], // indigo
  [124, 140, 255], // soft periwinkle
  [245, 184, 46], // gold accent (rare)
]

const rand = (min, max) => min + Math.random() * (max - min)

function spawn(w, h, initial) {
  const color = COLORS[Math.random() < 0.12 ? 4 : Math.floor(Math.random() * 4)]
  // Start along the horizon (bottom ~12% of the area); on first paint, scatter
  // lines across the height so the effect doesn't begin empty.
  const y = initial ? rand(h * 0.15, h) : h - rand(0, h * 0.12)
  return {
    x: rand(0, w),
    y,
    len: rand(18, 70),
    speed: rand(18, 52), // px per second
    width: Math.random() < 0.2 ? 1.6 : 1,
    alpha: rand(0.22, 0.55),
    color,
    drift: rand(-4, 4), // slight sideways drift, px per second
    // the tiny star riding on top of the line
    star: rand(3.6, 5.4) + (Math.random() < 0.15 ? 1.8 : 0),
    twinkle: rand(2.2, 4.5), // radians per second
    phase: rand(0, Math.PI * 2),
    spin: rand(-0.6, 0.6), // radians per second
  }
}

/** Four-point sparkle centred on (x, y) with outer radius r. */
function starPath(ctx, x, y, r, rot) {
  const inner = r * 0.28
  ctx.beginPath()
  for (let k = 0; k < 4; k++) {
    const a = rot + (k * Math.PI) / 2
    const ax = x + Math.cos(a) * r
    const ay = y + Math.sin(a) * r
    const b = a + Math.PI / 4
    const bx = x + Math.cos(b) * inner
    const by = y + Math.sin(b) * inner
    if (k === 0) ctx.moveTo(ax, ay)
    else ctx.lineTo(ax, ay)
    ctx.quadraticCurveTo(x + Math.cos(b) * inner * 0.6, y + Math.sin(b) * inner * 0.6, bx, by)
    const next = rot + ((k + 1) * Math.PI) / 2
    ctx.quadraticCurveTo(x + Math.cos(b) * inner * 0.6, y + Math.sin(b) * inner * 0.6, x + Math.cos(next) * r, y + Math.sin(next) * r)
  }
  ctx.closePath()
}

/**
 * RisingLines — thin lines of light rising from a glowing horizon.
 * Decorative canvas background: fills its positioned parent, ignores pointer
 * events, pauses when off-screen or in a hidden tab, and draws a single still
 * frame when the user prefers reduced motion.
 */
export function RisingLines({ density = 1, className = '' }) {
  const canvasRef = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = 0
    let h = 0
    let lines = []
    let raf = 0
    let last = 0
    let visible = true
    let now = 0 // seconds, drives the star twinkle

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round((w / 16) * density)
      lines = Array.from({ length: count }, () => spawn(w, h, true))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.lineCap = 'round'
      for (const l of lines) {
        // fade in near the horizon, fade out as the line climbs
        const progress = 1 - l.y / h // 0 at bottom → 1 at top
        const fade = Math.min(1, (h - l.y) / 40) * Math.max(0, 1 - progress * 1.15)
        if (fade <= 0) continue
        const [r, g, b] = l.color
        const grad = ctx.createLinearGradient(l.x, l.y, l.x, l.y + l.len)
        grad.addColorStop(0, `rgba(${r},${g},${b},${l.alpha * fade})`)
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.strokeStyle = grad
        ctx.lineWidth = l.width
        ctx.beginPath()
        ctx.moveTo(l.x, l.y)
        ctx.lineTo(l.x, l.y + l.len)
        ctx.stroke()
        // tiny shining star on top of the line
        const tw = 0.6 + 0.4 * Math.sin(now * l.twinkle + l.phase) // twinkle 0.2 → 1
        const sa = Math.min(1, (l.alpha + 0.55) * Math.min(1, fade * 1.4)) * tw
        const sr = l.star * (0.8 + 0.25 * tw)
        const glow = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, sr * 3)
        glow.addColorStop(0, `rgba(${r},${g},${b},${sa * 0.5})`)
        glow.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(l.x, l.y, sr * 3, 0, Math.PI * 2)
        ctx.fill()
        starPath(ctx, l.x, l.y, sr, l.phase + now * l.spin)
        ctx.fillStyle = `rgba(${r},${g},${b},${sa})`
        ctx.fill()
        ctx.fillStyle = `rgba(255,255,255,${sa * 0.9})`
        ctx.beginPath()
        ctx.arc(l.x, l.y, Math.max(0.6, sr * 0.22), 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const tick = (t) => {
      const dt = last ? Math.min((t - last) / 1000, 0.05) : 0
      last = t
      now = t / 1000
      for (let i = 0; i < lines.length; i++) {
        const l = lines[i]
        l.y -= l.speed * dt
        l.x += l.drift * dt
        if (l.y + l.len < 0 || l.y < h * 0.05) lines[i] = spawn(w, h, false)
      }
      draw()
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (reduce || raf || !visible || document.hidden) return
      last = 0
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    resize()
    draw()
    start()

    const ro = new ResizeObserver(() => {
      resize()
      draw()
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(canvas)
    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [density, reduce])

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* glowing horizon */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgb(56_79_233_/_0.16)_0%,rgb(99_102_241_/_0.08)_40%,transparent_75%)]" />
      <div className="absolute bottom-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgb(56_79_233_/_0.45),transparent)] blur-[0.5px]" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full [mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_92%)]"
      />
    </div>
  )
}
