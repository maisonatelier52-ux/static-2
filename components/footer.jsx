"use client";

const FOOTER_SECTIONS = [
  {
    title: "News",
    links: ["World", "Europe", "France", "Environment", "Opinion"],
  },
  {
    title: "Discover",
    links: ["M Magazine", "French Delights", "Summer Reads", "Podcasts", "Videos"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Advertise with Us"],
  },
  {
    title: "Help",
    links: ["Subscriber Support", "FAQ", "Contact Us", "Accessibility"],
  },
];

const LEGAL_LINKS = [
  "Terms of Service",
  "Privacy Policy",
  "Cookie Policy",
  "Manage Cookies",
];

// Simple inline SVG icons — avoids relying on brand icons from icon packages,
// which get removed/renamed over time due to trademark restrictions.
const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "#",
    path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z",
  },
  {
    label: "Twitter",
    href: "#",
    path: "M22 5.9c-.7.3-1.5.6-2.3.7a4 4 0 0 0 1.8-2.2c-.8.5-1.6.8-2.6 1a4 4 0 0 0-6.9 3.6A11.4 11.4 0 0 1 3.7 4.6a4 4 0 0 0 1.3 5.4c-.6 0-1.3-.2-1.8-.5v.1a4 4 0 0 0 3.3 4 4 4 0 0 1-1.8.1 4 4 0 0 0 3.8 2.8A8.1 8.1 0 0 1 2 18.4a11.4 11.4 0 0 0 6.3 1.9c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.2Z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.5.5.7.3 1.2.6 1.8 1.2.6.6.9 1.1 1.2 1.8.3.7.5 1.4.5 2.5.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.5 2.5-.3.7-.6 1.2-1.2 1.8-.6.6-1.1.9-1.8 1.2-.7.3-1.4.5-2.5.5-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.5-.5a5 5 0 0 1-1.8-1.2 5 5 0 0 1-1.2-1.8c-.3-.7-.5-1.4-.5-2.5C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.5-2.5.3-.7.6-1.2 1.2-1.8.6-.6 1.1-.9 1.8-1.2.7-.3 1.4-.5 2.5-.5C8.9 2 9.3 2 12 2Zm0 1.8c-2.6 0-3 0-4 .1-.9 0-1.4.2-1.7.3-.4.2-.7.4-1 .7-.3.3-.5.6-.7 1-.1.3-.3.8-.3 1.7-.1 1-.1 1.4-.1 4s0 3 .1 4c0 .9.2 1.4.3 1.7.2.4.4.7.7 1 .3.3.6.5 1 .7.3.1.8.3 1.7.3 1 .1 1.4.1 4 .1s3 0 4-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.4 1-.7.3-.3.5-.6.7-1 .1-.3.3-.8.3-1.7.1-1 .1-1.4.1-4s0-3-.1-4c0-.9-.2-1.4-.3-1.7-.2-.4-.4-.7-.7-1a2.8 2.8 0 0 0-1-.7c-.3-.1-.8-.3-1.7-.3-1-.1-1.4-.1-4-.1Zm0 3.3a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2Zm5.1-2a1.1 1.1 0 1 1 0 2.3 1.1 1.1 0 0 1 0-2.3Z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M21.6 7.2s-.2-1.5-.9-2.1c-.8-.9-1.7-.9-2.1-1C15.7 4 12 4 12 4s-3.7 0-6.6.2c-.4 0-1.3 0-2.1 1-.7.6-.9 2.1-.9 2.1S2 9 2 10.7v1.6C2 14 2.2 15.7 2.2 15.7s.2 1.5.9 2.1c.8.9 1.9.9 2.4 1 1.7.2 7.2.2 7.2.2s3.7 0 6.6-.2c.4 0 1.3 0 2.1-1 .7-.6.9-2.1.9-2.1s.2-1.7.2-3.4v-1.6c0-1.7-.2-3.5-.2-3.5ZM9.9 14.6V8.9l5.4 2.9-5.4 2.8Z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M6.9 8.4H3.6V20h3.3V8.4ZM5.3 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.4 20h-3.3v-6c0-1.4 0-3.3-2-3.3s-2.3 1.6-2.3 3.2V20H9.5V8.4h3.2v1.6h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V20Z",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral-900 text-white">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
        {/* Top: logo + subscribe prompt */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-neutral-700 pb-10 sm:flex-row sm:items-center">
          <a href="/" className="text-4xl [font-family:var(--font-logo)]">Le Monde</a>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <p className="text-sm text-neutral-300">Support independent journalism. Subscribe today.</p>
            <button className="rounded-sm bg-amber-400 px-5 py-2 text-sm font-semibold text-neutral-900 hover:bg-amber-300">
              Subscribe
            </button>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 py-10 sm:grid-cols-4">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-400">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-neutral-200 hover:text-amber-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social icons — centered */}
        <div className="flex items-center justify-center gap-5 border-t border-neutral-700 py-8">
          {SOCIAL_LINKS.map(({ label, href, path }) => (
            <a key={label} href={href} aria-label={label} className="text-neutral-300 hover:text-white">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d={path} />
              </svg>
            </a>
          ))}
        </div>

        {/* Legal bar */}
        <div className="flex flex-col gap-4 border-t border-neutral-700 pt-6 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Le Monde. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-neutral-200">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}