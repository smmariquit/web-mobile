import { AGENT_PIPELINE, GUARDRAILS, PILLARS } from '../data/engineering'

export default defineEventHandler(() => ({
  pipeline: AGENT_PIPELINE,
  guardrails: GUARDRAILS,
  pillars: PILLARS,
}))
