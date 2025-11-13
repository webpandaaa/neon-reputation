import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { TabSelector } from "@/components/TabSelector";
import { MetricCard } from "@/components/MetricCard";
import { TrendChart } from "@/components/TrendChart";
import { SentimentPieChart } from "@/components/SentimentPieChart";
import { TopPostsCarousel } from "@/components/TopPostsCarousel";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ThumbsUp, ThumbsDown, Minus, Star } from "lucide-react";

// Mock data for Employer view
const employerData = {
  metrics: {
    positive: "68%",
    negative: "18%",
    neutral: "14%",
    rating: "4.2/5.0",
  },
  trends: [
    { year: "2020", positive: 55, negative: 30, neutral: 15 },
    { year: "2021", positive: 60, negative: 25, neutral: 15 },
    { year: "2022", positive: 65, negative: 22, neutral: 13 },
    { year: "2023", positive: 68, negative: 20, neutral: 12 },
    { year: "2024", positive: 72, negative: 18, neutral: 10 },
    { year: "2025", positive: 75, negative: 15, neutral: 10 },
  ],
  sentiment: [
    { name: "Positive", value: 68 },
    { name: "Negative", value: 18 },
    { name: "Neutral", value: 14 },
  ],
  topPosts: [
    {
      id: 1,
      title: "Great Work Culture and Excellent Management Team - Best Company to Work For",
      views: 45230,
      likes: 3420,
      comments: 567,
      url: "https://www.glassdoor.com/Reviews/Employee-Review.htm",
    },
    {
      id: 2,
      title: "Amazing Benefits Package and Career Growth Opportunities",
      views: 38950,
      likes: 2890,
      comments: 423,
      url: "https://www.glassdoor.com/Reviews/Employee-Review.htm",
    },
    {
      id: 3,
      title: "Work-Life Balance is Outstanding - Highly Recommend",
      views: 35670,
      likes: 2650,
      comments: 389,
      url: "https://www.glassdoor.com/Reviews/Employee-Review.htm",
    },
    {
      id: 4,
      title: "Innovation-Driven Company with Strong Leadership Vision",
      views: 32100,
      likes: 2340,
      comments: 312,
      url: "https://www.glassdoor.com/Reviews/Employee-Review.htm",
    },
    {
      id: 5,
      title: "Supportive Team Environment and Competitive Compensation",
      views: 29800,
      likes: 2120,
      comments: 278,
      url: "https://www.glassdoor.com/Reviews/Employee-Review.htm",
    },
  ],
};

// Mock data for Insurance Company view
const insuranceData = {
  metrics: {
    positive: "72%",
    negative: "15%",
    neutral: "13%",
    rating: "4.4/5.0",
  },
  trends: [
    { year: "2020", positive: 58, negative: 28, neutral: 14 },
    { year: "2021", positive: 62, negative: 24, neutral: 14 },
    { year: "2022", positive: 67, negative: 20, neutral: 13 },
    { year: "2023", positive: 70, negative: 18, neutral: 12 },
    { year: "2024", positive: 74, negative: 16, neutral: 10 },
    { year: "2025", positive: 78, negative: 12, neutral: 10 },
  ],
  sentiment: [
    { name: "Positive", value: 72 },
    { name: "Negative", value: 15 },
    { name: "Neutral", value: 13 },
  ],
  topPosts: [
    {
      id: 1,
      title: "Excellent Customer Service and Fast Claims Processing - Highly Satisfied",
      views: 52340,
      likes: 4120,
      comments: 678,
      url: "https://www.trustpilot.com/review/insurance-company",
    },
    {
      id: 2,
      title: "Transparent Pricing and Comprehensive Coverage Options",
      views: 48760,
      likes: 3890,
      comments: 534,
      url: "https://www.trustpilot.com/review/insurance-company",
    },
    {
      id: 3,
      title: "Digital Platform is User-Friendly and Efficient",
      views: 42890,
      likes: 3320,
      comments: 467,
      url: "https://www.trustpilot.com/review/insurance-company",
    },
    {
      id: 4,
      title: "Great Support Team - Always Available When Needed",
      views: 39500,
      likes: 2980,
      comments: 401,
      url: "https://www.trustpilot.com/review/insurance-company",
    },
    {
      id: 5,
      title: "Best Insurance Provider - Smooth Experience Throughout",
      views: 36200,
      likes: 2750,
      comments: 356,
      url: "https://www.trustpilot.com/review/insurance-company",
    },
  ],
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<"employer" | "insurance">("employer");
  const currentData = activeTab === "employer" ? employerData : insuranceData;

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-8">
        {/* Tab Selector */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Insights Banner */}
        <div className="glass rounded-2xl p-6 mb-8 border border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 animate-slide-in">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-1">Key Insights</h3>
              <p className="text-sm text-muted-foreground">
                {activeTab === "employer" 
                  ? "Reputation improved by 12% YoY. Employee satisfaction shows strong upward trend with work-life balance being the top positive driver."
                  : "Customer trust increased by 15% YoY. Claims processing efficiency and customer service quality are major positive factors."}
              </p>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
          <MetricCard
            title="Positive Sentiment"
            value={currentData.metrics.positive}
            change="+5.2%"
            trend="up"
            icon={ThumbsUp}
            color="success"
          />
          <MetricCard
            title="Negative Sentiment"
            value={currentData.metrics.negative}
            change="-2.8%"
            trend="down"
            icon={ThumbsDown}
            color="destructive"
          />
          <MetricCard
            title="Neutral Sentiment"
            value={currentData.metrics.neutral}
            change="-1.2%"
            trend="neutral"
            icon={Minus}
            color="warning"
          />
          <MetricCard
            title="Average Rating"
            value={currentData.metrics.rating}
            change="+0.3"
            trend="up"
            icon={Star}
            color="primary"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-in">
          <div className="lg:col-span-2">
            <TrendChart data={currentData.trends} />
          </div>
          <div className="lg:col-span-1">
            <SentimentPieChart data={currentData.sentiment} />
          </div>
        </div>

        {/* Top Posts Carousel */}
        <div className="mt-6 animate-fade-in">
          <TopPostsCarousel posts={currentData.topPosts} />
        </div>
      </main>
    </div>
  );
};

export default Index;
