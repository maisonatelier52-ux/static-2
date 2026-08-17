// app/[category]/page.jsx
"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ⚠️ Adjust this path to match where this page.jsx actually lives relative to /public/data
import articleData from "../../public/data/article.json";

/**
 * app/[category]/page.jsx — category listing page.
 *
 * Same visual design as before (breadcrumb, bold rule + heading, bordered
 * card grid with icon badge + headline + excerpt + date, Load more button)
 * — only the data source changed to match article.json (same file used by
 * the article detail page):
 *  - Articles are read directly from articleData[category] instead of a
 *    hardcoded getCategoryArticles() function.
 *  - next/image instead of raw <img>.
 *  - next/link instead of <a href="...">.
 *  - Dates stored as "DD/MM/YYYY" and formatted with parseDate/formatDate,
 *    matching the article detail page's convention.
 *
 * See app/[category]/[slug]/page.jsx for the expected article.json shape.
 */

// Small square icon badge, matching the header/homepage kicker style
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

// Dates in article.json are stored as "DD/MM/YYYY"
const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
};

const formatDate = (dateStr) => {
  const d = parseDate(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

const PAGE_SIZE = 6;

export default function CategoryPage({ params }) {
  // Next.js 15+/16 passes `params` as a Promise — unwrap it with `use()`.
  const resolvedParams = use(params);
  const category = resolvedParams?.category;

  const articles = articleData[category] || [];
  const label = articles[0]?.category ?? category?.replace(/-/g, " ") ?? "News";

  // Newest first
  const sortedArticles = [...articles].sort((a, b) => parseDate(b.date) - parseDate(a.date));

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleArticles = sortedArticles.slice(0, visibleCount);
  const hasMore = visibleCount < sortedArticles.length;

  return (
    <main className="w-full bg-white">
      {/* Category header */}
      <div className="mx-auto max-w-[1400px] px-4 pt-8 sm:px-8 sm:pt-10 lg:px-16">
        <nav className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
          <Link href="/" className="hover:text-neutral-800">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="capitalize text-neutral-800">{label}</span>
        </nav>
        <h1 className="border-t-2 border-neutral-900 pt-6 text-3xl font-bold capitalize text-neutral-900 sm:text-4xl">
          {label}
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-600">
          The latest coverage, analysis, and reporting on {String(label).toLowerCase()}.
        </p>
      </div>

      {/* Article grid */}
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-8 lg:px-16">
        {visibleArticles.length === 0 ? (
          <p className="text-neutral-500">No articles found in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visibleArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/${category}/${article.slug}`}
                className="group flex flex-col border border-neutral-200 hover:border-neutral-400"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={article.image}
                    alt={article.imageAlt || article.title}
                    fill
                    className="bg-neutral-200 object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
                  <p className="text-lg font-bold leading-snug text-neutral-900 group-hover:underline">
                    <IconBadge />
                    {article.title}
                  </p>
                  {article.dek && (
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                      {article.dek}
                    </p>
                  )}
                  <p className="mt-auto pt-5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    {formatDate(article.date)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Load more */}
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="border border-neutral-900 px-8 py-3 text-sm font-bold text-neutral-900 hover:bg-neutral-900 hover:text-white"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </main>
  );
}