export const GITHUB_USERNAME = 'smmariquit'

export const PROFILE_AVATAR_URL = '/profile/stimmie.jpg'

/** GitHub serves profile photos at github.com/{user}.png (redirects to avatars CDN). */
export function githubAvatarUrl(size = 128): string {
  return `https://github.com/${GITHUB_USERNAME}.png?size=${size}`
}
