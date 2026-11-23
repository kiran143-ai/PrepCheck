import { useParams } from 'react-router-dom'
import { CountryPage } from '../components/country/CountryPage'
import { COUNTRY_PAGES } from '../data/countries'
import NotFoundPage from './NotFoundPage'

export default function CountryTutoringPage() {
  const { country } = useParams()
  if (!COUNTRY_PAGES[country]) return <NotFoundPage />
  // key resets per-page state (clocks, counters) when switching countries
  return <CountryPage key={country} slug={country} />
}
