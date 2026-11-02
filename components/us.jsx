import Image from "next/image";
import Link from "next/link";
import articleData from "../public/data/article.json";

const CATEGORY_KEY = "us";
const ITEM_COUNT = 4;

const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
};

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

function chunkIntoPairs(items) {
  const rows = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }
  return rows;
}

export default function US() {
  const articles = articleData[CATEGORY_KEY] || [];
  const items = [...articles]
    .sort((a, b) => parseDate(b.date) - parseDate(a.date))
    .slice(0, ITEM_COUNT);

  if (items.length === 0) {
    return null; // No U.S. articles yet — render nothing.
  }

  const rows = chunkIntoPairs(items);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-8 sm:py-10 lg:px-16">
        <div className="border-t-2 border-neutral-900 pt-6">
          <h2 className="mb-6 text-xl font-bold text-neutral-900 sm:mb-12 sm:text-3xl">U.S.</h2>

          <div className="flex flex-col">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex}>
                {/* Row: two items, vertical divider only between them, only spans this row's height */}
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-y-0 sm:divide-x sm:divide-neutral-600">
                  {row.map((item, i) => (
                    <Link key={item.slug} href={`/${CATEGORY_KEY}/${item.slug}`}
                      className={`group flex items-start justify-between gap-6 ${
                        i === 0 ? "sm:pr-10" : "sm:pl-10"
                      }`}
                    >
                      <p className="text-lg font-bold leading-snug text-neutral-800 group-hover:underline">
                        {item.kicker === "EXCLUSIVE" && <IconBadge />}
                        {item.title}
                      </p>
                      <div className="relative aspect-[4/3] w-28 shrink-0 sm:w-32">
                        <Image src={item.image} alt={item.imageAlt || item.title} fill className="bg-neutral-200 object-cover"/>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Horizontal divider: separate full-width line between rows, with margin on both sides so it never meets the vertical divider */}
                {rowIndex < rows.length - 1 && (
                  <div className="my-6 border-b border-neutral-600 sm:my-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}