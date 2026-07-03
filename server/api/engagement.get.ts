import {
  COORDINATION,
  DEFINITION_OF_DONE,
  HIRE_PROCESS,
  TRUST_NARRATIVE,
} from '../data/engagement'

import { SITE_LINKS } from '../data/site'

export default defineEventHandler(() => ({
  links: SITE_LINKS,
  process: HIRE_PROCESS,
  trustNarrative: TRUST_NARRATIVE,
  coordination: COORDINATION,
  definitionOfDone: DEFINITION_OF_DONE,
}))
