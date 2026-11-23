import { img } from './images'

// Main menu (navbar + footer Quick Links). Items with `href: null` are shown as
// plain labels until their pages exist. `header: false` hides an item from the
// navbar and mobile menu but keeps it in the footer.
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Courses', href: '/courses' },
  { label: 'FAQs', href: null, header: false }, // footer only
  { label: 'Contact', href: '/contact' },
]

export const TRUST_REASONS = [
  {
    icon: 'BadgeCheck',
    title: 'Verified Expert Tutors',
    text: 'All our tutors undergo background checks and qualification verification to ensure the highest quality education for your child.',
  },
  {
    icon: 'UserSearch',
    title: 'Rigorous Selection',
    text: 'Only the top 5% of applicants become tutors on our platform, through a multi-step interview and teaching assessment.',
  },
  {
    icon: 'SlidersHorizontal',
    title: 'Customized Learning',
    text: 'Personalized lesson plans tailored to your child’s learning style, pace, and academic goals for maximum progress.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Privacy is Safer',
    text: 'Every session runs on a secure, verified platform with parent oversight, so your child learns in a safe environment.',
  },
]

export const MATCH_STEPS = [
  'Expert Counseling — we learn your child’s strengths, gaps and goals',
  'Choose the Perfect Tutor from hand-picked, subject-matched experts',
  'Watch the Difference with regular progress reports and parent updates',
  'Verified safe, private one-on-one sessions',
  'Flexible scheduling around your family’s week',
]

export const MATCH_GALLERY = [
  { src: img['match-1'], alt: 'Tutor helping a young student with classwork' },
  { src: img['match-2'], alt: 'Student in an online lesson with headphones and a laptop' },
  { src: img['match-3'], alt: 'Student solving maths problems with a calculator' },
]

export const STATS = [
  { value: 500, suffix: '+', label: 'Happy Parents' },
  { value: 95, suffix: '%', label: 'Success Rate' },
  { value: 85, suffix: '%', label: 'Grade Improvement' },
  { value: 4.9, decimals: 1, suffix: '/5', label: 'Satisfaction' },
]

export const SUBJECTS = [
  { name: 'Physics', text: 'Concepts, numericals and practicals made simple.', src: img['subject-physics'] },
  { name: 'Chemistry', text: 'Reactions, equations and lab skills, step by step.', src: img['subject-chemistry'] },
  { name: 'Biology', text: 'From cells to ecosystems, with clear diagrams.', src: img['subject-biology'] },
  { name: 'English', text: 'Reading, writing and essay skills that score.', src: img['subject-english'] },
  { name: 'Computer Science', text: 'Coding, logic and theory for every syllabus.', src: img['subject-computer-science'] },
  { name: 'Mathematics', text: 'Algebra to calculus, built on strong foundations.', src: img['subject-mathematics'] },
  { name: 'History', text: 'Timelines, sources and exam-ready answers.', src: img['subject-history'] },
  { name: 'Geography', text: 'Maps, case studies and fieldwork guidance.', src: img['subject-geography'] },
]

export const TUTORS = [
  { name: 'Sarah Mitchell', role: 'English Tutor', src: img['tutor-1'] },
  { name: 'Dr. Robert Hale', role: 'Mathematics Tutor', src: img['tutor-2'] },
  { name: 'Daniel Brooks', role: 'Physics Tutor', src: img['tutor-3'] },
  { name: 'James Carter', role: 'Chemistry Tutor', src: img['tutor-4'] },
]

export const TESTIMONIALS = [
  {
    quote:
      'My daughter was struggling with mathematics, but after just two months working with her tutor, her test scores improved dramatically. The tutor’s patient approach built her confidence.',
    name: 'Priya Sharma',
    role: 'Parent of 9th Grade Student',
    avatar: img['avatar-1'],
  },
  {
    quote:
      'Exceptional service and results! Our daughter’s confidence has grown tremendously. The tutor explains every concept until it clicks.',
    name: 'Chen Wei',
    role: 'Parent of 7th Grade Student',
    avatar: img['avatar-2'],
  },
  {
    quote:
      'Our son’s grades improved significantly. The personalized approach works wonders, and the regular progress updates keep us involved.',
    name: 'Aisha Patel',
    role: 'Parent of 10th Grade Student',
    avatar: img['avatar-3'],
  },
  {
    quote:
      'Scheduling around two working parents used to be impossible. PrepCheck found a chemistry tutor who fits our evenings, and his lab reports have never been better.',
    name: 'Michael O’Brien',
    role: 'Parent of 11th Grade Student',
  },
  {
    quote:
      'The counseling call alone was worth it. They understood exactly where our son was stuck and matched him with a tutor who made English enjoyable again.',
    name: 'Fatima Al Mansoori',
    role: 'Parent of 8th Grade Student',
  },
]

export const TESTIMONIAL_STATS = [
  { value: 500, suffix: '+', label: 'Happy Parents' },
  { value: 95, suffix: '%', label: 'Success Rate' },
  { value: 4.9, decimals: 1, suffix: '/5', label: 'Satisfaction' },
]

export const SESSIONS = [
  { label: 'Live Interactive Sessions', src: img['session-1'], alt: 'Student smiling during a live online session with her tutor' },
  { label: 'Personalized Attention', src: img['session-2'], alt: 'Tutor giving one-on-one guidance to a young student' },
  { label: 'Weekly Schedule', src: img['session-3'], alt: 'Students walking through a bright school corridor' },
]

export const FAQS = [
  {
    q: 'How are tutors selected and verified?',
    a: 'Every applicant goes through background checks, qualification verification, a subject test and a live teaching assessment. Only the top 5% join PrepCheck.',
  },
  {
    q: 'What subjects and grade levels do you cover?',
    a: 'We cover Physics, Chemistry, Biology, English, Computer Science, Mathematics, History and Geography from primary school through to board-exam preparation.',
  },
  {
    q: 'How flexible is the scheduling?',
    a: 'Sessions are booked around your family’s week. You can reschedule with 24 hours’ notice from your parent dashboard at no extra cost.',
  },
  {
    q: 'What is your pricing structure?',
    a: 'Pricing depends on grade level and session frequency. Book a free demo and our counselors will share a plan that fits your child.',
  },
  {
    q: 'Are sessions conducted online or in-person?',
    a: 'Most sessions run live online on our secure platform. In-person tutoring is available in selected cities — ask our counselors about your area.',
  },
  {
    q: 'How quickly can we get started?',
    a: 'After your free counseling call we usually match your child with a tutor within 48 hours, and the first session can start the same week.',
  },
  {
    q: 'What if we’re not satisfied with our tutor?',
    a: 'Tell us and we will rematch your child with a new tutor at no extra cost. Your satisfaction and your child’s progress come first.',
  },
  {
    q: 'Do you offer group tutoring sessions?',
    a: 'Our focus is one-on-one tutoring, but we run small-group revision sessions (up to 4 students) before major exams.',
  },
]

export const COUNTRIES = [
  {
    tag: 'Common Core',
    title: 'USA Tutoring',
    text: 'Common Core aligned tutoring for Math and English Language Arts across every grade.',
    src: img['country-usa'],
    alt: 'Teacher helping a boy with his worksheet in a US classroom',
    id: 'usa',
  },
  {
    tag: 'NAPLAN',
    title: 'Australia Tutoring',
    text: 'Targeted NAPLAN preparation and curriculum support for primary and secondary students.',
    src: img['country-aus'],
    alt: 'Teacher pointing to a world map with students around a globe',
    id: 'australia',
  },
  {
    tag: 'IGCSE',
    title: 'UK Tutoring',
    text: 'IGCSE and GCSE exam preparation with tutors who know the mark schemes inside out.',
    src: img['country-uk'],
    alt: 'Students studying together in a traditional library',
    id: 'uk',
  },
]

export const FOOTER_COUNTRY_LINKS = [
  { label: 'USA Tutoring', href: '/tutoring/usa' },
  { label: 'Australia Tutoring', href: '/tutoring/australia' },
  { label: 'UK Tutoring', href: '/tutoring/uk' },
  { label: 'Common Core', href: '/tutoring/usa#curriculum' },
  { label: 'NAPLAN', href: '/tutoring/australia#curriculum' },
  { label: 'IGCSE', href: '/tutoring/uk#curriculum' },
]

export const CONTACT = {
  address: 'D wing, 109, Shram Saphalaya Bldg, Sheetal Nagar, Mira Road East, Mumbai - 401107',
  phone: '+91 8169147161',
  phoneHref: 'tel:+918169147161',
  whatsapp: '918169147161', // international format, digits only
  email: 'contact@prepcheckacademy.com',
  hours: { days: 'Monday – Sunday', time: '24/7 Available' },
}

const MAP_QUERY = encodeURIComponent(`PrepCheck, ${CONTACT.address}`)
export const MAPS = {
  view: `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`,
  embed: `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`,
}

// Set this to a hosted MP4 to play a real session preview in the video modal.
export const SESSION_VIDEO_URL = ''

// Set this to a hosted MP4 for the About page's “Watch Our Story” button.
export const STORY_VIDEO_URL = ''


export const HEADER_LINKS = NAV_LINKS.filter((l) => l.header !== false)

// Student/parent portal (hosted on Wise).
export const LOGIN_URL = 'https://prepcheck.wise.live/login'

export const POLICY_LINKS = [
  { label: 'Refund/Cancellation Policy', href: '/refund-policy' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
]
