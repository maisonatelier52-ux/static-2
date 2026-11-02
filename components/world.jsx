import Link from "next/link";
import articleData from "../public/data/article.json";

const CATEGORY_KEY = "world";
const ITEM_COUNT = 9;
const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
};

export default function World() {
  const articles = articleData[CATEGORY_KEY] || [];
  const items = [...articles]
    .sort((a, b) => parseDate(b.date) - parseDate(a.date))
    .slice(0, ITEM_COUNT);

  if (items.length === 0) {
    return null; // No world articles yet — render nothing.
  }

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-8 sm:py-10 lg:px-16">
        <div className="border-t-2 border-neutral-900 pt-6">
          <h2 className="mb-6 text-xl font-bold text-neutral-900 sm:mb-8 sm:text-2xl">World</h2>

          <ol className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-3">
            {items.map((item, index) => (
              <li key={item.slug}>
                <Link href={`/${CATEGORY_KEY}/${item.slug}`} className="group flex items-start gap-4 border-b border-neutral-200 pb-6">
                  <span className="font-serif text-4xl italic leading-none text-neutral-900 sm:text-6xl">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-base leading-snug text-neutral-800 group-hover:underline sm:text-[17px]">
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}