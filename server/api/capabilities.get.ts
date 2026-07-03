import {
  HIRE_CAPABILITIES,
  STIMMIE_DIRECTORY_URL,
  STIMMIE_SECTIONS,
  STIMMIE_SITEMAP_URL,
  WORKSHOP_DECKS,
} from '../data/stimmie-sitemap'

export default defineEventHandler(() => ({
  sitemap: STIMMIE_SITEMAP_URL,
  directory: STIMMIE_DIRECTORY_URL,
  hireCapabilities: HIRE_CAPABILITIES,
  sections: STIMMIE_SECTIONS,
  workshopDecks: WORKSHOP_DECKS,
}))
