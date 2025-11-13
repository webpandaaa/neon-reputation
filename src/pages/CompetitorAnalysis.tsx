import { useParams } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card } from "@/components/ui/card";
import { TrendChart } from "@/components/TrendChart";
import { SentimentPieChart } from "@/components/SentimentPieChart";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ThumbsUp, ThumbsDown, AlertTriangle, Lightbulb } from "lucide-react";

const competitorData: Record<string, any> = {
  "allianz": {
    name: "Allianz",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Allianz_logo.svg/200px-Allianz_logo.svg.png",
    trendData: [
      { year: "2020", positive: 65, negative: 25, neutral: 10 },
      { year: "2021", positive: 70, negative: 20, neutral: 10 },
      { year: "2022", positive: 75, negative: 18, neutral: 7 },
      { year: "2023", positive: 78, negative: 15, neutral: 7 },
      { year: "2024", positive: 82, negative: 12, neutral: 6 },
    ],
    sentimentData: [
      { name: "Positive", value: 82 },
      { name: "Negative", value: 12 },
      { name: "Neutral", value: 6 },
    ],
    topPositive: [
      "Excellent customer service and quick claim processing",
      "Wide range of insurance products with competitive pricing",
      "Strong digital platform with easy-to-use mobile app",
      "Transparent communication and regular policy updates",
      "Reliable 24/7 customer support across multiple channels",
    ],
    topNegative: [
      "Premium increases without clear justification",
      "Complex policy terms difficult to understand",
      "Long waiting times during peak hours",
      "Limited flexibility in policy customization",
      "Occasional delays in claim settlements",
    ],
  },
  "generali": {
    name: "Generali",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Generali_logo.svg/200px-Generali_logo.svg.png",
    trendData: [
      { year: "2020", positive: 68, negative: 22, neutral: 10 },
      { year: "2021", positive: 72, negative: 20, neutral: 8 },
      { year: "2022", positive: 74, negative: 19, neutral: 7 },
      { year: "2023", positive: 77, negative: 17, neutral: 6 },
      { year: "2024", positive: 80, negative: 14, neutral: 6 },
    ],
    sentimentData: [
      { name: "Positive", value: 80 },
      { name: "Negative", value: 14 },
      { name: "Neutral", value: 6 },
    ],
    topPositive: [
      "Comprehensive coverage options for diverse needs",
      "Strong international presence and stability",
      "Innovative wellness programs and health initiatives",
      "Efficient digital claim submission process",
      "Personalized service through dedicated advisors",
    ],
    topNegative: [
      "Higher premium rates compared to competitors",
      "Slower response times for complex inquiries",
      "Limited online resources for policy management",
      "Inconsistent service quality across regions",
      "Rigid policy modification procedures",
    ],
  },
  "signal-iduna": {
    name: "Signal Iduna",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Signal_Iduna_logo.svg/200px-Signal_Iduna_logo.svg.png",
    trendData: [
      { year: "2020", positive: 62, negative: 28, neutral: 10 },
      { year: "2021", positive: 66, negative: 25, neutral: 9 },
      { year: "2022", positive: 70, negative: 22, neutral: 8 },
      { year: "2023", positive: 73, negative: 20, neutral: 7 },
      { year: "2024", positive: 76, negative: 18, neutral: 6 },
    ],
    sentimentData: [
      { name: "Positive", value: 76 },
      { name: "Negative", value: 18 },
      { name: "Neutral", value: 6 },
    ],
    topPositive: [
      "Affordable pricing with flexible payment options",
      "Strong focus on customer education and transparency",
      "Quick and hassle-free claim approval process",
      "Excellent reputation in the local market",
      "Proactive risk management and prevention services",
    ],
    topNegative: [
      "Limited digital features compared to larger competitors",
      "Smaller network of service partners",
      "Outdated website interface and user experience",
      "Less comprehensive coverage for specialized needs",
      "Limited availability of multilingual support",
    ],
  },
};

export default function CompetitorAnalysis() {
  const { competitor } = useParams();
  const data = competitorData[competitor || ""];

  if (!data) {
    return (
      <>
        <DashboardHeader />
        <div className="min-h-screen bg-background p-6 relative">
          <AnimatedBackground />
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-foreground">Competitor not found</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-background p-6 relative">
        <AnimatedBackground />
        <div className="container mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <img
              src={data.logo} 
              alt={data.name}
              className="w-16 h-16 object-contain"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/64";
              }}
            />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                {data.name} Analysis
              </h1>
              <p className="text-muted-foreground">Competitor Intelligence & Insights</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-in">
            <TrendChart data={data.trendData} />
            <SentimentPieChart data={data.sentimentData} />
          </div>

          {/* Top Posts Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            {/* Positive Posts */}
            <Card className="glass border-border/50 p-6 hover:border-green-500/30 transition-all duration-500 hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <ThumbsUp className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-bold text-foreground">Top 5 Positive Reviews</h2>
              </div>
              <div className="space-y-3">
                {data.topPositive.map((post: string, index: number) => (
                  <div 
                    key={index}
                    className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  >
                    <p className="text-sm text-foreground">{post}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Negative Posts */}
            <Card className="glass border-border/50 p-6 hover:border-red-500/30 transition-all duration-500 hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <ThumbsDown className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-bold text-foreground">Top 5 Negative Reviews</h2>
              </div>
              <div className="space-y-3">
                {data.topNegative.map((post: string, index: number) => (
                  <div 
                    key={index}
                    className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  >
                    <p className="text-sm text-foreground">{post}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-scale-in">
            {/* What to Avoid */}
            <Card className="glass border-border/50 p-6 hover:border-yellow-500/30 transition-all duration-500 hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl font-bold text-foreground">What to Avoid</h2>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Don't increase premiums without transparent communication</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Avoid complex policy terms that confuse customers</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Don't neglect digital platform modernization</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Avoid inconsistent service quality across touchpoints</span>
                </li>
              </ul>
            </Card>

            {/* What to Follow */}
            <Card className="glass border-border/50 p-6 hover:border-blue-500/30 transition-all duration-500 hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-bold text-foreground">Best Practices to Follow</h2>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Invest in excellent customer service and quick response times</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Develop user-friendly digital platforms and mobile apps</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Offer transparent communication and regular updates</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Provide 24/7 support across multiple channels</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
