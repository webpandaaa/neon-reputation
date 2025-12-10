import { useState, useMemo, useEffect } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PostCard } from "@/components/PostCard";
import { DashboardHeader } from "@/components/DashboardHeader";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Link } from "react-router-dom";
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

const GeneraliPosts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState("all");
  const [sentiment, setSentiment] = useState("all");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH POSTS
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          "https://sagarsarang.app.n8n.cloud/webhook/generali-allposts"
        );
        const data = await res.json();

        console.log(data);


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

  /** Convert "2d ago", "3w ago", "1mo ago" to a timestamp */
  const parseRelativeDate = (str: string): number => {
    if (!str) return Date.now();
    const now = Date.now();

    if (str.includes("d")) {
      const days = parseInt(str);
      return now - days * 24 * 60 * 60 * 1000;
    }
    if (str.includes("w")) {
      const weeks = parseInt(str);
      return now - weeks * 7 * 24 * 60 * 60 * 1000;
    }
    if (str.includes("mo")) {
      const months = parseInt(str);
      return now - months * 30 * 24 * 60 * 60 * 1000;
    }

    return now;
  };

  // FILTER LOGIC
  const filteredPosts = useMemo(() => {
    if (loading) return [];

    let filtered = [...posts];

    // TEXT SEARCH
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

    // TIME RANGE FILTER
    if (timeRange !== "all") {
      const now = Date.now();

      filtered = filtered.filter((post) => {
        const postTime = parseRelativeDate(post.date);
        const diff = now - postTime;

        switch (timeRange) {
          case "today":
            return diff <= 1 * 24 * 60 * 60 * 1000;
          case "week":
            return diff <= 7 * 24 * 60 * 60 * 1000;
          case "month":
            return diff <= 30 * 24 * 60 * 60 * 1000;
          case "last3months":
            return diff <= 90 * 24 * 60 * 60 * 1000;
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
                Generali Posts
              </h1>
              <p className="text-muted-foreground">
                Browse and search through all posts
              </p>
            </div>
          </div>

          {/* Search + Sentiment + Time Filter */}
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


              {/* Time filter */}
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

          {/* No results */}
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

export default GeneraliPosts;
