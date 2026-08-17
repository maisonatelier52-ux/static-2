// app/[category]/[slug]/page.jsx
import Image from "next/image";
import Link from "next/link";

// ⚠️ Adjust these paths to match where this page.jsx actually lives relative to /public/data
import articleData from "../../../public/data/article.json";
import authorData from "../../../public/data/author.json";

/**
 * app/[category]/[slug]/page.jsx — article detail page.
 *
 * Same visual design as before (amber kicker badge, IconBadge before related
 * headlines, breadcrumb, byline row, hero image, tags, author bio card) —
 * see prior version for full data-format notes.
 *
 * Fix: the author bio's name now links to /authors/[authorInfo.slug],
 * matching the actual field name used in author.json (previously this
 * checked for `authorInfo.profileSlug`, which doesn't exist in the data,
 * so the link silently fell back to plain, unclickable text).
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

function ArticleBody({ body }) {
  return (
    <div className="mt-8 flex flex-col gap-5">
      {body.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2 key={i} className="mt-2 text-2xl font-bold leading-snug text-neutral-900">
              {block.text}
            </h2>
          );
        }
        if (block.type === "image") {
          return (
            <div key={i} className="relative my-2 aspect-[3/2] w-full">
              <Image
                src={block.src}
                alt={block.alt || ""}
                fill
                className="bg-neutral-200 object-cover"
              />
            </div>
          );
        }
        return (
          <p key={i} className="text-[17px] leading-relaxed text-neutral-800">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export default async function ArticlePage({ params }) {
  const { category, slug } = await params;

  const categoryPosts = articleData[category] || [];
  const article = categoryPosts.find((post) => post.slug === slug);

  if (!article) {
    return (
      <main className="mx-auto max-w-[800px] px-4 py-20 text-center sm:px-8">
        <p className="text-neutral-600">Article not found.</p>
        <Link href="/" className="mt-4 inline-block text-sm font-semibold text-amber-600 hover:underline">
          Back to homepage
        </Link>
      </main>
    );
  }

  const authorInfo = authorData[article.author] || {};

  // Related: other articles in the same category, newest first
  const related = categoryPosts
    .filter((post) => post.slug !== slug)
    .sort((a, b) => parseDate(b.date) - parseDate(a.date))
    .slice(0, 3);

  return (
    <main className="w-full bg-white">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[800px] px-4 pt-8 sm:px-8 sm:pt-10">
        <nav className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          <Link href="/" className="hover:text-neutral-800">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="capitalize text-neutral-800">{article.category}</span>
        </nav>
      </div>

      {/* Headline block */}
      <article className="mx-auto max-w-[800px] px-4 pb-10 pt-4 sm:px-8">
        {article.kicker && (
          <span className="mb-3 inline-block bg-amber-400 px-1.5 py-0.5 text-xs font-bold text-neutral-900">
            {article.kicker}
          </span>
        )}
        <h1 className="text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
          {article.title}
        </h1>
        {article.dek && (
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">{article.dek}</p>
        )}

        {/* Byline */}
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-neutral-200 py-4 text-sm text-neutral-600">
          {authorInfo.slug ? (
            <Link
              href={`/authors/${authorInfo.slug}`}
              className="font-semibold text-neutral-900 hover:underline"
            >
              {article.author}
            </Link>
          ) : (
            <span className="font-semibold text-neutral-900">{article.author}</span>
          )}
          <span className="text-neutral-300">•</span>
          <span>{formatDate(article.date)}</span>
          <span className="text-neutral-300">•</span>
          <span>{article.readTime}</span>
        </div>

        {/* Hero image */}
        <div className="relative mt-6 aspect-[3/2] w-full">
          <Image
            src={article.image}
            alt={article.imageAlt || article.title}
            fill
            className="bg-neutral-200 object-cover"
            priority
          />
        </div>
        {article.credit && (
          <p className="mt-2 text-xs text-neutral-500">{article.credit}</p>
        )}

        {/* Body — ordered blocks (heading / paragraph / image) */}
        <ArticleBody body={article.body} />

        {/* Tags */}
        {article.tags?.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-neutral-200 pt-6">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${tag.toLowerCase()}`}
                className="border border-neutral-300 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-600 hover:border-neutral-900 hover:text-neutral-900"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Author bio */}
        <div className="mt-10 flex flex-col items-start gap-4 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center">
          {authorInfo.avatar && (
            <Image
              src={authorInfo.avatar}
              alt={article.author}
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-full bg-neutral-200 object-cover"
            />
          )}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Written by
            </p>
            {authorInfo.slug ? (
              <Link
                href={`/authors/${authorInfo.slug}`}
                className="text-lg font-bold text-neutral-900 hover:underline"
              >
                {article.author}
              </Link>
            ) : (
              <p className="text-lg font-bold text-neutral-900">{article.author}</p>
            )}
            {authorInfo.bio && (
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">{authorInfo.bio}</p>
            )}
          </div>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="w-full bg-white">
          <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-8 sm:py-14 lg:px-16">
            <div className="border-t-2 border-neutral-900 pt-6">
              <h2 className="mb-6 text-xl font-bold text-neutral-900 sm:mb-8 sm:text-2xl">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${category}/${item.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={item.image}
                        alt={item.imageAlt || item.title}
                        fill
                        className="bg-neutral-200 object-cover"
                      />
                    </div>
                    <p className="mt-3 text-base font-bold leading-snug text-neutral-900 group-hover:underline">
                      <IconBadge />
                      {item.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}