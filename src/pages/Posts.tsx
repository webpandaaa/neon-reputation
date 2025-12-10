import { useState, useMemo, useEffect } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PostCard } from "@/components/PostCard";
import { DashboardHeader } from "@/components/DashboardHeader";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TimeFilter } from "@/components/TimeFilter";
import { SentimentFilter } from "@/components/SentimentFilter";
import { Loader } from "@/components/Loader";

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  likes: number;
  views: number;
  comments: number;
  content: string;
  subreddit?: string;
  timestamp: string;
  url: string;
  sentiment?: "Positive" | "Negative" | "Neutral";
  llm_summary?: string;
}

const Posts = () => {
  const [searchParams] = useSearchParams();
  const initialSentiment = searchParams.get("sentiment") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState("all");
  const [sentiment, setSentiment] = useState(initialSentiment);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const paramSentiment = searchParams.get("sentiment") || "all";
    setSentiment(paramSentiment);
  }, [searchParams]);

  // FETCH POSTS
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          "https://sagarsarang.app.n8n.cloud/webhook/ergo-allposts"
        );
        const data = await res.json();

        const mapped = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          excerpt: p.content?.slice(0, 120) + "...",
          author: p.author || "Unknown",
          date: p.date,
          likes: p.total_likes,
          views: p.view_count,
          comments: p.total_comments,
          content: p.content,
          subreddit: p.source,
          timestamp: p.published_at,
          url: p.url,
          sentiment: p.sentiment || "Neutral",
          llm_summary:p.llm_summary
        }));

        setPosts(mapped);
        setLoading(false);
      } catch (err) {
        console.error("Error loading posts:", err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const parseRelativeDate = (str: string): number => {
    if (!str) return Date.now();
    const now = Date.now();

    if (str.includes("d")) return now - parseInt(str) * 86400000;
    if (str.includes("w")) return now - parseInt(str) * 7 * 86400000;
    if (str.includes("mo")) return now - parseInt(str) * 30 * 86400000;

    return now;
  };

  const filteredPosts = useMemo(() => {
    if (loading) return [];

    let filtered = [...posts];

    // SEARCH
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.author.toLowerCase().includes(q)
      );
    }

    // SENTIMENT FILTER
    if (sentiment !== "all") {
      filtered = filtered.filter(
        (post) =>
          post.sentiment?.toLowerCase() === sentiment.toLowerCase()
      );
    }

    // TIME RANGE
    if (timeRange !== "all") {
      const now = Date.now();

      filtered = filtered.filter((post) => {
        const postTime = parseRelativeDate(post.date);
        const diff = now - postTime;

        switch (timeRange) {
          case "today":
            return diff <= 86400000;
          case "week":
            return diff <= 604800000;
          case "month":
            return diff <= 2592000000;
          case "last3months":
            return diff <= 7776000000;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [searchQuery, timeRange, sentiment, posts, loading]);

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />

      <div className="relative z-10">
        <DashboardHeader />

        <div className="container mx-auto px-4 py-8">
          {/* HEADER */}
          <div className="mb-8 flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" className="group">
                <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
              </Button>
            </Link>

            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Ergo Posts
              </h1>
              <p className="text-muted-foreground">
                Browse and search through all posts
              </p>
            </div>
          </div>

          {/* search + filters */}
          <div className="glass border-border/50 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between">

              {/* Search */}
              <div className="relative flex-1 w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card border-border"
                />
              </div>

              <SentimentFilter value={sentiment} onChange={setSentiment} />

              <TimeFilter value={timeRange} onChange={setTimeRange} />
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <>
              <div className="min-h-screen flex justify-center items-center">
                <Loader />
              </div>
            </>
          )}

          {/* No Results */}
          {!loading && filteredPosts.length === 0 && (
            <div className="glass border-border/50 rounded-lg p-12 text-center">
              <p className="text-muted-foreground">
                No posts found matching your criteria.
              </p>
            </div>
          )}

          {/* Posts */}
          {!loading && (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
