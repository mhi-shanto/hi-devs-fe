/** Primary app navigation (matches hi-devs routes) */
export const MAIN_NAV_ITEMS = [
  { label: 'Home', slug: 'HOME', href: '/', icon: 'Home' },
  {
    label: 'Questions',
    slug: 'QUESTIONS',
    href: '/questions',
    icon: 'MessageSquare',
  },
  { label: 'Jobs', slug: 'JOBS', href: '/jobs', icon: 'Briefcase' },
  { label: 'Blog', slug: 'BLOGS', href: '/blogs', icon: 'BookOpen' },
  {
    label: 'Applications',
    slug: 'APPLICATIONS',
    href: '/applications',
    icon: 'ClipboardList',
  },
  {
    label: 'Notifications',
    slug: 'NOTIFICATIONS',
    href: '/notifications',
    icon: 'Bell',
  },
] as const;

/** Account & preferences */
export const ACCOUNT_NAV_ITEMS = [
  { label: 'Profile', slug: 'PROFILE', href: '/profile', icon: 'User' },
  {
    label: 'Settings',
    slug: 'SETTINGS',
    href: '/settings',
    icon: 'Settings',
  },
] as const;

/** @deprecated Use ACCOUNT_NAV_ITEMS */
export const USER_NAV_ITEMS = ACCOUNT_NAV_ITEMS;
