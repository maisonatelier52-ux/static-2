"use client";

import { useState, useEffect, useMemo } from "react";
import { Menu, X, Search, CircleUserRound } from "lucide-react";
import Link from "next/link";
import articleData from "../public/data/article.json";

const NAV_LINKS = [
  { label: "Business", slug: "business" },
  { label: "Finance", slug: "finance" },
  { label: "World", slug: "world" },
  { label: "Politics", slug: "politics" },
  { label: "U.S.", slug: "us" },
  { label: "Sports", slug: "sports" },
];

const ALL_ARTICLES = Object.entries(articleData).flatMap(([category, posts]) =>
  posts.map((post) => ({ ...post, categorySlug: category }))
);

const MAX_RESULTS = 6;

export default function Header() {
  const [now, setNow] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  const dateLabel = now
    ? now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const timeLabel = now
    ? now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ALL_ARTICLES.filter((article) =>
      article.title.toLowerCase().includes(q)
    ).slice(0, MAX_RESULTS);
  }, [query]);

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <header className="relative w-full bg-neutral-900 text-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6">
        <div className="hidden min-w-[160px] flex-col text-sm leading-tight sm:flex">
          <span className="font-semibold">{dateLabel}</span>
          <span className="text-neutral-300">{timeLabel}</span>
        </div>

        {/* Mobile menu button */}
        <button aria-label="Open menu" onClick={() => setMenuOpen(true)} className="text-neutral-200 hover:text-white sm:hidden">
          <Menu className="h-6 w-6" strokeWidth={2} />
        </button>

        {/* Logo */}
        <Link href="/" className="mx-auto text-4xl tracking-tight sm:text-5xl [font-family:var(--font-logo)]">
          Le Monde
        </Link>

        {/* Right controls */}
        <div className="flex items-center gap-4 sm:min-w-[160px] sm:justify-end">
          <button aria-label="Search" onClick={() => setSearchOpen((open) => !open)} className="text-neutral-200 hover:text-white">
            <Search className="h-5 w-5" strokeWidth={2} />
          </button>
          <button className="hidden rounded-sm bg-amber-400 px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-amber-300 sm:block">
            Subscribe
          </button>
          <button aria-label="Account" className="text-neutral-200 hover:text-white">
            <CircleUserRound className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Bottom nav — desktop only, centered */}
      <nav className="hidden border-t border-neutral-700 sm:block">
        <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-6 overflow-x-auto px-4 py-3 text-sm font-semibold sm:px-6">
          {NAV_LINKS.map((item) => (
            <Link key={item.slug} href={`/${item.slug}`} className="whitespace-nowrap hover:text-amber-300">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div className="absolute left-0 right-0 top-full z-50 border-t border-neutral-700 bg-neutral-900 shadow-xl">
          <div className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 shrink-0 text-neutral-400" strokeWidth={2} />
              <input type="text" autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles..." className="w-full bg-transparent text-lg text-white placeholder-neutral-500 focus:outline-none"/>
              <button aria-label="Close search" onClick={closeSearch} className="text-neutral-400 hover:text-white">
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

            {/* Results */}
            {query.trim() !== "" && (
              <div className="mt-4 border-t border-neutral-800 pt-4">
                {results.length === 0 ? (
                  <p className="py-2 text-sm text-neutral-500">
                    No articles found for "{query}".
                  </p>
                ) : (
                  <ul className="flex flex-col">
                    {results.map((article) => (
                      <li key={article.slug}>
                        <Link href={`/${article.categorySlug}/${article.slug}`} onClick={closeSearch} className="group flex flex-col gap-0.5 border-b border-neutral-800 py-3 last:border-0">
                          <span className="text-xs font-semibold uppercase tracking-wide text-amber-400">
                            {article.category}
                          </span>
                          <span className="text-sm font-semibold text-white group-hover:underline">
                            {article.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile sliding menu */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 sm:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" onClick={() => setMenuOpen(false)}/>

        {/* Sliding panel */}
        <div
          className={`absolute left-0 top-0 h-full w-72 max-w-[80%] bg-neutral-900 text-white shadow-xl transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-neutral-700 px-5 py-4">
            <span className="text-2xl [font-family:var(--font-logo)]">Le Monde</span>
            <button aria-label="Close menu" onClick={() => setMenuOpen(false)} className="text-neutral-200 hover:text-white">
              <X className="h-6 w-6" strokeWidth={2} />
            </button>
          </div>

          <nav className="flex flex-col px-5 py-4">
            {NAV_LINKS.map((item) => (
              <Link key={item.slug} href={`/${item.slug}`} onClick={() => setMenuOpen(false)} className="border-b border-neutral-800 py-3 text-base font-semibold hover:text-amber-300">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}