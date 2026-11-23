// Country tutoring pages: /tutoring/usa, /tutoring/australia, /tutoring/uk.
// `accent` keys map to colour sets in CountryPage.jsx. `zones` drive the live clocks.

export const COUNTRY_PAGES = {
  usa: {
    slug: 'usa',
    name: 'USA',
    accent: 'blue',
    badge: 'Serving Students Across America',
    title: 'Expert Online Tutoring for US Students',
    tracks: ['Common Core', 'TEKS', 'SAT/ACT', 'AP Courses'],
    text: 'Certified American curriculum tutors available across all US time zones (EST, CST, MST, PST). Personalized learning aligned with state standards. 95% success rate.',
    primaryCta: 'Book Free Trial Session',
    secondaryCta: 'View All Subjects',
    curriculum: 'Common Core (USA)',
    stats: [
      { value: 95, suffix: '%', label: 'Success Rate' },
      { text: '24/7', label: 'All US Timezones' },
      { value: 100, suffix: '+', label: 'US Students' },
      { value: 50, suffix: '+', label: 'Certified Tutors' },
    ],
    zones: [
      { label: 'Eastern', tz: 'America/New_York', city: 'New York' },
      { label: 'Central', tz: 'America/Chicago', city: 'Chicago' },
      { label: 'Mountain', tz: 'America/Denver', city: 'Denver' },
      { label: 'Pacific', tz: 'America/Los_Angeles', city: 'Los Angeles' },
    ],
    support: {
      title: 'US Curriculum Support',
      text: 'Expert tutoring aligned with American educational standards and state-specific requirements.',
      items: [
        {
          icon: 'BookOpen',
          title: 'Common Core State Standards',
          text: 'Comprehensive support for Common Core Math and English Language Arts across all grade levels.',
          tags: ['Mathematics', 'English Language Arts', 'Reading', 'Writing'],
        },
        {
          icon: 'Star',
          title: 'Texas TEKS',
          text: 'Specialized tutoring aligned with Texas Essential Knowledge and Skills standards.',
          tags: ['All TEKS subjects', 'STAAR Test Prep', 'EOC Exams'],
        },
        {
          icon: 'Award',
          title: 'SAT & ACT Prep',
          text: 'Comprehensive test preparation for college admissions tests.',
          tags: ['SAT Math', 'SAT English', 'ACT Prep', 'Test Strategies'],
        },
        {
          icon: 'TrendingUp',
          title: 'AP Courses',
          text: 'Advanced Placement course tutoring and exam preparation.',
          tags: ['AP Calculus', 'AP Biology', 'AP Chemistry', 'AP English', 'AP History'],
        },
      ],
    },
    schedule: {
      title: 'Available Across All US Time Zones',
      text: 'Flexible scheduling to fit your family’s busy lifestyle.',
      rows: [
        { zone: 'Eastern (EST)', weekdays: '6am – 11pm', weekends: '8am – 8pm' },
        { zone: 'Central (CST)', weekdays: '5am – 10pm', weekends: '7am – 7pm' },
        { zone: 'Mountain (MST)', weekdays: '4am – 9pm', weekends: '6am – 6pm' },
        { zone: 'Pacific (PST)', weekdays: '3am – 8pm', weekends: '5am – 5pm' },
      ],
    },
    why: {
      title: 'Why US Families Choose PrepCheck',
      items: [
        { icon: 'CircleCheck', title: 'State Standards Aligned', text: 'Our tutors are experts in Common Core, TEKS, and state-specific standards across all 50 states.' },
        { icon: 'Users', title: 'Certified US Educators', text: 'All tutors hold US teaching certifications or equivalent credentials with deep curriculum knowledge.' },
        { icon: 'TrendingUp', title: 'Proven Results', text: '95% of our US students see grade improvement within 3 months. Average SAT score increase: 150+ points.' },
      ],
    },
    cta: {
      eyebrow: 'Free trial session',
      title: 'Ready to Help Your Child Excel?',
      text: 'Join hundreds of US families who trust PrepCheck for their child’s education. No credit card required • Cancel anytime • 100% satisfaction guaranteed.',
    },
  },

  australia: {
    slug: 'australia',
    name: 'Australia',
    accent: 'green',
    badge: 'Serving Students Across Australia',
    title: 'Expert NAPLAN & Australian Curriculum Tutoring',
    tracks: ['Years 3, 5, 7, 9', 'NAPLAN Preparation', 'Australian Curriculum'],
    text: 'Certified Australian curriculum tutors. AEST/AWST time zones. 95% success rate.',
    primaryCta: 'Book Free Trial',
    secondaryCta: 'View Subjects',
    curriculum: 'NAPLAN (Australia)',
    stats: [
      { value: 95, suffix: '%', label: 'Success' },
      { text: 'AEST', label: 'Timezone' },
      { value: 100, suffix: '+', label: 'Students' },
      { value: 30, suffix: '+', label: 'Tutors' },
    ],
    zones: [
      { label: 'Eastern', tz: 'Australia/Sydney', city: 'Sydney' },
      { label: 'Central', tz: 'Australia/Adelaide', city: 'Adelaide' },
      { label: 'Western', tz: 'Australia/Perth', city: 'Perth' },
    ],
    support: {
      title: 'NAPLAN Preparation by Year Level',
      text: 'Targeted practice for every NAPLAN domain, matched to your child’s year level.',
      items: ['Year 3', 'Year 5', 'Year 7', 'Year 9'].map((y, i) => ({
        icon: ['BookOpen', 'Target', 'TrendingUp', 'Award'][i],
        title: `${y} NAPLAN`,
        text: `Reading, writing, language conventions and numeracy practice for ${y} students.`,
        tags: ['Reading', 'Writing', 'Language Conventions', 'Numeracy'],
      })),
    },
    why: {
      title: 'Why Australian Families Choose PrepCheck',
      items: [
        { icon: 'CircleCheck', title: 'NAPLAN Experts', text: 'Tutors specialized in NAPLAN test format and Australian Curriculum.' },
        { icon: 'Users', title: 'Australian Certified', text: 'All tutors hold Australian teaching qualifications.' },
        { icon: 'TrendingUp', title: 'Proven Results', text: 'Average NAPLAN band improvement: 2–3 levels in 3 months.' },
      ],
    },
    cta: {
      eyebrow: 'Free trial',
      title: 'Ready for NAPLAN Success?',
      text: 'Join Australian families who trust PrepCheck.',
    },
  },

  uk: {
    slug: 'uk',
    name: 'UK',
    accent: 'red',
    badge: 'Serving UK Students Nationwide',
    title: 'Expert Online Tutoring for UK Students',
    tracks: ['IGCSE', 'GCSE', 'A-Levels', '11+ Exam'],
    text: 'Cambridge & Edexcel specialists. British curriculum experts. GMT/BST timezone. 95% success rate.',
    primaryCta: 'Book Free Trial',
    secondaryCta: 'View Subjects',
    curriculum: 'IGCSE / GCSE (UK)',
    stats: [
      { value: 95, suffix: '%', label: 'Success' },
      { text: 'GMT', label: 'Timezone' },
      { value: 50, suffix: '+', label: 'Students' },
      { value: 20, suffix: '+', label: 'Tutors' },
    ],
    zones: [{ label: 'UK time', tz: 'Europe/London', city: 'London' }],
    support: {
      title: 'UK Curriculum Support',
      text: 'Specialist tutoring for every major British qualification, from entrance exams to A-Levels.',
      items: [
        { icon: 'BookOpen', title: 'IGCSE', text: 'Cambridge IGCSE & Edexcel IGCSE.', tags: ['All IGCSE subjects'] },
        { icon: 'Award', title: 'GCSE', text: 'British GCSE examination preparation.', tags: ['Core & Optional subjects'] },
        { icon: 'GraduationCap', title: 'A-Levels', text: 'Advanced Level qualifications.', tags: ['All A-Level subjects'] },
        { icon: 'CircleCheck', title: '11+ Exam', text: '11 Plus grammar school entrance.', tags: ['Verbal/Non-verbal reasoning'] },
      ],
    },
    why: {
      title: 'Why UK Families Choose PrepCheck',
      items: [
        { icon: 'CircleCheck', title: 'Exam Board Specialists', text: 'Tutors who know Cambridge and Edexcel specifications and mark schemes inside out.' },
        { icon: 'Users', title: 'British Curriculum Experts', text: 'Experienced with the National Curriculum, GCSE, IGCSE and A-Level pathways.' },
        { icon: 'TrendingUp', title: 'Proven Results', text: '95% of our UK students see grade improvement within 3 months.' },
      ],
    },
    cta: {
      eyebrow: 'Free trial',
      title: 'Ready to Excel in Your Exams?',
      text: 'Join UK students achieving top grades with PrepCheck.',
    },
  },
}

export const COUNTRY_ORDER = ['usa', 'australia', 'uk']
