import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "@/lib/motion";
import { Search, Calendar, Clock, ChevronRight, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts, categories } from "@/data/blogPosts";
import ResponsiveImage from "@/components/ResponsiveImage";
import { visiblePosts, isPreviewRequest } from "@/lib/publishing";
import { useSeo, breadcrumbSchema } from "@/lib/seo";
import { SNAP_PHONE_CLASS, SNAP_SPLIT_CLASS } from "@/lib/sectionSnap";

const POSTS_PER_PAGE = 9;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });

const BlogPage = () => {
  const previewMode = isPreviewRequest();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Posts");
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");

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

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const pagePosts = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

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

  const popularPosts = livePosts.slice(0, 4);
  const recentPosts = [...livePosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);

  return (
    // Batch 4b. The blog is laid out as a magazine, not as another dark hero:
    // a light masthead with the search beside the title, the categories as a
    // row of tabs, the newest post as a cover story with its words over the
    // photograph, then the grid and the sidebar.
    <div className="mhts-theme min-h-screen bg-background">
      {/* Masthead */}
      <section className="border-b border-mhts-stone bg-mhts-sand px-4 pb-5 pt-6 md:pb-10 md:pt-16">
        <div className="container mx-auto grid max-w-6xl items-end gap-8 px-0 md:grid-cols-[1.3fr_1fr]">
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
          </div>
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search articles..."
              className="h-12 bg-card pl-10 text-foreground"
            />
          </div>
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
                setPage(1);
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

      {/* Featured */}
      {category === "All Posts" && search === "" && (
        <section className="container mx-auto mb-12 hidden max-w-6xl px-4 md:block">
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
        </section>
      )}

      {/* Grid + Sidebar */}
      <section className="container mx-auto hidden max-w-6xl gap-10 px-4 pb-20 md:grid lg:grid-cols-[1fr_300px]">
        {/* Posts */}
        <div>
          {pagePosts.length === 0 ? (
            <p className="text-muted-foreground py-12 text-center">No articles found.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {pagePosts.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <Card className="group h-full overflow-hidden border-mhts-stone transition-all hover:border-mhts-red hover:shadow-lg">
                      {post.image ? (
                        <ResponsiveImage
                          src={post.image}
                          alt={post.featuredImageAlt}
                          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 420px"
                        />
                      ) : (
                        <div className="aspect-[16/10] bg-gradient-to-br from-mhts-navy to-mhts-charcoal flex items-center justify-center">
                          <span className="text-mhts-white/20 text-3xl font-bold">MHTS</span>
                        </div>
                      )}
                      <CardContent className="p-5">
                        <span className="mb-3 inline-block rounded-full bg-mhts-red-tint px-2.5 py-0.5 text-xs font-semibold text-mhts-red-deep">
                          {post.category}
                        </span>
                        <h3 className="mb-2 line-clamp-2 text-lg leading-tight text-mhts-ink transition-colors group-hover:text-mhts-red-deep">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                          <span>{formatDate(post.date)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  aria-current={p === page ? "page" : undefined}
                  className={`h-10 w-10 rounded-md border text-sm transition-colors ${
                    p === page
                      ? "border-mhts-red bg-mhts-red text-white"
                      : "border-mhts-stone-deep hover:border-mhts-red"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          <div>
            <h4 className="mb-3 border-b border-mhts-stone pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-mhts-red-deep">Categories</h4>
            <ul className="space-y-1.5 text-sm">
              {categories.map((c) => (
                <li key={c}>
                  <button
                    onClick={() => {
                      setCategory(c);
                      setPage(1);
                    }}
                    className={`transition-colors hover:text-mhts-red-deep ${
                      category === c ? "font-semibold text-mhts-ink" : "text-muted-foreground"
                    }`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 border-b border-mhts-stone pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-mhts-red-deep">Popular Posts</h4>
            <ul className="space-y-3">
              {popularPosts.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="block line-clamp-2 text-sm text-foreground/80 transition-colors hover:text-mhts-red-deep">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 border-b border-mhts-stone pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-mhts-red-deep">Recent Posts</h4>
            <ul className="space-y-3">
              {recentPosts.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="block line-clamp-2 text-sm text-foreground/80 transition-colors hover:text-mhts-red-deep">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-mhts-deep p-5">
            <h4 className="mb-2 flex items-center gap-2 font-semibold text-white">
              <Mail className="w-4 h-4" /> Get in Touch
            </h4>
            <p className="mb-3 text-sm text-white/75">
              Call or email us and we'll add you to our list for tips, guides and exclusive offers.
            </p>
            {/* FORM TEMPORARILY DISABLED, pending Formspree integration. Restore this block once a Formspree form ID is wired up.
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background mb-2"
            />
            <Button
              className="w-full bg-mhts-charcoal hover:bg-mhts-charcoal/90 text-mhts-white"
              onClick={() => {
                if (email) {
                  window.location.href = `mailto:info@menshairtostay.co.uk?subject=Newsletter%20signup&body=Please%20add%20${encodeURIComponent(email)}%20to%20the%20newsletter.`;
                }
              }}
            >
              Subscribe
            </Button>
            */}
            <div className="flex flex-col gap-2">
              <a
                href="tel:07947878087"
                data-cta="call"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-mhts-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-mhts-red-deep"
              >
                <Phone className="w-4 h-4" /> 07947 878087
              </a>
              <a
                href="mailto:info@menshairtostay.co.uk"
                className="inline-flex w-full items-center justify-center gap-2 break-all rounded-md border border-white/40 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                <Mail className="w-4 h-4" /> Email Us
              </a>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default BlogPage;
