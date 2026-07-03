import {
  COORDINATION,
  DEFINITION_OF_DONE,
  HIRE_PROCESS,
  SCOPE_EXAMPLE,
  TRUST_NARRATIVE,
} from '../data/engagement'

import { SITE_LINKS } from '../data/site'

export default defineEventHandler(() => ({
  links: SITE_LINKS,
  process: HIRE_PROCESS,
  scopeExample: SCOPE_EXAMPLE,
  trustNarrative: TRUST_NARRATIVE,
  coordination: COORDINATION,
  definitionOfDone: DEFINITION_OF_DONE,
}))
