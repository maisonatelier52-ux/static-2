// components/finance.jsx
import Image from "next/image";
import Link from "next/link";

// ⚠️ Adjust this path to match where this component actually lives relative to /public/data
import articleData from "../public/data/article.json";

/**
 * components/finance.jsx — homepage "Finance" section.
 *
 * Same visual design as the original EditorsPicks component (3-card grid,
 * icon badge + headline + excerpt + read time) — only the data source
 * changed:
 *  - Pulls only from articleData["finance"].
 *  - Sorted newest-first by date ("DD/MM/YYYY").
 *  - Takes the first 3 distinct articles — since each comes from a single
 *    sorted array via slice(0, 3), no article can ever appear twice in
 *    this section.
 */

const CATEGORY_KEY = "finance";
const CARD_COUNT = 3;

// Dates in article.json are stored as "DD/MM/YYYY"
const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
};

// Small square icon badge used before certain headlines (matches the header's kicker style)
function IconBadge() {
  return (
    <span className="mr-1 inline-flex h-4 w-4 items-center justify-center bg-amber-400 align-middle">
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="currentColor">
        <rect x="3" y="3" width="4" height="18" />
        <rect x="10" y="3" width="4" height="18" />
        <rect x="17" y="3" width="4" height="18" />
      </svg>
    </span>
  );
}

export default function Finance() {
  const articles = articleData[CATEGORY_KEY] || [];

  // Newest first, then take the first N — each used exactly once.
  const picks = [...articles]
    .sort((a, b) => parseDate(b.date) - parseDate(a.date))
    .slice(0, CARD_COUNT);

  if (picks.length === 0) {
    return null; // No finance articles yet — render nothing.
  }

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-8 sm:py-10 lg:px-16">
        <div className="border-t-2 border-neutral-900 pt-6">
          <h2 className="mb-6 text-xl font-bold text-neutral-900 sm:mb-8 sm:text-2xl">
            Finance
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-3">
            {picks.map((pick) => (
              <article
                key={pick.slug}
                className="flex flex-col border border-neutral-200"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={pick.image}
                    alt={pick.imageAlt || pick.title}
                    fill
                    className="bg-neutral-200 object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col px-5 pb-6 pt-6 text-center sm:px-6">
                  <Link href={`/${CATEGORY_KEY}/${pick.slug}`} className="group">
                    <p className="text-base font-bold leading-snug text-neutral-900 group-hover:underline sm:text-lg">
                      <IconBadge />
                      {pick.title}
                    </p>
                  </Link>
                  {pick.dek && (
                    <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:mt-4 sm:text-[15px]">
                      {pick.dek}
                    </p>
                  )}
                  {pick.readTime && (
                    <p className="mt-auto pt-6 text-xs text-neutral-500 sm:pt-8 sm:text-sm">
                      {pick.readTime}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}