// components/sports.jsx
import Image from "next/image";
import Link from "next/link";

// ⚠️ Adjust this path to match where this component actually lives relative to /public/data
import articleData from "../public/data/article.json";

/**
 * components/sports.jsx — homepage "Sports" section.
 *
 * Same visual design as the Podcasts component (rounded bordered cards,
 * flex-wrap + justify-center so an incomplete last row stays centered) —
 * only the data source changed:
 *  - Pulls only from articleData["sports"].
 *  - Sorted newest-first by date ("DD/MM/YYYY").
 *  - Takes the first 5 distinct articles via slice(0, 5) from a single
 *    sorted array, so no article can ever appear twice in this section.
 *
 * Field mapping from the original Podcasts shape:
 *   ep.show     -> item.kicker   (small label above the headline)
 *   ep.cover    -> item.image
 *   ep.title    -> item.title
 *   ep.duration -> item.readTime
 */

const CATEGORY_KEY = "sports";
const ITEM_COUNT = 5;

// Dates in article.json are stored as "DD/MM/YYYY"
const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
};

export default function Sports() {
  const articles = articleData[CATEGORY_KEY] || [];

  // Newest first, then take the first N — each used exactly once.
  const items = [...articles]
    .sort((a, b) => parseDate(b.date) - parseDate(a.date))
    .slice(0, ITEM_COUNT);

  if (items.length === 0) {
    return null; // No sports articles yet — render nothing.
  }

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-8 sm:py-10 lg:px-16">
        <div className="border-t-2 border-neutral-900 pt-6">
          <div className="mb-6 flex items-center justify-between sm:mb-8">
            <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">Sports</h2>
            <Link
              href={`/${CATEGORY_KEY}`}
              className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 hover:underline"
            >
              See all
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={`/${CATEGORY_KEY}/${item.slug}`}
                className="group flex w-full items-center gap-4 rounded-4xl border border-neutral-600 p-4 shadow-lg transition-shadow hover:shadow-md sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
              >
                <div className="relative shrink-0">
                  <Image
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-lg bg-neutral-200 object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  {item.kicker && (
                    <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                      {item.kicker}
                    </p>
                  )}
                  <p className="mt-1 text-sm font-bold leading-snug text-neutral-900 group-hover:underline">
                    {item.title}
                  </p>
                  {item.readTime && (
                    <p className="mt-1 text-xs text-neutral-500">{item.readTime}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}