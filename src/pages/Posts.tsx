import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PostCard } from "@/components/PostCard";
import { PostFilters } from "@/components/PostFilters";
import { DashboardHeader } from "@/components/DashboardHeader";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
}

const Posts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState("all");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // -------------------------
  // Fetch posts from API
  // -------------------------
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          "https://sagargo.app.n8n.cloud/webhook/ergo-allposts"
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


  const filteredPosts = useMemo(() => {
    if (loading) return [];

    let filtered = [...posts];

    // Search filtering
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query)
      );
    }

    // Time filtering
    if (timeRange !== "all") {
      const now = new Date();
      const postDate = (post: Post) => new Date(post.timestamp);

      switch (timeRange) {
        case "today":
          filtered = filtered.filter(
            (post) =>
              now.getTime() - postDate(post).getTime() <
              24 * 60 * 60 * 1000
          );
          break;

        case "week":
          filtered = filtered.filter(
            (post) =>
              now.getTime() - postDate(post).getTime() <
              7 * 24 * 60 * 60 * 1000
          );
          break;

        case "month":
          filtered = filtered.filter(
            (post) =>
              now.getTime() - postDate(post).getTime() <
              30 * 24 * 60 * 60 * 1000
          );
          break;

        case "year":
          filtered = filtered.filter(
            (post) =>
              now.getTime() - postDate(post).getTime() <
              365 * 24 * 60 * 60 * 1000
          );
          break;
      }
    }

    return filtered;
  }, [searchQuery, timeRange, posts, loading]);

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />

      <div className="relative z-10">
        <DashboardHeader />

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" className="group">
                <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
              </Button>
            </Link>

            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                All Posts
              </h1>
              <p className="text-muted-foreground">
                Browse and search through all posts
              </p>
            </div>
          </div>

          {/* Search + Filters */}
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

              {/* Time Filters */}
              <PostFilters
                timeRange={timeRange}
                onTimeRangeChange={setTimeRange}
              />
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Loading posts...</p>
            </div>
          )}

          {/* No Results */}
          {!loading && filteredPosts.length === 0 && (
            <div className="glass border-border/50 rounded-lg p-12 text-center">
              <p className="text-muted-foreground">
                No posts found matching your criteria.
              </p>
            </div>
          )}

          {/* Posts List */}
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
