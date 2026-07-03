export interface ProjectPreviews {
  desktop?: string
  tablet?: string
  mobile?: string
}

export interface ProjectLinks {
  live?: string
  github?: string
}

export interface PortfolioProject {
  slug: string
  title: string
  subtitle: string
  category: 'web' | 'mobile' | 'extension'
  year: number
  featured: boolean
  description: string
  impact: string
  situation: string
  constraint: string
  reasoning: string
  decision: string
  craftMoment: string
  outcome: string
  postmortem: string
  stack: string[]
  links: ProjectLinks
  previews?: ProjectPreviews
  images?: string[]
  color: string
}

function previewPaths(slug: string): ProjectPreviews {
  const base = `/projects/${slug}`
  return {
    desktop: `${base}/desktop.jpg`,
    tablet: `${base}/tablet.jpg`,
    mobile: `${base}/mobile.jpg`,
  }
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    slug: 'hearthcraft',
    title: 'HearthCraft',
    subtitle: '7-year community server I led as an operations lab',
    category: 'web',
    year: 2018,
    featured: true,
    description:
      'A long-running Minecraft community where uptime, moderation, cost, and fairness had to be designed together.',
    impact: '50,000+ players · 7 years · 0 world resets · donation-funded ops',
    situation:
      'HearthCraft was a free, community-driven Minecraft server I led from 2018 to 2025. It started as a small world for friends and grew into a live community with staff, player support, hosting bills, and a strong no-pay-to-win rule.',
    constraint:
      'Budget stayed donation-funded, about $150 to $200 per month at peak. The world had to stay online for players across time zones, run on modest compute, and never reset as a shortcut for maintenance.',
    reasoning:
      'A managed cloud stack would have cut some admin work, but the monthly bill climbed fast. A dedicated bare-metal box from Bloom.host gave predictable CPU and RAM for one flat cost that donations could cover. Paid plugins could have bought convenience, but they would have pulled the economy toward unfair advantages.',
    decision:
      'I bought that dedicated Bloom.host machine, containerized the Java server in Docker, and kept restart and backup scripts simple enough for volunteer staff to run. The shop funded hosting without selling gameplay power.',
    craftMoment:
      'The work was not only keeping a process alive. I treated lag spikes, grief reports, and staff mistakes as production incidents, with backups, rollback habits, and runbooks instead of panic fixes.',
    outcome:
      'HearthCraft ran for seven years without resetting the world. Players logged thousands of hours, donations covered hosting, and the project became my first serious lesson in operating software for people who relied on it daily.',
    postmortem:
      'If I were rebuilding it now, I would add better telemetry and migration scripts so staff could spot performance and data issues earlier.',
    stack: ['Java', 'Docker', 'Spigot/Paper', 'Linux'],
    links: {
      live: 'https://hearthcraft.stimmie.dev',
      github: 'https://github.com/smmariquit/hearthcraft-museum',
    },
    previews: {
      desktop: '/projects/hearthcraft/desktop.jpg',
      mobile: '/projects/hearthcraft/mobile.png',
    },
    images: [
      '/projects/hearthcraft/desktop.jpg',
      '/projects/hearthcraft/mobile.png',
      '/projects/hearthcraft-2.jpg',
      '/projects/hearthcraft-3.jpg',
    ],
    color: '#e8a946',
  },
  {
    slug: 'room-tba',
    title: 'Room TBA',
    subtitle: 'UPLB campus room and class finder',
    category: 'web',
    year: 2026,
    featured: true,
    description:
      'An offline-capable campus viewer for students who need building, dorm, and room data when campus Wi-Fi fails.',
    impact: '500+ student users · offline search · static hosting',
    situation:
      'Incoming UPLB students often had schedules with unfamiliar room codes and no easy way to map them to real buildings. Room TBA turns campus room data, dorms, buildings, and paths into a searchable 3D viewer.',
    constraint:
      'The team had volunteer help, no budget, and an orientation deadline. Campus Wi-Fi is unreliable, so the map needed to keep working after a first visit instead of depending on a server round trip.',
    reasoning:
      'A fully hosted map service would have made search logic simpler, but it would also add a bill and fail when the network failed. Static hosting with offline storage fit the actual student problem better.',
    decision:
      'I used Astro for the static site, three.js for the 3D campus view, and PGlite, a browser SQLite database, stored in IndexedDB for offline room data. Cloudflare handles the small dynamic pieces when the network is available.',
    craftMoment:
      'I moved geometry and search indexing into a Web Worker so the first load could prepare the map without freezing the interface. After that, students could search rooms even when campus Wi-Fi dropped.',
    outcome:
      'The app launched before freshman orientation and has helped more than 500 students find classes and dorms. The bigger win was matching the architecture to campus reality: cheap to host, quick to load, and useful offline.',
    postmortem:
      'The next improvement would be a cleaner data update workflow so volunteers can refresh room records without touching the application code.',
    stack: ['Astro', 'TypeScript', 'Three.js', 'PGlite', 'OpenStreetMap', 'PWA'],
    links: {
      live: 'https://room-tba.stimmie.dev',
      github: 'https://github.com/smmariquit/room-tba',
    },
    previews: previewPaths('room-tba'),
    images: ['/projects/room-tba/desktop.jpg', '/projects/room-tba/mobile.jpg'],
    color: '#3ecfb0',
  },
  {
    slug: 'bus-ticketing-app',
    title: 'Bus Ticketing System',
    subtitle: 'Offline ticketing app for Sunmi POS hardware',
    category: 'mobile',
    year: 2025,
    featured: true,
    description:
      'A React Native fare collection app for Android POS tablets, printed receipts, and weak network conditions.',
    impact: '10 tested devices · offline queue · APK builds in CI',
    situation:
      'A regional bus operation needed drivers to issue tickets from Android POS tablets. The app had to calculate fares, print receipts over Bluetooth, and keep transactions even when the route had no reliable signal.',
    constraint:
      'The build had a two-week timeline, one developer, low-end hardware, and spotty mobile data. A double charge or lost ticket would be worse than a slow sync.',
    reasoning:
      'A web app would have been easier to deploy, but it could not dependably reach the printer or survive long offline stretches. Native Android was possible, but React Native gave enough hardware access while keeping iteration speed high.',
    decision:
      'I built a React Native APK with local SQLite storage, Bluetooth receipt printing, and HTTP sync only when cellular data was available. Fare rules were covered by Jest tests before release.',
    craftMoment:
      'The key detail was a journaling queue around ticket printing. One tap records intent, prints once, and only retries when the failure is safe to retry, which avoids duplicate charges during flaky printer states.',
    outcome:
      'The POS app printed reliably on 10 tested devices and kept transactions locally through network drops. Drivers could keep selling tickets first, then let the device sync when the route had signal again.',
    postmortem:
      'With more time, I would add a small supervisor dashboard so managers can see unsynced devices before the end of a route.',
    stack: ['React Native', 'TypeScript', 'SQLite', 'Jest', 'GitHub Actions'],
    links: {
      github: 'https://github.com/smmariquit/bus-ticketing-app',
    },
    previews: {
      mobile: '/projects/bus-ticketing-app/mobile.png',
    },
    images: ['/projects/bus-ticketing-app/mobile.png'],
    color: '#e86a7e',
  },
  {
    slug: 'revolt',
    title: 'Revolt',
    subtitle: 'EV charging map, trip planning, and reservations',
    category: 'mobile',
    year: 2026,
    featured: true,
    description:
      'Expo app for finding chargers, planning routes with stops, and booking slots. Still in MVP development.',
    impact: 'Expo MVP · OpenChargeMap · Supabase schema · tiered CI',
    situation:
      'Revolt targets EV owners who need nearby chargers, trip routes with charging stops, and a way to reserve a slot before they arrive. The product is a team MVP, not a shipped store release yet.',
    constraint:
      'The team had to move fast on maps and reservations without owning station inventory. Google Maps costs, OpenChargeMap response shapes, and mobile GPS quirks had to be handled before payments or live availability.',
    reasoning:
      'A native rewrite would slow iteration on map and trip flows. Expo kept device testing quick while React Navigation and react-native-maps covered the core UX. Station listings stay on OpenChargeMap, with Supabase and Prisma only for profiles, vehicles, and reservations.',
    decision:
      'I wired trip planning so route calculation runs once and passes into the route screen, extracted domain helpers for station parsing, and tightened CI with tiered Jest runs plus component tests on shared loading and error states.',
    craftMoment:
      'Plan trip and route screens were both calling the route API, which wasted requests and showed inconsistent distances. Computing once and passing the result fixed the flicker and the cost pattern.',
    outcome:
      'The MVP covers map browse, trip planning, reservations, and a staging-to-main pipeline with lint, type checks, and regression tests. Store launch and live payments are still ahead.',
    postmortem:
      'I would finish Supabase auth and Stripe wiring before adding more map screens, because reservation flows need real identity and payment guards early.',
    stack: ['Expo', 'React Native', 'TypeScript', 'Supabase', 'Prisma', 'OpenChargeMap'],
    links: {
      github: 'https://github.com/anneryeo/REVolt',
    },
    previews: {
      mobile: '/projects/revolt/mobile.png',
    },
    images: ['/projects/revolt/mobile.png'],
    color: '#16a34a',
  },
  {
    slug: 'uplb-dsg-website',
    title: 'UPLB DSG Website',
    subtitle: 'UPLB Data Science Guild org site',
    category: 'web',
    year: 2026,
    featured: false,
    description:
      'A student org site designed around events, recruitment, and a clearer identity than a generic template could provide.',
    impact: 'Design lead · org site · workshop sign-ups',
    situation:
      'The UPLB Data Science Guild needed a public site for recruitment, events, and workshop sign-ups. The site had to feel like the student guild itself, not a placeholder page with a logo at the top.',
    constraint:
      'The stakeholders were volunteers, the budget was zero, and updates had to be simple enough for student officers to handle during busy semesters.',
    reasoning:
      'A generic template would have shipped faster, but it would not explain the guild culture or make events easy to scan. A custom static site took more care up front and reduced maintenance later.',
    decision:
      'I led the visual direction and built a responsive static site with a simple content structure. The priority was clear event paths, readable sections, and a design system future officers could copy without asking a developer each time.',
    craftMoment:
      'I set up preview checks around content changes so new event posts could be reviewed before they went public. That mattered because student org sites often break through rushed last-minute updates.',
    outcome:
      'The DSG site gave the guild a cleaner home for workshops and recruitment. It also proved that a zero-budget org project can still have deliberate design choices instead of settling for a copied template.',
    postmortem:
      'The next pass should move event content into a small editor-friendly format so non-developers can publish updates faster.',
    stack: ['SvelteKit', 'Figma', 'Responsive UI', 'GitHub Pages'],
    links: {
      live: 'https://stimmie.dev/projects/uplb-dsg-website',
    },
    previews: {
      desktop: '/projects/uplb-dsg-website/desktop.png',
      mobile: '/projects/uplb-dsg-website/mobile.png',
    },
    images: [
      '/projects/uplb-dsg-website/desktop.png',
      '/projects/uplb-dsg-website/mobile.png',
    ],
    color: '#9d4edd',
  },
  {
    slug: 'gradesim',
    title: 'Elbi GradeSim',
    subtitle: 'UPLB grade simulator and browser extension',
    category: 'extension',
    year: 2026,
    featured: false,
    description:
      'A grade planning tool for UPLB students that keeps calculations on-device and ships through extension stores.',
    impact: '200+ student users yearly · store releases · offline exports',
    situation:
      'UPLB students often plan grades with spreadsheets passed around in group chats. GradeSim turns that habit into a small browser tool for GWA calculations, Latin honors targets, and course what-ifs.',
    constraint:
      'The project had no budget, student users, and sensitive academic data that did not need to touch a server. It also had to work as both a website and an installable browser extension.',
    reasoning:
      'A mobile app would have added store friction, and a server-backed planner would create privacy work without a clear benefit. A browser extension kept the tool close to where students already checked academic pages.',
    decision:
      'I used Next.js and a Manifest V3 extension build, then automated releases with semantic-release. Grade calculations run locally so students can plan without creating an account.',
    craftMoment:
      'The export feature uses the Chrome downloads API so students can save grade scenarios offline. It is a small feature, but it turns a temporary calculation into something they can revisit before enlistment.',
    outcome:
      'GradeSim launched across web and extension flows and now helps around 200 students a year plan course loads. The project stayed intentionally small because local calculation solved the real problem.',
    postmortem:
      'I would add better import checks next, especially for messy copied grade tables from different campus systems.',
    stack: ['Next.js', 'TypeScript', 'Browser extension', 'Semantic Release'],
    links: {
      live: 'https://gradesim.stimmie.dev',
      github: 'https://github.com/smmariquit/gradesim',
    },
    previews: {
      desktop: '/projects/gradesim/desktop.png',
      mobile: '/projects/gradesim/mobile.png',
    },
    images: [
      '/projects/gradesim/desktop.png',
      '/projects/gradesim/mobile.png',
    ],
    color: '#c41e3a',
  },
  {
    slug: 'atlas-of-my-skies',
    title: 'Atlas of My Skies',
    subtitle: 'Photography portfolio',
    category: 'web',
    year: 2025,
    featured: true,
    description:
      'A personal photography site that treats places, dates, and weather as part of the story behind each image.',
    impact: 'Photography · mapped archive · personal publishing',
    situation:
      'Atlas of My Skies began as a way to keep sky photos from becoming another unsearchable camera roll. I wanted each image to carry enough context that it could be read like a small journal entry.',
    constraint:
      'The site needed to stay lightweight, image-heavy, and cheap to host. It also had to keep the publishing flow simple enough that adding photos would not become a separate weekend project.',
    reasoning:
      'A full CMS was more machinery than the project needed. Static pages with structured metadata gave me the archive behavior I wanted without a database.',
    decision:
      'I built the site with Next.js and local content metadata, then kept the visual system quiet so the photos carry the page. The map and archive structure provide context without turning it into a dashboard.',
    craftMoment:
      'The useful detail was pairing each photo with place and moment data. That made the archive browsable by memory, not only by file name.',
    outcome:
      'The result is a personal portfolio that is simple to maintain and specific to the work. It also gave me a reusable pattern for visual archives with structured context.',
    postmortem:
      'I would add a faster batch-editing flow before the archive grows much larger.',
    stack: ['Next.js', 'TypeScript'],
    links: {
      live: 'https://atlas-of-my-skies.stimmie.dev',
      github: 'https://github.com/smmariquit/atlas-of-my-skies',
    },
    previews: previewPaths('atlas-of-my-skies'),
    images: [
      '/projects/atlas-of-my-skies-1.jpg',
      '/projects/atlas-of-my-skies-2.jpg',
      '/projects/atlas-of-my-skies-3.jpg',
    ],
    color: '#9678f0',
  },
  {
    slug: 'pizza-and-friends',
    title: 'Pizza & Friends',
    subtitle: 'Tech community site',
    category: 'web',
    year: 2026,
    featured: false,
    description:
      'A community landing page for meetups and projects, written to feel like people inviting people.',
    impact: 'Co-founder · community home · joinpizza.fun',
    situation:
      'Pizza & Friends needed a small web home for a tech community that started around dinner tables, Discord, and shared projects. The site had to invite people in without sounding like a corporate group.',
    constraint:
      'The community was young, the content would change, and the page had to be useful before there were many formal programs to list.',
    reasoning:
      'A heavy content system would have slowed the first version. A static landing page let us clarify the promise, link the Discord, and leave room for the community to grow into the site.',
    decision:
      'I kept the structure simple: who it is for, what happens there, and how to join. The writing does most of the work, with enough visual identity to feel specific without locking the group into a brand system too early.',
    craftMoment:
      'The main edit was removing phrases that sounded like a startup pitch. Community sites work better when they sound like the people who actually show up.',
    outcome:
      'The site gave Pizza & Friends a clear place to point new members and collaborators. It also kept the maintenance burden low while the community figured out its rhythm.',
    postmortem:
      'The next useful step is a small events archive once meetups become more regular.',
    stack: ['Web', 'Community', 'Responsive UI'],
    links: {
      live: 'https://www.joinpizza.fun',
    },
    previews: {
      desktop: '/projects/pizza-and-friends/desktop.png',
      mobile: '/projects/pizza-and-friends/mobile.png',
    },
    images: [
      '/projects/pizza-and-friends/desktop.png',
      '/projects/pizza-and-friends/mobile.png',
    ],
    color: '#c22e1f',
  },
  {
    slug: 'kape',
    title: 'Kape',
    subtitle: 'Open-source tip jar',
    category: 'web',
    year: 2026,
    featured: false,
    description:
      'A local creator tip jar that avoids platform cuts and keeps the payment path simple.',
    impact: 'Open source · Philippine payment rails · kape.stimmie.dev',
    situation:
      'Kape is a free buy-me-a-coffee alternative for local creators who want a link they own and a payment flow that makes sense in the Philippines.',
    constraint:
      'The project had to stay open source, avoid a platform cut, and support local payment habits without building a financial product larger than the need.',
    reasoning:
      'A marketplace model would add moderation, billing, and dispute handling. A personal tip jar keeps the scope honest: profile, payment link, and enough structure for creators to share it.',
    decision:
      'I built the first version as a lightweight web app with creator-owned links and no platform fee. The stack stays intentionally small because trust in a payments-adjacent tool comes from clarity, not extra screens.',
    craftMoment:
      'The important product decision was what not to store. Keeping sensitive payment handling outside the app reduces the risk surface while still giving creators a useful public page.',
    outcome:
      'Kape now works as an open-source reference for simple local creator support pages. It shows the same habit I bring to client work: narrow the scope until the risk matches the budget.',
    postmortem:
      'Before expanding it, I would write clearer provider setup docs so other creators can self-host with fewer questions.',
    stack: ['Web', 'Open Source', 'Payments'],
    links: {
      live: 'https://kape.stimmie.dev',
    },
    previews: {
      desktop: '/projects/kape/desktop.png',
      mobile: '/projects/kape/mobile.png',
    },
    images: [
      '/projects/kape/desktop.png',
      '/projects/kape/mobile.png',
    ],
    color: '#d98e27',
  },
]

export const CAPTURE_TARGETS = PORTFOLIO_PROJECTS.filter((p) => p.links.live).map((p) => ({
  slug: p.slug,
  url: p.links.live!,
}))
