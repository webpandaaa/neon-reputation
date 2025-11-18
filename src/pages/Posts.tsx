import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PostCard } from "@/components/PostCard";
import { PostFilters } from "@/components/PostFilters";
import { DashboardHeader } from "@/components/DashboardHeader";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { allPosts } from "@/data/mockPosts";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, Heart, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Posts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState("all");

  const filteredPosts = useMemo(() => {
    let filtered = [...allPosts];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query)
      );
    }

    // Filter by time range
    if (timeRange !== "all") {
      const now = new Date();
      const postDate = (post: typeof allPosts[0]) => new Date(post.timestamp);

      switch (timeRange) {
        case "today":
          filtered = filtered.filter((post) => {
            const diff = now.getTime() - postDate(post).getTime();
            return diff < 24 * 60 * 60 * 1000; // 24 hours
          });
          break;
        case "week":
          filtered = filtered.filter((post) => {
            const diff = now.getTime() - postDate(post).getTime();
            return diff < 7 * 24 * 60 * 60 * 1000; // 7 days
          });
          break;
        case "month":
          filtered = filtered.filter((post) => {
            const diff = now.getTime() - postDate(post).getTime();
            return diff < 30 * 24 * 60 * 60 * 1000; // 30 days
          });
          break;
        case "year":
          filtered = filtered.filter((post) => {
            const diff = now.getTime() - postDate(post).getTime();
            return diff < 365 * 24 * 60 * 60 * 1000; // 365 days
          });
          break;
      }
    }

    return filtered;
  }, [searchQuery, timeRange]);

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <DashboardHeader />

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 flex items-center gap-4">
            <Link to="/">
            <Button variant="ghost" className=" group">
              <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
            </Button>
          </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">All Posts</h1>
              <p className="text-muted-foreground">Browse and search through all posts</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="glass border-border/50 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search posts by title, author, or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card border-border"
                />
              </div>

              {/* Filters */}
              <PostFilters timeRange={timeRange} onTimeRangeChange={setTimeRange} />
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
            </p>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <div className="glass border-border/50 rounded-lg p-12 text-center">
                <p className="text-muted-foreground">No posts found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
