// components/investigation.jsx
import Image from "next/image";
import Link from "next/link";

// ⚠️ Adjust this path to match where this component actually lives relative to /public/data
import articleData from "../public/data/article.json";

/**
 * components/investigation.jsx — homepage "Investigation" section.
 *
 * Same visual design as the original TrendingNews component (headline +
 * thumbnail rows, grouped into pairs with dividers that never touch) —
 * only the data source changed:
 *  - Pulls only from articleData["investigation"].
 *  - Sorted newest-first by date ("DD/MM/YYYY").
 *  - Takes the first 4 distinct articles via slice(0, 4) from a single
 *    sorted array, so no article can ever appear twice in this section.
 */

const CATEGORY_KEY = "investigation";
const ITEM_COUNT = 4;

// Dates in article.json are stored as "DD/MM/YYYY"
const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
};

// Small square icon badge used before certain headlines (matches the header's kicker style)
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

// Group items into rows of 2 so we can place a full-width divider between rows
// without it ever touching the vertical divider between columns.
function chunkIntoPairs(items) {
  const rows = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }
  return rows;
}

export default function Investigation() {
  const articles = articleData[CATEGORY_KEY] || [];

  // Newest first, then take the first N — each used exactly once.
  const items = [...articles]
    .sort((a, b) => parseDate(b.date) - parseDate(a.date))
    .slice(0, ITEM_COUNT);

  if (items.length === 0) {
    return null; // No investigation articles yet — render nothing.
  }

  const rows = chunkIntoPairs(items);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-8 sm:py-10 lg:px-16">
        <div className="border-t-2 border-neutral-900 pt-6">
          <h2 className="mb-6 text-xl font-bold text-neutral-900 sm:mb-12 sm:text-3xl">
            Investigation
          </h2>

          <div className="flex flex-col">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex}>
                {/* Row: two items, vertical divider only between them, only spans this row's height */}
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-y-0 sm:divide-x sm:divide-neutral-200">
                  {row.map((item, i) => (
                    <Link
                      key={item.slug}
                      href={`/${CATEGORY_KEY}/${item.slug}`}
                      className={`group flex items-start justify-between gap-6 ${
                        i === 0 ? "sm:pr-10" : "sm:pl-10"
                      }`}
                    >
                      <p className="text-lg font-bold leading-snug text-neutral-800 group-hover:underline">
                        {item.kicker === "EXCLUSIVE" && <IconBadge />}
                        {item.title}
                      </p>
                      <div className="relative aspect-[4/3] w-28 shrink-0 sm:w-32">
                        <Image
                          src={item.image}
                          alt={item.imageAlt || item.title}
                          fill
                          className="bg-neutral-200 object-cover"
                        />
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Horizontal divider: separate full-width line between rows, with margin on both sides so it never meets the vertical divider */}
                {rowIndex < rows.length - 1 && (
                  <div className="my-6 border-b border-neutral-200 sm:my-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}