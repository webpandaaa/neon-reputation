import { useState, useEffect ,  } from "react";
import { Eye, Heart, MessageCircle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  views: number;
  likes: number;
  comments: number;
  url: string;
}

interface TopPostsCarouselProps {
  posts: Post[];
}

export const TopPostsCarousel = ({ posts }: TopPostsCarouselProps) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [posts.length]);

  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <Card className="glass border-border/50 p-6 overflow-hidden">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-2">Top Posts</h2>
        <p className="text-sm text-muted-foreground">Most engaged content</p>
      </div>

      <div className="relative h-32">
        {posts.map((post, index) => {
          const isActive = index === currentIndex;
          const isPrevious = index === (currentIndex - 1 + posts.length) % posts.length;
          
          return (
            <div
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              className={`
                absolute inset-0 transition-all duration-500 cursor-pointer
                ${isActive ? 'translate-y-0 opacity-100 z-10' : ''}
                ${isPrevious ? '-translate-y-full opacity-0 z-0' : ''}
                ${!isActive && !isPrevious ? 'translate-y-full opacity-0 z-0' : ''}
              `}
            >
              <div className="h-full p-4 rounded-lg bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]">
                <h3 className="text-base font-semibold text-foreground mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-primary" />
                    <span>{post.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-secondary" />
                    <span>{post.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-accent" />
                    <span>{post.comments.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              h-1.5 rounded-full transition-all duration-300
              ${index === currentIndex 
                ? 'w-8 bg-primary' 
                : 'w-1.5 bg-muted hover:bg-muted-foreground/50'
              }
            `}
            aria-label={`Go to post ${index + 1}`}
          />
        ))}
      </div>

      {/* Show More Link */}
      <div className="flex justify-end mt-4">
        <Link 
          to="/posts" 
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
        >
          Show More
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Card>
  );
};
