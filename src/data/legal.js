// Legal page content. Blocks: { p } | { list: [] } | { h3 } | { callout: { title, text } } | { note }
// Use **double asterisks** for bold. Cross-page links are added by LegalPage via `links`.

export const LEGAL_ORDER = ['refund-policy', 'privacy-policy', 'terms-of-service', 'cookie-policy']

export const LEGAL_PAGES = {
  'refund-policy': {
    slug: 'refund-policy',
    nav: 'Refund/Cancellation Policy',
    badge: 'Policies',
    title: 'Refund & Cancellation Policy',
    subtitle: 'Transparent policies designed to ensure your satisfaction and uninterrupted learning experience at PrepCheck Academy.',
    updated: 'May 15, 2026',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        icon: 'Info',
        blocks: [
          {
            p: 'At **PrepCheck Academy**, we are committed to delivering high-quality, personalized one-on-one tutoring that helps every learner achieve measurable academic progress. We understand that the right tutor-student match is critical to academic success, and we stand behind the quality of our mentorship experience.',
          },
        ],
      },
      {
        id: 'tutor-replacement',
        title: 'Tutor Replacement Policy',
        icon: 'Repeat',
        blocks: [
          {
            callout: {
              title: 'Free Tutor Replacements',
              text: 'If your tutor becomes unavailable due to resignation, scheduling conflicts, or termination from PrepCheck Academy, we will provide a replacement tutor at no additional cost.',
            },
          },
          {
            callout: {
              title: 'Unsatisfactory Tutor Match',
              text: 'If you are not satisfied with your assigned tutor, you may request up to **two additional tutor replacements** free of charge. This allows you to work with up to **three tutors** in total.',
            },
          },
        ],
      },
      {
        id: 'refund-eligibility',
        title: 'Refund Eligibility After Tutor Changes',
        icon: 'BadgeCheck',
        blocks: [
          { h3: 'When You Are Eligible' },
          { p: 'You may request a refund only after completing sessions with **three different tutors** and still being dissatisfied with the tutoring experience.' },
          { h3: 'What Will Be Refunded' },
          { p: 'Approved refunds cover all remaining unused sessions in your purchased package.' },
          { h3: 'Non-Refundable Items' },
          { list: ['Completed tutoring sessions.', 'Missed sessions due to student no-shows.', 'Promotional or discounted packages unless otherwise stated.'] },
        ],
      },
      {
        id: 'how-to-request',
        title: 'How to Request a Replacement or Refund',
        icon: 'MessageSquare',
        blocks: [{ p: 'To request a tutor replacement or initiate a refund, contact our support team with detailed feedback about your experience.' }],
      },
      {
        id: 'review',
        title: 'Review & Approval Process',
        icon: 'ClipboardCheck',
        blocks: [{ p: 'Our academic support team reviews each request based on the criteria outlined in this policy and aims to resolve eligible requests promptly.' }],
      },
      {
        id: 'timeline',
        title: 'Refund Processing Timeline',
        icon: 'Clock',
        blocks: [
          {
            list: [
              'Refunds are issued to the original payment method used at the time of purchase.',
              'Processing typically takes **7–10 business days** after approval.',
              'You will receive an email confirmation once your refund has been initiated.',
            ],
          },
        ],
      },
      {
        id: 'special',
        title: 'Special Considerations',
        icon: 'Sparkles',
        blocks: [{ p: 'PrepCheck Academy reserves the right to make exceptions to this policy on a case-by-case basis in the event of significant service disruption.' }],
      },
    ],
    closing: 'At **PrepCheck Academy**, we are dedicated to helping every student succeed with confidence. This policy reflects our commitment to quality education, fairness, and customer satisfaction.',
  },

  'privacy-policy': {
    slug: 'privacy-policy',
    nav: 'Privacy Policy',
    badge: 'Legal Documentation',
    title: 'Privacy Policy',
    subtitle: 'Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.',
    updated: 'October 1, 2025',
    intro: [
      'At PrepCheck Education Services (“PrepCheck,” “we,” “us,” or “our”), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy describes how we collect, use, share, and protect information when you use our tutoring platform and services.',
      'By using PrepCheck’s services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.',
    ],
    sections: [
      {
        id: 'information-we-collect',
        title: 'Information We Collect',
        icon: 'Database',
        blocks: [
          { p: 'We collect information that you provide directly to us, including:' },
          {
            list: [
              'Personal identification information (name, email address, phone number)',
              'Student information (name, age, grade level, learning goals)',
              'Payment information (processed securely through third-party providers)',
              'Communication records and preferences',
              'Technical data (IP address, browser type, device information)',
            ],
          },
          { p: 'We collect this information when you register, book a session, fill out forms, or communicate with us.' },
        ],
      },
      {
        id: 'how-we-use',
        title: 'How We Use Your Information',
        icon: 'Settings',
        blocks: [
          { p: 'We use the collected information for the following purposes:' },
          {
            list: [
              'To provide and maintain our tutoring services',
              'To match students with appropriate tutors',
              'To process payments and send receipts',
              'To communicate about sessions, updates, and important notices',
              'To improve our services and develop new features',
              'To ensure the safety and security of our platform',
              'To comply with legal obligations',
              'To send marketing communications (with your consent)',
            ],
          },
        ],
      },
      {
        id: 'data-security',
        title: 'Data Security',
        icon: 'Lock',
        blocks: [
          { p: 'We implement industry-standard security measures to protect your personal information:' },
          {
            list: [
              'Encryption of data in transit using SSL/TLS protocols',
              'Secure password storage using bcrypt hashing',
              'Regular security audits and vulnerability assessments',
              'Access controls and authentication mechanisms',
              'Secure cloud infrastructure with backup systems',
              'Employee training on data protection',
              'Compliance with applicable data protection regulations',
            ],
          },
          { p: 'However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but continuously work to protect your data.' },
        ],
      },
      {
        id: 'data-sharing',
        title: 'Data Sharing and Disclosure',
        icon: 'Share2',
        blocks: [
          { p: '**We do not sell your personal information.** We may share your information only in these circumstances:' },
          {
            list: [
              'With tutors (limited to information necessary for providing tutoring services)',
              'With payment processors (to process transactions)',
              'With service providers (who assist in operating our platform)',
              'With your consent (when you explicitly agree)',
              'To comply with legal obligations (court orders, legal processes)',
              'To protect our rights and safety (fraud prevention, security issues)',
            ],
          },
          { p: 'All third parties are contractually obligated to protect your information and use it only for specified purposes.' },
        ],
      },
      {
        id: 'your-rights',
        title: 'Your Rights and Choices',
        icon: 'UserCheck',
        blocks: [
          { p: 'You have the following rights regarding your personal information:' },
          {
            list: [
              '**Access:** Request a copy of your personal data',
              '**Correction:** Update or correct inaccurate information',
              '**Deletion:** Request deletion of your personal data',
              '**Restriction:** Limit how we use your information',
              '**Portability:** Receive your data in a portable format',
              '**Objection:** Object to processing of your personal data',
              '**Withdraw consent:** Opt-out of marketing communications',
            ],
          },
          { p: 'To exercise these rights, contact us at **contact@prepcheckacademy.com**. We will respond within 30 days.' },
        ],
      },
      {
        id: 'childrens-privacy',
        title: 'Children’s Privacy',
        icon: 'Baby',
        blocks: [
          { p: 'Our services are designed for students of various ages, including minors. We take additional precautions to protect children’s privacy:' },
          {
            list: [
              'Parental consent is required for students under 18',
              'We collect only necessary information for educational purposes',
              'Access to children’s information is restricted',
              'Parents can review and request deletion of their child’s information',
              'We comply with applicable children’s privacy laws',
              'Background checks are conducted on all tutors',
            ],
          },
          { p: 'Parents have full control over their child’s account and can request information deletion at any time.' },
        ],
      },
      {
        id: 'cookies',
        title: 'Cookies and Tracking',
        icon: 'Cookie',
        blocks: [
          { p: 'We use cookies and similar technologies to enhance your experience:' },
          {
            list: [
              '**Essential cookies:** Required for platform functionality',
              '**Analytics cookies:** Help us understand how you use our site',
              '**Preference cookies:** Remember your settings and preferences',
              '**Marketing cookies:** Deliver relevant advertisements (with consent)',
            ],
          },
          { p: 'You can control cookies through your browser settings. Note that disabling certain cookies may affect platform functionality.' },
          { link: { to: '/cookie-policy', label: 'Read our Cookie Policy for detailed information' } },
        ],
      },
      {
        id: 'data-retention',
        title: 'Data Retention',
        icon: 'Archive',
        blocks: [
          { p: 'We retain your personal information for as long as necessary to:' },
          { list: ['Provide our services to you', 'Comply with legal obligations', 'Resolve disputes and enforce agreements', 'Maintain accurate records'] },
          { p: 'Account information is retained while your account is active and for a reasonable period afterward. You may request earlier deletion by contacting us.' },
        ],
      },
      {
        id: 'changes',
        title: 'Changes to This Privacy Policy',
        icon: 'FileClock',
        blocks: [
          {
            p: 'We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the “Last updated” date. We encourage you to review this Privacy Policy periodically.',
          },
        ],
      },
    ],
    // Registered address as given in the supplied policy text.
    postal: ['PrepCheck Education Services', '1st Floor, Satguru Kripa, Mulund Colony,', 'Mulund West, Mumbai, 400082'],
  },

  // DRAFT — no Terms content was supplied. Replace with your approved terms before launch.
  'terms-of-service': {
    slug: 'terms-of-service',
    nav: 'Terms of Service',
    badge: 'Legal Documentation',
    title: 'Terms of Service',
    subtitle: 'The terms that apply when you book and use PrepCheck tutoring services.',
    updated: 'November 23, 2026',
    intro: [
      'These Terms of Service (“Terms”) govern your use of the PrepCheck Academy website and tutoring services. By booking a session or using our services, you agree to these Terms. If you are booking on behalf of a student under 18, you confirm that you are their parent or legal guardian.',
    ],
    sections: [
      {
        id: 'services',
        title: 'Our Services',
        icon: 'GraduationCap',
        blocks: [
          { p: 'PrepCheck provides live, online one-on-one tutoring, test preparation and academic counseling. Course availability, tutors and schedules may change from time to time.' },
        ],
      },
      {
        id: 'accounts',
        title: 'Accounts and Eligibility',
        icon: 'UserCheck',
        blocks: [
          {
            list: [
              'You must provide accurate and complete information when registering or booking.',
              'Students under 18 may only use our services with the consent of a parent or guardian.',
              'You are responsible for keeping your login details confidential.',
            ],
          },
        ],
      },
      {
        id: 'bookings',
        title: 'Bookings, Scheduling and Cancellations',
        icon: 'CalendarCheck',
        blocks: [
          {
            list: [
              'Sessions are scheduled in your local time zone and confirmed by email.',
              'Sessions may be rescheduled with at least 24 hours’ notice.',
              'Missed sessions without notice (student no-shows) are counted as completed.',
            ],
          },
          { link: { to: '/refund-policy', label: 'See our Refund & Cancellation Policy for full details' } },
        ],
      },
      {
        id: 'payments',
        title: 'Fees and Payments',
        icon: 'CreditCard',
        blocks: [
          { p: 'Fees are shown before purchase and are payable in advance. Payments are processed securely by third-party payment providers. Refunds are handled in line with our Refund & Cancellation Policy.' },
        ],
      },
      {
        id: 'conduct',
        title: 'Code of Conduct',
        icon: 'ShieldCheck',
        blocks: [
          { p: 'We expect respectful behaviour from students, parents and tutors. We may suspend or end services in cases of abusive behaviour, misuse of the platform, or attempts to arrange paid sessions with PrepCheck tutors outside the platform.' },
        ],
      },
      {
        id: 'content',
        title: 'Learning Materials',
        icon: 'BookOpen',
        blocks: [
          { p: 'Worksheets, recordings and other materials provided by PrepCheck are for the enrolled student’s personal, non-commercial use and may not be shared or resold.' },
        ],
      },
      {
        id: 'liability',
        title: 'Results and Liability',
        icon: 'Scale',
        blocks: [
          { p: 'We work hard to help every student improve, but we cannot guarantee specific grades or exam results. To the extent permitted by law, PrepCheck’s liability is limited to the fees paid for the affected sessions.' },
        ],
      },
      {
        id: 'privacy',
        title: 'Privacy',
        icon: 'Lock',
        blocks: [
          { p: 'How we collect and use personal information is described in our Privacy Policy.' },
          { link: { to: '/privacy-policy', label: 'Read our Privacy Policy' } },
        ],
      },
      {
        id: 'changes',
        title: 'Changes and Governing Law',
        icon: 'FileClock',
        blocks: [
          { p: 'We may update these Terms from time to time and will post the updated version on this page. These Terms are governed by the laws of India, and disputes are subject to the jurisdiction of the courts in Mumbai.' },
        ],
      },
    ],
    draft: true,
  },

  'cookie-policy': {
    slug: 'cookie-policy',
    nav: 'Cookie Policy',
    badge: 'Cookie Information',
    title: 'Cookie Policy',
    subtitle: 'Learn about how PrepCheck uses cookies to improve your experience on our platform.',
    updated: 'October 1, 2025',
  },
}

export const COOKIE_TYPES = [
  {
    title: 'Essential Cookies',
    text: 'These cookies are necessary for the platform to function properly.',
    icon: 'ShieldCheck',
    tone: 'green',
    status: 'Required',
    examples: [
      'Authentication cookies (keep you logged in)',
      'Session cookies (maintain your browsing session)',
      'Security cookies (protect against fraud)',
      'Load balancing cookies (ensure optimal performance)',
    ],
    control: 'Cannot be disabled (required for platform)',
  },
  {
    title: 'Analytics Cookies',
    text: 'Help us understand how visitors interact with our platform.',
    icon: 'ChartColumn',
    tone: 'violet',
    status: 'Optional',
    examples: [
      'Google Analytics (visitor statistics)',
      'Page view tracking (popular content)',
      'User journey analysis (navigation patterns)',
      'Performance metrics (load times, errors)',
    ],
    control: 'Can be disabled in browser settings',
  },
  {
    title: 'Functional Cookies',
    text: 'Remember your preferences and settings for a personalized experience.',
    icon: 'Settings',
    tone: 'blue',
    status: 'Optional',
    examples: ['Language preference', 'Theme selection (dark/light mode)', 'Video playback settings', 'Notification preferences'],
    control: 'Can be disabled in browser settings',
  },
  {
    title: 'Marketing Cookies',
    text: 'Used to deliver relevant advertisements and track campaign effectiveness.',
    icon: 'Target',
    tone: 'orange',
    status: 'Optional',
    examples: [
      'Facebook Pixel (social media ads)',
      'Google Ads (search advertising)',
      'Remarketing cookies (show relevant ads)',
      'Conversion tracking (measure ad performance)',
    ],
    control: 'Can be disabled in browser settings',
  },
]

export const BROWSER_STEPS = [
  { browser: 'Google Chrome', path: ['Settings', 'Privacy and Security', 'Cookies and other site data'] },
  { browser: 'Mozilla Firefox', path: ['Options', 'Privacy & Security', 'Cookies and Site Data'] },
  { browser: 'Safari', path: ['Preferences', 'Privacy', 'Manage Website Data'] },
  { browser: 'Microsoft Edge', path: ['Settings', 'Cookies and site permissions', 'Manage cookies'] },
]
