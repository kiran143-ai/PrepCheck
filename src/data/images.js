// Photography extracted from the approved PrepCheck design.
// Swap any file in src/assets/img for a higher-resolution original with the same name.
const files = import.meta.glob('../assets/img/*.jpg', { eager: true, import: 'default' })

export const img = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop().replace('.jpg', ''), url]),
)
