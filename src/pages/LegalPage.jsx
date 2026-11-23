import { CookiePolicyPage } from '../components/legal/CookiePolicyPage'
import { PolicyPage } from '../components/legal/PolicyPage'

export default function LegalPage({ slug }) {
  if (slug === 'cookie-policy') return <CookiePolicyPage />
  return <PolicyPage key={slug} slug={slug} />
}
