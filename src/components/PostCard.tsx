import { Eye, Heart, MessageCircle, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Post } from "@/data/mockPosts";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link to={`/posts/${post.id}`}>
      <Card className="glass border-border/50 p-6 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer group mb-3">
        <div className="flex items-start gap-4">
          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-primary" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Author and Time */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-primary">{post.author}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{post.date}</span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {post.excerpt}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-secondary" />
                <span>{post.likes }</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-accent" />
                <span>{post.comments}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-primary" />
                <span>{post.views}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
