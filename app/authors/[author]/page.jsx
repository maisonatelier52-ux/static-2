"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import articleData from "../../../public/data/article.json";
import authorData from "../../../public/data/author.json";

function IconBadge() {
  return (
    <span className="mr-1 inline-flex h-4 w-4 shrink-0 items-center justify-center bg-amber-400 align-middle">
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="currentColor">
        <rect x="3" y="3" width="4" height="18" />
        <rect x="10" y="3" width="4" height="18" />
        <rect x="17" y="3" width="4" height="18" />
      </svg>
    </span>
  );
}

const SOCIAL_ICON_PATHS = {
  twitter:
    "M22 5.9c-.7.3-1.5.6-2.3.7a4 4 0 0 0 1.8-2.2c-.8.5-1.6.8-2.6 1a4 4 0 0 0-6.9 3.6A11.4 11.4 0 0 1 3.7 4.6a4 4 0 0 0 1.3 5.4c-.6 0-1.3-.2-1.8-.5v.1a4 4 0 0 0 3.3 4 4 4 0 0 1-1.8.1 4 4 0 0 0 3.8 2.8A8.1 8.1 0 0 1 2 18.4a11.4 11.4 0 0 0 6.3 1.9c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.2Z",
  linkedin:
    "M6.9 8.4H3.6V20h3.3V8.4ZM5.3 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.4 20h-3.3v-6c0-1.4 0-3.3-2-3.3s-2.3 1.6-2.3 3.2V20H9.5V8.4h3.2v1.6h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V20Z",
  email:
    "M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13Zm2.2.3 7.8 6.2 7.8-6.2H4.2Zm15.6 1.3-7.3 5.8a1.5 1.5 0 0 1-1.9 0L3.3 7.1v11.2h17.5V7.1Z",
};

function SocialIcon({ iconKey }) {
  const path = SOCIAL_ICON_PATHS[iconKey];
  if (!path) return null;
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

// Dates in article.json are stored as "DD/MM/YYYY"
const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
};

const formatDate = (dateStr) => {
  const d = parseDate(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

const PAGE_SIZE = 4;

export default function AuthorPage({ params }) {
  // Next.js 15+/16 passes `params` as a Promise — unwrap it with `use()`.
  const resolvedParams = use(params);
  const authorSlug = resolvedParams?.author;
  const authorEntry = Object.entries(authorData).find(
    ([, info]) => info.slug === authorSlug
  );
  const [authorName, authorInfo = {}] = authorEntry || [null, {}];

  const displayName =
    authorName ??
    (authorSlug
      ? authorSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "Staff Writer");

  const articles = Object.entries(articleData)
    .flatMap(([category, posts]) => posts.map((post) => ({ ...post, categorySlug: category })))
    .filter((post) => post.author === authorName)
    .sort((a, b) => parseDate(b.date) - parseDate(a.date));

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  const socialEntries = authorInfo.social
    ? Object.entries(authorInfo.social).map(([key, href]) => ({ key, href, label: key }))
    : [];

  return (
    <main className="w-full bg-white">
      {/* Author hero */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-8 sm:py-14 lg:px-16">
          <nav className="mb-6 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            <Link href="/" className="hover:text-neutral-800">Home</Link>
            <span className="mx-2">/</span>
            <Link href="#" className="hover:text-neutral-800">Authors</Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-800">{displayName}</span>
          </nav>

          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            {authorInfo.avatar && (
              <Image src={authorInfo.avatar} alt={displayName} width={128} height={128} className="h-28 w-28 shrink-0 rounded-full bg-neutral-200 object-cover sm:h-32 sm:w-32"/>
            )}
            <div>
              {authorInfo.title && (
                <p className="text-sm font-semibold uppercase tracking-wide text-amber-600">
                  {authorInfo.title}
                </p>
              )}
              <h1 className="mt-1 text-3xl font-bold text-neutral-900 sm:text-4xl">
                {displayName}
              </h1>
              {authorInfo.bio && (
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-600">
                  {authorInfo.bio}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-500">
                {authorInfo.joined && <span>{authorInfo.joined}</span>}
                {authorInfo.joined && (
                  <span className="hidden sm:inline text-neutral-300">•</span>
                )}
                <span>{articles.length} articles published</span>
              </div>

              {socialEntries.length > 0 && (
                <div className="mt-5 flex items-center gap-3">
                  {socialEntries.map((s) => (
                    <a key={s.key} href={s.href} aria-label={s.label} className="flex h-9 w-9 items-center justify-center border border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900">
                      <SocialIcon iconKey={s.key} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Articles by this author */}
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-8 sm:py-14 lg:px-16">
        <h2 className="mb-6 border-t-2 border-neutral-900 pt-6 text-xl font-bold text-neutral-900 sm:mb-8 sm:text-2xl">
          Articles by {displayName}
        </h2>

        {visibleArticles.length === 0 ? (
          <p className="text-neutral-500">No articles found for this author yet.</p>
        ) : (
          <div className="flex flex-col">
            {visibleArticles.map((article, index) => (
              <Link key={article.slug} href={`/${article.categorySlug}/${article.slug}`}
                className={`group flex flex-col gap-5 py-8 sm:flex-row sm:items-start sm:gap-8 ${
                  index !== visibleArticles.length - 1 ? "border-b border-neutral-200" : ""
                }`}
              >
                <div className="relative aspect-[4/3] w-full sm:w-56 sm:shrink-0">
                  <Image src={article.image} alt={article.imageAlt || article.title} fill className="bg-neutral-200 object-cover"/>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    {article.category}
                  </p>
                  <p className="mt-2 text-xl font-bold leading-snug text-neutral-900 group-hover:underline">
                    <IconBadge />
                    {article.title}
                  </p>
                  {article.dek && (
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                      {article.dek}
                    </p>
                  )}
                  <p className="mt-4 text-sm text-neutral-500">{formatDate(article.date)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button onClick={() => setVisibleCount((c) => c + PAGE_SIZE)} className="border border-neutral-900 px-8 py-3 text-sm font-bold text-neutral-900 hover:bg-neutral-900 hover:text-white">
              Load more
            </button>
          </div>
        )}
      </div>
    </main>
  );
}