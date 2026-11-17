/** Shared input styling for form fields. `err` → red border, `highlight` → brand glow. */
export const inputCls = (err, highlight) =>
  `h-11 w-full rounded-xl border bg-white px-3.5 text-[14.5px] text-ink placeholder:text-subtle/80 outline-none transition-all duration-300 focus:border-brand focus:ring-4 focus:ring-brand/15 ${
    err ? 'border-red-400' : highlight ? 'border-brand ring-4 ring-brand/15' : 'border-line hover:border-ink/25'
  }`
