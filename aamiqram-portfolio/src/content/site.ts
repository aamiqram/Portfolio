export const site = {
  name: "AAMIQRAM",
  shortName: "AAMI",
  url: "https://portfolio-aami.vercel.app",
  locale: "en_US",
  tagline: "I build interfaces that become complete products.",
  description:
    "Abu Abdullah Md Iqram is a Frontend Developer in Chattogram, Bangladesh, building modern responsive web applications with React and Next.js, plus the backend, data, auth, payment and AI layers those products need.",
  author: "Abu Abdullah Md Iqram",
  role: "Frontend Developer",
  location: "Chattogram, Bangladesh",
  /** Rough working hours, so a visitor knows when a reply is realistic. */
  timezone: "UTC+6, Bangladeshi time",
  email: "aamiqram24@gmail.com",
  phone: "+880 1625 471342",
  whatsapp: "+880 1580 672804",
  resume: {
    label: "Résumé",
    href: "https://drive.google.com/file/d/1p2gA9PH2viXdWCA0oK2ieEInZaReU2ph/view?usp=sharing",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/aamiqram" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aamiqram/" },
    { label: "X", href: "https://x.com/aami_10" },
    { label: "Facebook", href: "https://www.facebook.com/aamiqram/" },
    { label: "Instagram", href: "https://www.instagram.com/aamiqram/" },
  ],
  links: {
    github: "https://github.com/aamiqram",
    linkedin: "https://www.linkedin.com/in/aamiqram",
    portfolio: "https://portfolio-aami.vercel.app",
  },
} as const;

export type NavItem = {
  href: string;
  label: string;
};

export const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/engineering", label: "Engineering" },
  { href: "/tech-stack", label: "Tech Stack" },
  { href: "/about", label: "About" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Work",
    items: [
      { href: "/projects", label: "Projects" },
      { href: "/engineering", label: "Engineering" },
      { href: "/tech-stack", label: "Tech Stack" },
    ],
  },
  {
    title: "Profile",
    items: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/", label: "Home" },
    ],
  },
];