import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, Reveal } from "@/lib/motion";
import { Search, Calendar, Clock, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { blogPosts, categories } from "@/data/blogPosts";
import ResponsiveImage from "@/components/ResponsiveImage";
import blogHero from "@/assets/mhts-svc-hair-systems.jpg";
import { visiblePosts, isPreviewRequest } from "@/lib/publishing";
import { useSeo, breadcrumbSchema } from "@/lib/seo";
import { SNAP_PHONE_CLASS, SNAP_SPLIT_CLASS } from "@/lib/sectionSnap";


const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });

const BlogPage = () => {
  const previewMode = isPreviewRequest();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Posts");

  useSeo({
    title: "Hair Replacement Blog | Expert Tips & Advice",
    description:
      "Expert articles on hair systems, scalp micropigmentation (SMP), maintenance, and transformation stories. Learn about non-surgical hair replacement solutions.",
    canonicalPath: "/blog",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Men's Hair To Stay, Hair Restoration Blog",
        // Live posts only. This listed every post including future ones.
        blogPost: visiblePosts(blogPosts, { preview: previewMode }).map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          datePublished: p.date,
          author: { "@type": "Organization", name: p.author || "Men's Hair To Stay" },
          url: `https://menshairtostay.co.uk/blog/${p.slug}`,
        })),
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
    ],
  });

  const livePosts = useMemo(() => visiblePosts(blogPosts, { preview: previewMode }), [previewMode]);

  const sortedPosts = useMemo(
    () => [...livePosts].sort((a, b) => b.date.localeCompare(a.date)),
    [livePosts]
  );

  const featured = sortedPosts[0];

  const filtered = useMemo(() => {
    return sortedPosts
      .filter((p) => p.slug !== featured.slug || category !== "All Posts" || search.trim() !== "")
      .filter((p) => category === "All Posts" || p.category === category)
      .filter((p) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      });
  }, [search, category, featured.slug, sortedPosts]);


  // Phone list: every post but the latest (it is the card at the top), filtered
  // by the chosen chip. Its own state, so the desktop tabs are unaffected.
  const [phoneCategory, setPhoneCategory] = useState("All Posts");
  const phoneList = useMemo(
    () =>
      sortedPosts
        .filter((p) => p.slug !== featured.slug)
        .filter((p) => phoneCategory === "All Posts" || p.category === phoneCategory),
    [sortedPosts, featured.slug, phoneCategory]
  );

  // The phone list in screens: the chips count as two rows, five or six rows
  // a screen, spread evenly.
  const phoneScreens = useMemo(() => {
    const units = phoneList.length + 2;
    const count = Math.max(1, Math.ceil(units / 6));
    const screens: (typeof phoneList)[] = [];
    let at = 0;
    for (let k = 0; k < count; k++) {
      const size = Math.floor(units / count) + (k < units % count ? 1 : 0) - (k === 0 ? 2 : 0);
      screens.push(phoneList.slice(at, at + size));
      at += size;
    }
    return screens;
  }, [phoneList]);


  return (
    // Batch 4b. The blog is laid out as a magazine, not as another dark hero:
    // a light masthead with the search beside the title, the categories as a
    // row of tabs, the newest post as a cover story with its words over the
    // photograph, then the grid and the sidebar.
    <div className="mhts-theme min-h-screen bg-background">
      {/* Masthead */}
      <section className="border-b border-mhts-stone bg-mhts-sand px-4 pb-5 pt-6 md:pb-10 md:pt-16">
        {/* From md up the words and the search sit beside a photograph from
            the studio (Carlo, Oct 2026: the blog had no hero image). */}
        <div className="container mx-auto grid max-w-6xl items-center gap-8 px-0 md:grid-cols-2 md:gap-12 lg:max-w-7xl">
          <div>
          <div className="mb-3 h-1 w-14 rounded-full bg-mhts-red md:mb-5" />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 text-3xl text-mhts-ink md:mb-4 md:text-6xl"
          >
            Hair Restoration Blog
          </motion.h1>
          <p className="max-w-2xl text-base text-muted-foreground md:text-xl">
            Expert insights on hair systems, scalp micropigmentation and modern hair loss solutions.
          </p>
          <div className="relative mt-8 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search articles..."
              className="h-12 bg-card pl-10 text-foreground"
            />
          </div>
          </div>
          <ResponsiveImage
            src={blogHero}
            alt="A hair system being cut in at the Men's Hair To Stay studio in Amersham"
            className="hidden h-[min(56vh,480px)] w-full rounded-2xl object-cover shadow-xl md:block"
            sizes="(max-width: 768px) 100vw, 640px"
            priority
          />
        </div>

        {/* Phone: the latest post, first, as one large card. */}
        <Link
          to={`/blog/${featured.slug}`}
          className="group mt-5 block overflow-hidden rounded-2xl border border-mhts-stone bg-card md:hidden"
        >
          {featured.image && (
            <ResponsiveImage
              src={featured.image}
              alt={featured.featuredImageAlt}
              className="aspect-[16/10] w-full object-cover"
              sizes="100vw"
            />
          )}
          <div className="p-5">
            <span className="mb-2 inline-block rounded-full bg-mhts-red px-2.5 py-0.5 text-xs font-semibold text-white">
              {featured.category}
            </span>
            <h2 className="mb-2 text-xl leading-snug text-mhts-ink">{featured.title}</h2>
            <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{featured.excerpt}</p>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" aria-hidden="true" /> {formatDate(featured.date)}
            </p>
          </div>
        </Link>
      </section>

      {/* Phone: the categories as chips that wrap, then every other post as a
          compact list, filtered by the chip. "All" is chosen to begin with, so
          the pre-rendered HTML links every post. The latest post is the card
          above and is not repeated here. The desktop layout below is as it
          was, and hidden on a phone. */}
      {/* Phone: the list is split into screens of five or six rows (the chips
          count as two), as evenly as the number of posts allows, so no screen
          is left with one or two. */}
      <section className={`${SNAP_SPLIT_CLASS} bg-background px-4 md:hidden`} aria-label="All articles">
        {phoneScreens.map((rows, k) => (
          <div key={k} className={`${SNAP_PHONE_CLASS} py-6`}>
            {k === 0 && (
              <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setPhoneCategory(cat)}
                    aria-pressed={phoneCategory === cat}
                    className={`min-h-[36px] rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      phoneCategory === cat
                        ? "border-mhts-red bg-mhts-red text-white"
                        : "border-mhts-stone-deep bg-card text-mhts-ink"
                    }`}
                  >
                    {cat === "All Posts" ? "All" : cat}
                  </button>
                ))}
              </div>
            )}
            {rows.length > 0 && (
              <ul className="divide-y divide-mhts-stone">
                {rows.map((post) => (
                  <li key={post.slug}>
                    <Link to={`/blog/${post.slug}`} className="group flex items-center gap-3.5 py-4">
                      {post.image ? (
                        <ResponsiveImage
                          src={post.image}
                          alt=""
                          className="h-20 w-20 shrink-0 rounded-lg object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <span className="h-20 w-20 shrink-0 rounded-lg bg-mhts-sand" aria-hidden="true" />
                      )}
                      <span className="min-w-0">
                        <span className="line-clamp-2 text-[15px] font-semibold leading-snug text-mhts-ink group-hover:text-mhts-red-deep">
                          {post.title}
                        </span>
                        <span className="mt-1 block text-xs text-muted-foreground">{formatDate(post.date)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {k === 0 && phoneList.length === 0 && (
              <p className="py-10 text-center text-sm text-muted-foreground">No other articles in this category yet.</p>
            )}
          </div>
        ))}
      </section>

      {/* Featured */}
      {/* One stop from md up: the trail, the category tabs and the cover story. */}
      <section className="hidden pb-10 md:block">
      {/* Breadcrumbs */}
      <div className="container mx-auto hidden max-w-6xl px-4 py-4 text-sm text-muted-foreground md:block">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="inline w-3 h-3 mx-1" />
        <span className="text-foreground">Blog</span>
      </div>

      {/* Category filters */}
      <div className="container mx-auto mb-8 hidden max-w-6xl px-4 md:block">
        {/* Tabs on one line, desktop only; a phone has the chips above. */}
        <div className="mhts-snap-x -mx-4 flex gap-1 overflow-x-auto border-b border-mhts-stone px-4 md:mx-0 md:flex-wrap md:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
              }}
              aria-pressed={category === cat}
              className={`-mb-px shrink-0 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                category === cat
                  ? "border-mhts-red text-mhts-red-deep"
                  : "border-transparent text-muted-foreground hover:border-mhts-stone-deep hover:text-mhts-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {category === "All Posts" && search === "" && (
        <div className="container mx-auto max-w-6xl px-4">
          <Link to={`/blog/${featured.slug}`} className="group block">
            <motion.div
              whileHover={{ y: -4 }}
              className="relative grid overflow-hidden rounded-2xl bg-mhts-deep shadow-sm md:min-h-[26rem]"
            >
              {featured.image ? (
                <ResponsiveImage
                  src={featured.image}
                  alt={featured.featuredImageAlt}
                  className="aspect-[16/10] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] md:absolute md:inset-0 md:aspect-auto"
                  sizes="(max-width: 768px) 100vw, 1150px"
                />
              ) : (
                <div className="aspect-[16/10] md:aspect-auto bg-gradient-to-br from-mhts-navy to-mhts-charcoal flex items-center justify-center">
                  <span className="text-mhts-white/30 text-6xl font-bold">MHTS</span>
                </div>
              )}
              <div className="relative flex flex-col justify-end p-7 md:max-w-2xl md:self-end md:p-10">
                {/* The scrim sits under the words only, so the photograph stays clear. */}
                <div className="absolute inset-0 hidden bg-gradient-to-t from-mhts-deep via-mhts-deep/80 to-transparent md:block" aria-hidden="true" />
                <span className="relative mb-3 inline-block w-fit rounded-full bg-mhts-red px-3 py-1 text-xs font-semibold text-white">
                  Featured · {featured.category}
                </span>
                <h2 className="relative mb-3 text-2xl text-white md:text-4xl">
                  {featured.title}
                </h2>
                <p className="relative mb-4 text-white/80">{featured.excerpt}</p>
                <div className="relative flex items-center gap-4 text-xs text-white/75">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(featured.date)}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime}</span>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      )}
      </section>

      {/* The posts, three to a stop from md up, each stop exactly one screen:
          the photographs take whatever height the words leave (Carlo, Oct
          2026: three blogs per scroll stop, fitting perfectly). */}
      {filtered.length === 0 ? (
        <section className="container mx-auto hidden max-w-7xl px-4 py-12 md:block">
          <p className="text-center text-muted-foreground">No articles found.</p>
        </section>
      ) : (
        Array.from({ length: Math.ceil(filtered.length / 3) }, (_, k) => filtered.slice(k * 3, k * 3 + 3)).map((row, k) => (
          <section key={k} className="hidden bg-background md:block" aria-label={k === 0 ? "All articles, desktop" : undefined}>
            <div className="container mx-auto grid h-[var(--snap-screen)] max-w-7xl grid-cols-3 gap-8 px-4 py-10">
              {row.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.06} className="h-full min-h-0">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mhts-stone bg-card transition-all hover:-translate-y-1 hover:border-mhts-red hover:shadow-lg"
                  >
                    <div className="min-h-0 flex-1 overflow-hidden bg-mhts-sand">
                      {post.image && (
                        <ResponsiveImage
                          src={post.image}
                          alt={post.featuredImageAlt}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="420px"
                          stopMedia
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <span className="mb-3 inline-block rounded-full bg-mhts-red-tint px-2.5 py-0.5 text-xs font-semibold text-mhts-red-deep">
                        {post.category}
                      </span>
                      <h3 className="mb-2 line-clamp-2 text-xl leading-snug text-mhts-ink transition-colors group-hover:text-mhts-red-deep">
                        {post.title}
                      </h3>
                      <p className="mb-4 line-clamp-2 text-base text-muted-foreground">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default BlogPage;
