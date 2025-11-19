import { useState, useEffect } from "react";
import { Eye, Heart, MessageCircle, ThumbsUp, ThumbsDown, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Review {
  text: string;
  views: number;
  likes: number;
  comments: number;
}

interface ReviewCarouselProps {
  reviews: Review[];
  type: "positive" | "negative";
}

export const ReviewCarousel = ({ reviews, type }: ReviewCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const isPositive = type === "positive";
  const Icon = isPositive ? ThumbsUp : ThumbsDown;
  const colorClass = isPositive ? "green" : "red";

  return (
    <Card className={`glass border-border/50 p-6 transition-all duration-500 hover:shadow-xl relative ${
      isPositive ? 'hover:border-green-500/30' : 'hover:border-red-500/30'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon className={`w-6 h-6 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
          <h2 className="text-xl font-bold text-foreground">
            Top 5 {isPositive ? "Positive" : "Negative"} Reviews
          </h2>
        </div>
        <Link 
          to="/posts" 
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
        >
          <span>Show More</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="relative h-40 overflow-hidden">
        {reviews.map((review, index) => {
          const isActive = index === currentIndex;
          const isPrevious = index === (currentIndex - 1 + reviews.length) % reviews.length;
          
          return (
            <div
              key={index}
              className={`
                absolute inset-0 transition-all duration-500
                ${isActive ? 'translate-y-0 opacity-100 z-10' : ''}
                ${isPrevious ? '-translate-y-full opacity-0 z-0' : ''}
                ${!isActive && !isPrevious ? 'translate-y-full opacity-0 z-0' : ''}
              `}
            >
              <div 
                className={`h-full p-4 rounded-lg border transition-all duration-300 ${
                  isPositive 
                    ? 'bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border-green-500/20 hover:from-green-500/20 hover:via-green-500/10' 
                    : 'bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent border-red-500/20 hover:from-red-500/20 hover:via-red-500/10'
                }`}
              >
                <p className="text-sm text-foreground mb-4 line-clamp-3">
                  {review.text}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-primary" />
                    <span>{review.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-secondary" />
                    <span>{review.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-accent" />
                    <span>{review.comments.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              h-1.5 rounded-full transition-all duration-300
              ${index === currentIndex 
                ? `w-8 ${isPositive ? 'bg-green-500' : 'bg-red-500'}` 
                : 'w-1.5 bg-muted hover:bg-muted-foreground/50'
              }
            `}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </Card>
  );
};
