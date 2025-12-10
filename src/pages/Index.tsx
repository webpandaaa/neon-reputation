import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { TabSelector } from "@/components/TabSelector";
import { MetricCard } from "@/components/MetricCard";
import { TrendChart } from "@/components/TrendChart";
import { SentimentPieChart } from "@/components/SentimentPieChart";
import { TopPostsCarousel } from "@/components/TopPostsCarousel";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ThumbsUp, ThumbsDown, Minus, Star } from "lucide-react";
import { Link } from "react-router-dom";

// ----------------------
// EMPLOYER STATIC DATA
// ----------------------
const employerData = {
  metrics: {
    positive: "68%",
    negative: "18%",
    neutral: "14%",
    rating: "4.2/5.0",
  },

  yearlyTrends: [
    { year: "2019", positive: 52, negative: 32, neutral: 16 },
    { year: "2020", positive: 55, negative: 30, neutral: 15 },
    { year: "2021", positive: 60, negative: 25, neutral: 15 },
    { year: "2022", positive: 65, negative: 22, neutral: 13 },
    { year: "2023", positive: 68, negative: 20, neutral: 12 },
    { year: "2024", positive: 72, negative: 18, neutral: 10 },
    { year: "2025", positive: 75, negative: 15, neutral: 10 },
  ],

  monthlyTrends: [
    { month: "Jan", positive: 60, negative: 20, neutral: 20 },
    { month: "Feb", positive: 62, negative: 19, neutral: 19 },
    { month: "Mar", positive: 64, negative: 18, neutral: 18 },
    { month: "Apr", positive: 66, negative: 17, neutral: 17 },
    { month: "May", positive: 67, negative: 17, neutral: 16 },
    { month: "Jun", positive: 68, negative: 16, neutral: 16 },
    { month: "Jul", positive: 70, negative: 14, neutral: 16 },
    { month: "Aug", positive: 72, negative: 13, neutral: 15 },
    { month: "Sep", positive: 73, negative: 12, neutral: 15 },
    { month: "Oct", positive: 74, negative: 12, neutral: 14 },
    { month: "Nov", positive: 75, negative: 11, neutral: 14 },
    { month: "Dec", positive: 78, negative: 10, neutral: 12 },
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
      url: "https://www.trustpilot.com/review/insurance-company",
    },
    {
      id: 2,
      title: "Amazing Benefits Package and Career Growth Opportunities",
      views: 38950,
      likes: 2890,
      comments: 423,
      url: "https://www.trustpilot.com/review/insurance-company",
    },
    {
      id: 3,
      title: "Work-Life Balance is Outstanding - Highly Recommend",
      views: 35670,
      likes: 2650,
      comments: 389,
      url: "https://www.trustpilot.com/review/insurance-company",
    },
    {
      id: 4,
      title: "Innovation-Driven Company with Strong Leadership Vision",
      views: 32100,
      likes: 2340,
      comments: 312,
      url: "https://www.trustpilot.com/review/insurance-company",
    },
    {
      id: 5,
      title: "Supportive Team Environment and Competitive Compensation",
      views: 29800,
      likes: 2120,
      comments: 278,
      url: "https://www.trustpilot.com/review/insurance-company",
    },
  ],
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<"employer" | "insurance">("employer");

  const [insuranceData, setInsuranceData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInsuranceData = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://sagarsarang.app.n8n.cloud/webhook/ergo-insurancedata");
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setInsuranceData(data[0]);
        } else {
          setInsuranceData(null);
        }
      } catch (err) {
        console.error("Error fetching insurance data", err);
        setInsuranceData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInsuranceData();
  }, []);

  const currentData = activeTab === "employer" ? employerData : insuranceData;

  if (activeTab === "insurance" && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading Insurance Insights...
      </div>
    );
  }

  if (activeTab === "insurance" && !insuranceData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 text-xl">
        Failed to load Insurance Data.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-center mb-8 animate-fade-in">
          <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* INSIGHT */}
        <div className="glass rounded-2xl p-6 mb-8 border border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 animate-slide-in">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-1">Key Insights</h3>
              <p className="text-sm text-muted-foreground">
                {activeTab === "employer"
                  ? "Reputation improved by 12% YoY. Employee satisfaction shows strong upward trend."
                  : "Customer trust increased by 15% YoY. Claims processing efficiency is a major positive factor."}
              </p>
            </div>
          </div>
        </div>

        {/* METRIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">

          <Link to="/posts?sentiment=Positive" className="block">
            <MetricCard
              title="Positive Sentiment"
              value={currentData.metrics.positive}
              change="+5.2%"
              trend="up"
              icon={ThumbsUp}
              color="success"
            />
          </Link>

          <Link to="/posts?sentiment=Negative" className="block">
            <MetricCard
              title="Negative Sentiment"
              value={currentData.metrics.negative}
              change="-2.8%"
              trend="down"
              icon={ThumbsDown}
              color="destructive"
            />
          </Link>

          <Link to="/posts?sentiment=Neutral" className="block">
            <MetricCard
              title="Neutral Sentiment"
              value={currentData.metrics.neutral}
              change="-1.2%"
              trend="neutral"
              icon={Minus}
              color="warning"
            />
          </Link>

          <Link to="/posts?sentiment=all" className="block">
            <MetricCard
              title="Average Rating"
              value={currentData.metrics.rating}
              change="+0.3"
              trend="up"
              icon={Star}
              color="primary"
            />
          </Link>

        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-in">
          <div className="lg:col-span-2">
            <TrendChart yearlyData={currentData.yearlyTrends} monthlyData={currentData.monthlyTrends} />
          </div>
          <div className="lg:col-span-1">
            <SentimentPieChart data={currentData.sentiment} />
          </div>
        </div>

        {/* POSTS */}
        <div className="mt-6 animate-fade-in">
          <TopPostsCarousel posts={currentData.topPosts} />
        </div>
      </main>
    </div>
  );
};

export default Index;
