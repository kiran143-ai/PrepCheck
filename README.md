# PrepCheck

Marketing website for PrepCheck — expert one-on-one tutoring and SAT preparation.

Built with **React 19**, **Vite**, **React Router**, **Tailwind CSS v4**, **Framer Motion** and **Lucide React**.

## Pages

| Route      | Page                                                     |
| ---------- | -------------------------------------------------------- |
| `/`        | Home                                                     |
| `/about`   | About Us — stats, 3-step approach, roadmap, team         |
| `/courses` | Courses — categories, searchable catalog, boards         |
| `/contact` | Contact — details, map, contact form                     |
| `*`        | 404                                                      |

The site is a single-page app: when hosting, serve `index.html` for every route (SPA fallback / rewrite).

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
  pages/                   # one component per route (lazy-loaded except Home)
  data/content.js          # shared copy: nav, FAQs, tutors, contact details, map links, …
  data/courses.js          # course categories, courses, boards
  data/about.js            # About page stats, steps, roadmap, team
  data/images.js           # image map for src/assets/img
  assets/img/              # photography (swap files keeping the same names)
  assets/brand/            # PrepCheck logo: full, mark, wordmark
  components/
    sections/              # homepage sections + shared Navbar, Footer, CtaSection
    courses/ about/ contact/  # sections for those pages
    ui/                    # reusable pieces: GhostType, Reveal, Counter, Modal, …
    DemoContext.jsx        # openDemo(): scrolls to the page's #get-started form (or the homepage one)
    DemoForm.jsx           # inline "Book a Free Demo Class" form
    ScrollManager.jsx      # scroll-to-top / scroll-to-hash on route change
  hooks/                   # scroll spy, carousel rotation, email form
```

## Notes

- Form submissions are simulated (`fakeSubmit` in `src/hooks/useEmailForm.js`) — connect your API there.
- Set `SESSION_VIDEO_URL` / `STORY_VIDEO_URL` in `src/data/content.js` to play real videos.
- Team photos: set `photo` per member in `src/data/about.js` (monogram placeholders until then).
- Animations respect `prefers-reduced-motion`.
