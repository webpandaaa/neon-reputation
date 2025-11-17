import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, Heart, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DashboardHeader } from "@/components/DashboardHeader";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { allPosts } from "@/data/mockPosts";
import { Separator } from "@/components/ui/separator";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = allPosts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-background relative">
        <AnimatedBackground />
        <div className="relative z-10">
          <DashboardHeader />
          <div className="container mx-auto px-4 py-8">
            <Card className="glass border-border/50 p-12 text-center">
              <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
              <p className="text-muted-foreground mb-6">The post you're looking for doesn't exist.</p>
              <Button onClick={() => navigate("/posts")}>Back to Posts</Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <DashboardHeader />

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Back Button */}
          <Link to="/posts">
            <Button variant="ghost" className="mb-6 group">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Posts
            </Button>
          </Link>

          {/* Post Card */}
          <Card className="glass border-border/50 p-8">
            {/* Author Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{post.author}</p>
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-foreground mb-6">{post.title}</h1>

            {/* Stats */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-secondary" />
                <span className="text-foreground font-medium">{post.likes.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">likes</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-accent" />
                <span className="text-foreground font-medium">{post.comments}</span>
                <span className="text-sm text-muted-foreground">comments</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">{post.views.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">views</span>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">{post.content}</p>
            </div>

            <Separator className="my-8" />

            {/* Comments Section */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Comments ({post.comments})
              </h2>
              <div className="space-y-4">
                {/* Mock comments */}
                {[...Array(Math.min(3, post.comments))].map((_, idx) => (
                  <Card key={idx} className="bg-card/50 border-border/30 p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground mb-1">User {idx + 1}</p>
                        <p className="text-sm text-muted-foreground">
                          This is a sample comment. In a real application, these would be actual user comments.
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
                {post.comments > 3 && (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    + {post.comments - 3} more comments
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
