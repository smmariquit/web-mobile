import { EXPERIENCE, PROFILE, PROFILE_SOURCE, WRITING } from '../data/profile'

export default defineEventHandler(() => ({
  source: PROFILE_SOURCE,
  profile: PROFILE,
  writing: WRITING,
  experience: EXPERIENCE,
}))
