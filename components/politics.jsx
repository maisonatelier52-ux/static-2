// components/politics.jsx
import Image from "next/image";
import Link from "next/link";

// ⚠️ Adjust this path to match where this component actually lives relative to /public/data
import articleData from "../public/data/article.json";

/**
 * components/politics.jsx — homepage "Politics" section.
 *
 * Same visual design as the original World component (lead story + two
 * headline-only columns) — only the data source changed:
 *  - Pulls only from articleData["politics"].
 *  - Sorted newest-first by date ("DD/MM/YYYY").
 *  - Takes the first 7 distinct articles from a single sorted array and
 *    assigns them, in order, to lead / mid column (3) / right column (3) —
 *    so no article can ever appear twice in this section.
 */

const CATEGORY_KEY = "politics";

// Dates in article.json are stored as "DD/MM/YYYY"
const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
};

// Small square icon badge used before every headline (matches the header's kicker style)
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

function HeadlineList({ items }) {
  return (
    <ul className="flex flex-col">
      {items.map((item, index) => (
        <li
          key={item.slug}
          className={
            index !== items.length - 1
              ? "border-b border-neutral-200 py-5"
              : "py-5"
          }
        >
          <Link href={`/${CATEGORY_KEY}/${item.slug}`} className="group block">
            <p className="text-base font-bold leading-snug text-neutral-900 group-hover:underline">
              <IconBadge />
              {item.title}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Politics() {
  const articles = articleData[CATEGORY_KEY] || [];

  // Newest first, then take the first 7 — each used exactly once below.
  const sorted = [...articles]
    .sort((a, b) => parseDate(b.date) - parseDate(a.date))
    .slice(0, 7);

  const [leadStory, ...rest] = sorted;

  if (!leadStory) {
    return null; // No politics articles yet — render nothing.
  }

  const midColumn = rest.slice(0, 3);
  const rightColumn = rest.slice(3, 6);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-8 sm:py-10 lg:px-16">
        <div className="border-t-2 border-neutral-900 pt-6">
          <h2 className="mb-6 text-xl font-bold text-neutral-900 sm:mb-8 sm:text-2xl">
            Politics
          </h2>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Lead story */}
            <article>
              <Link href={`/${CATEGORY_KEY}/${leadStory.slug}`} className="group block">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={leadStory.image}
                    alt={leadStory.imageAlt || leadStory.title}
                    fill
                    className="bg-neutral-200 object-cover"
                  />
                </div>
                {leadStory.credit && (
                  <p className="mt-1 text-xs text-neutral-500">{leadStory.credit}</p>
                )}
                <p className="mt-3 text-lg font-bold leading-snug text-neutral-900 group-hover:underline">
                  <IconBadge />
                  {leadStory.title}
                </p>
              </Link>
            </article>

            {/* Middle column */}
            {midColumn.length > 0 && (
              <div className="lg:-mt-1">
                <HeadlineList items={midColumn} />
              </div>
            )}

            {/* Right column */}
            {rightColumn.length > 0 && (
              <div className="lg:-mt-1">
                <HeadlineList items={rightColumn} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}