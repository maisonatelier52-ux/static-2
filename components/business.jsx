import Image from "next/image";
import Link from "next/link";
import articleData from "../public/data/article.json";

const CATEGORY_KEY = "business";

const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
};

export default function Business() {
  const articles = articleData[CATEGORY_KEY] || [];
  const sorted = [...articles].sort((a, b) => parseDate(b.date) - parseDate(a.date));
  const [leadStory, midStory1, midStory2, featureStory] = sorted;

  if (!leadStory) {
    return null; // No business articles yet — render nothing.
  }

  const midStories = [midStory1, midStory2].filter(Boolean);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-8 sm:py-8 lg:px-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-10">
          {/* Lead story */}
          <article>
            <Link href={`/${CATEGORY_KEY}/${leadStory.slug}`} className="group block">
              {leadStory.kicker && (
                <span className="mb-2 inline-block bg-amber-400 px-1.5 py-0.5 text-xs font-bold text-neutral-900">
                  {leadStory.kicker}
                </span>
              )}
              <h2 className="text-xl font-bold leading-tight text-neutral-900 group-hover:underline sm:text-2xl lg:text-3xl">
                {leadStory.title}
              </h2>
            </Link>
            <div className="mt-4">
              <div className="relative aspect-[4/3] w-full">
                <Image src={leadStory.image} alt={leadStory.imageAlt || leadStory.title} fill className="bg-neutral-200 object-cover"/>
              </div>
              {leadStory.credit && (
                <p className="mt-1 text-xs text-neutral-500">{leadStory.credit}</p>
              )}
            </div>
            {leadStory.dek && (
              <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
                {leadStory.dek}
              </p>
            )}
          </article>

          {/* Middle column */}
          {midStories.length > 0 && (
            <div className="flex flex-col gap-6">
              {midStories.map((story) => (
                <article key={story.slug} className="border-b border-neutral-400 pb-6 last:border-0 last:pb-0">
                  <Link href={`/${CATEGORY_KEY}/${story.slug}`} className="group block">
                    <div className="relative aspect-[16/9] w-full max-w-full sm:max-w-[280px]">
                      <Image src={story.image} alt={story.imageAlt || story.title} fill className="bg-neutral-200 object-cover"/>
                    </div>
                    {story.credit && (
                      <p className="mt-1 text-xs text-neutral-500">{story.credit}</p>
                    )}
                    {story.kicker && (
                      <span className="mt-3 mb-1 inline-block bg-amber-400 px-1.5 py-0.5 text-xs font-bold text-neutral-900">
                        {story.kicker}
                      </span>
                    )}
                    <h3 className="mt-2 text-base font-bold leading-snug text-neutral-900 group-hover:underline sm:text-lg">
                      {story.title}
                    </h3>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* Feature card */}
          {featureStory && (
            <article className="border border-neutral-600">
              <div className="relative aspect-[3/2] w-full">
                <Image src={featureStory.image} alt={featureStory.imageAlt || featureStory.title} fill className="bg-neutral-200 object-cover"/>
              </div>
              <div className="px-4 py-5 sm:px-5">
                <p className="text-center text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  FEATURE
                </p>
                <p className="mb-3 text-center text-sm font-semibold text-neutral-800">
                  {featureStory.author}
                </p>
                <Link href={`/${CATEGORY_KEY}/${featureStory.slug}`} className="group block text-center">
                  {featureStory.kicker && (
                    <span className="mr-1 inline-block bg-amber-400 px-1.5 py-0.5 text-xs font-bold text-neutral-900">
                      {featureStory.kicker}
                    </span>
                  )}
                  <h3 className="mt-2 text-base font-bold leading-snug text-blue-800 underline decoration-1 underline-offset-2 group-hover:text-blue-900 sm:text-lg">
                    {featureStory.title}
                  </h3>
                </Link>
                {featureStory.dek && (
                  <p className="mt-3 text-center text-sm leading-relaxed text-neutral-700">
                    {featureStory.dek}
                  </p>
                )}
                {featureStory.readTime && (
                  <p className="mt-4 text-center text-xs text-neutral-500">
                    {featureStory.readTime}
                  </p>
                )}
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}