import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ChevronRight, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts, categories } from "@/data/blogPosts";
import { useSeo, breadcrumbSchema } from "@/lib/seo";

const POSTS_PER_PAGE = 9;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });

const BlogPage = () => {
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
        name: "Men's Hair To Stay — Hair Restoration Blog",
        blogPost: blogPosts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          datePublished: p.date,
          author: { "@type": "Organization", name: p.author },
          url: `https://menshairtostay.co.uk/blog/${p.slug}`,
        })),
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
    ],
  });

  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];

  const filtered = useMemo(() => {
    return blogPosts
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
  }, [search, category, featured.slug]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const visiblePosts = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const popularPosts = blogPosts.slice(0, 4);
  const recentPosts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-mhts-navy to-mhts-charcoal text-mhts-white py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Hair Restoration Blog
          </motion.h1>
          <p className="text-lg md:text-xl text-mhts-white/80 max-w-2xl mx-auto mb-8">
            Expert insights on hair systems, scalp micropigmentation and modern hair loss solutions.
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search articles..."
              className="pl-10 bg-background text-foreground h-12"
            />
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="inline w-3 h-3 mx-1" />
        <span className="text-foreground">Blog</span>
      </div>

      {/* Category filters */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                category === cat
                  ? "bg-mhts-charcoal text-mhts-white border-mhts-charcoal"
                  : "bg-background text-foreground border-border hover:border-mhts-charcoal"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      {category === "All Posts" && search === "" && (
        <section className="container mx-auto px-4 mb-12">
          <Link to={`/blog/${featured.slug}`}>
            <motion.div
              whileHover={{ y: -4 }}
              className="grid md:grid-cols-2 gap-8 bg-card rounded-2xl overflow-hidden border border-border shadow-sm"
            >
              {featured.image ? (
                <img
                  src={featured.image}
                  alt={featured.featuredImageAlt}
                  className="aspect-[16/10] md:aspect-auto w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="aspect-[16/10] md:aspect-auto bg-gradient-to-br from-mhts-navy to-mhts-charcoal flex items-center justify-center">
                  <span className="text-mhts-white/30 text-6xl font-bold">MHTS</span>
                </div>
              )}
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-mhts-charcoal text-mhts-white text-xs rounded-full w-fit mb-3">
                  Featured · {featured.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-mhts-charcoal mb-3">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground mb-4">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(featured.date)}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime}</span>
                </div>
              </div>
            </motion.div>
          </Link>
        </section>
      )}

      {/* Grid + Sidebar */}
      <section className="container mx-auto px-4 pb-20 grid lg:grid-cols-[1fr_320px] gap-10">
        {/* Posts */}
        <div>
          {visiblePosts.length === 0 ? (
            <p className="text-muted-foreground py-12 text-center">No articles found.</p>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {visiblePosts.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.featuredImageAlt}
                          className="aspect-[16/10] w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="aspect-[16/10] bg-gradient-to-br from-mhts-navy to-mhts-charcoal flex items-center justify-center">
                          <span className="text-mhts-white/20 text-3xl font-bold">MHTS</span>
                        </div>
                      )}
                      <CardContent className="p-5">
                        <span className="inline-block px-2 py-0.5 bg-mhts-light text-mhts-charcoal text-xs rounded-full mb-3">
                          {post.category}
                        </span>
                        <h3 className="font-bold text-lg leading-tight mb-2 text-mhts-charcoal line-clamp-2">
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
                  className={`w-10 h-10 rounded-md border text-sm transition-colors ${
                    p === page
                      ? "bg-mhts-charcoal text-mhts-white border-mhts-charcoal"
                      : "border-border hover:border-mhts-charcoal"
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
            <h4 className="font-bold mb-3 text-mhts-charcoal">Categories</h4>
            <ul className="space-y-1.5 text-sm">
              {categories.map((c) => (
                <li key={c}>
                  <button
                    onClick={() => {
                      setCategory(c);
                      setPage(1);
                    }}
                    className={`hover:text-mhts-charcoal transition-colors ${
                      category === c ? "text-mhts-charcoal font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-mhts-charcoal">Popular Posts</h4>
            <ul className="space-y-3">
              {popularPosts.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="text-sm text-muted-foreground hover:text-mhts-charcoal transition-colors line-clamp-2 block">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-mhts-charcoal">Recent Posts</h4>
            <ul className="space-y-3">
              {recentPosts.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="text-sm text-muted-foreground hover:text-mhts-charcoal transition-colors line-clamp-2 block">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-mhts-light p-5 rounded-lg">
            <h4 className="font-bold mb-2 text-mhts-charcoal flex items-center gap-2">
              <Mail className="w-4 h-4" /> Newsletter
            </h4>
            <p className="text-xs text-muted-foreground mb-3">
              Get expert hair restoration tips in your inbox.
            </p>
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
                  window.location.href = `mailto:georgesbarbers1991@gmail.com?subject=Newsletter%20signup&body=Please%20add%20${email}%20to%20the%20newsletter.`;
                }
              }}
            >
              Subscribe
            </Button>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default BlogPage;
