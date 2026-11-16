# PrepCheck

Marketing website for PrepCheck — expert one-on-one tutoring and SAT preparation.

Built with **React 19**, **Vite**, **Tailwind CSS v4**, **Framer Motion** and **Lucide React**.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build in dist/
npm run preview  # preview the production build
npm run lint     # oxlint
```

## Project structure

```
src/
  data/content.js          # all page copy: nav, FAQs, tutors, contact details, …
  data/images.js           # image map for src/assets/img
  assets/img/              # photography (swap files keeping the same names)
  assets/brand/            # PrepCheck logo: full, mark, wordmark
  components/
    sections/              # one component per page section
    ui/                    # reusable pieces: GhostType, Reveal, Counter, Modal, …
    DemoContext.jsx        # openDemo(): scrolls to the inline booking form
    DemoForm.jsx           # inline "Book a Free Demo Class" form
  hooks/                   # scroll spy, carousel rotation, email form
```

## Notes

- Form submissions are simulated (`fakeSubmit` in `src/hooks/useEmailForm.js`) — connect your API there.
- Set `SESSION_VIDEO_URL` in `src/data/content.js` to play a real session video.
- Animations respect `prefers-reduced-motion`.
