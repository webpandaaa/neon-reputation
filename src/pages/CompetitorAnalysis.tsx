import { useParams } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card } from "@/components/ui/card";
import { TrendChart } from "@/components/TrendChart";
import { SentimentPieChart } from "@/components/SentimentPieChart";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { AlertTriangle, Lightbulb } from "lucide-react";

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
      { id: 101, text: "Excellent customer service and quick claim processing", views: 12500, likes: 890, comments: 234 },
      { id: 102, text: "Wide range of insurance products with competitive pricing", views: 11200, likes: 756, comments: 189 },
      { id: 103, text: "Strong digital platform with easy-to-use mobile app", views: 10800, likes: 823, comments: 201 },
      { id: 104, text: "Transparent communication and regular policy updates", views: 9500, likes: 612, comments: 156 },
      { id: 105, text: "Reliable 24/7 customer support across multiple channels", views: 8900, likes: 701, comments: 178 },
    ],
    topNegative: [
      { id: 106, text: "Premium increases without clear justification", views: 8200, likes: 423, comments: 312 },
      { id: 107, text: "Complex policy terms difficult to understand", views: 7800, likes: 389, comments: 267 },
      { id: 108, text: "Long waiting times during peak hours", views: 7100, likes: 356, comments: 198 },
      { id: 109, text: "Limited flexibility in policy customization", views: 6500, likes: 298, comments: 145 },
      { id: 110, text: "Occasional delays in claim settlements", views: 6200, likes: 267, comments: 134 },
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
      { id: 201, text: "Comprehensive coverage options for diverse needs", views: 11800, likes: 845, comments: 219 },
      { id: 202, text: "Strong international presence and stability", views: 10900, likes: 723, comments: 187 },
      { id: 203, text: "Innovative wellness programs and health initiatives", views: 10200, likes: 789, comments: 205 },
      { id: 204, text: "Efficient digital claim submission process", views: 9300, likes: 634, comments: 167 },
      { id: 205, text: "Personalized service through dedicated advisors", views: 8700, likes: 678, comments: 172 },
    ],
    topNegative: [
      { id: 206, text: "Higher premium rates compared to competitors", views: 7900, likes: 412, comments: 298 },
      { id: 207, text: "Slower response times for complex inquiries", views: 7400, likes: 378, comments: 256 },
      { id: 208, text: "Limited online resources for policy management", views: 6900, likes: 342, comments: 189 },
      { id: 209, text: "Inconsistent service quality across regions", views: 6300, likes: 289, comments: 156 },
      { id: 210, text: "Rigid policy modification procedures", views: 5900, likes: 256, comments: 128 },
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
      { id: 301, text: "Affordable pricing with flexible payment options", views: 10500, likes: 798, comments: 203 },
      { id: 302, text: "Strong focus on customer education and transparency", views: 9800, likes: 712, comments: 178 },
      { id: 303, text: "Quick and hassle-free claim approval process", views: 9200, likes: 667, comments: 192 },
      { id: 304, text: "Excellent reputation in the local market", views: 8600, likes: 589, comments: 154 },
      { id: 305, text: "Proactive risk management and prevention services", views: 8100, likes: 623, comments: 167 },
    ],
    topNegative: [
      { id: 306, text: "Limited digital features compared to larger competitors", views: 7600, likes: 398, comments: 287 },
      { id: 307, text: "Smaller network of service partners", views: 7100, likes: 365, comments: 245 },
      { id: 308, text: "Outdated website interface and user experience", views: 6700, likes: 334, comments: 198 },
      { id: 309, text: "Less comprehensive coverage for specialized needs", views: 6100, likes: 278, comments: 167 },
      { id: 310, text: "Limited availability of multilingual support", views: 5700, likes: 245, comments: 142 },
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
      <div className="min-h-screen bg-background relative overflow-hidden">
        <AnimatedBackground />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
          {/* Premium Header Section */}
          <div className="glass rounded-3xl p-8 border border-border/50 backdrop-blur-xl animate-fade-in hover:border-primary/30 transition-all duration-500 hover:shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative glass p-4 rounded-2xl border border-border/50">
                  <img
                    src={data.logo} 
                    alt={data.name}
                    className="w-20 h-20 object-contain transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/80";
                    }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  {data.name}
                </h1>
                <p className="text-lg text-muted-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Competitor Intelligence & Insights
                </p>
              </div>
            </div>
          </div>

          {/* Analytics Charts Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 px-2">
              <div className="h-8 w-1 bg-gradient-to-b from-primary to-accent rounded-full" />
              <h2 className="text-2xl font-bold text-foreground">Performance Analytics</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-in">
              <div className="glass rounded-2xl p-6 border border-border/50 backdrop-blur-xl hover:border-primary/30 transition-all duration-500 hover:shadow-2xl group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <TrendChart data={data.trendData} />
                </div>
              </div>
              <div className="glass rounded-2xl p-6 border border-border/50 backdrop-blur-xl hover:border-accent/30 transition-all duration-500 hover:shadow-2xl group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <SentimentPieChart data={data.sentimentData} />
                </div>
              </div>
            </div>
          </div>

          {/* Review Analysis Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 px-2">
              <div className="h-8 w-1 bg-gradient-to-b from-accent to-secondary rounded-full" />
              <h2 className="text-2xl font-bold text-foreground">Review Highlights</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
              <ReviewCarousel reviews={data.topPositive} type="positive" />
              <ReviewCarousel reviews={data.topNegative} type="negative" />
            </div>
          </div>

          {/* Strategic Insights Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 px-2">
              <div className="h-8 w-1 bg-gradient-to-b from-secondary to-primary rounded-full" />
              <h2 className="text-2xl font-bold text-foreground">Strategic Insights</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-scale-in">
              {/* What to Avoid Card */}
              <Card className="group relative overflow-hidden glass border-border/50 backdrop-blur-xl hover:border-yellow-500/40 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 group-hover:scale-110 transition-transform duration-300">
                      <AlertTriangle className="w-7 h-7 text-yellow-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">What to Avoid</h2>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-yellow-500/5 transition-colors duration-300">
                      <span className="text-yellow-500 text-lg font-bold mt-0.5">•</span>
                      <span className="text-sm text-foreground/80 leading-relaxed">Don't increase premiums without transparent communication</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-yellow-500/5 transition-colors duration-300">
                      <span className="text-yellow-500 text-lg font-bold mt-0.5">•</span>
                      <span className="text-sm text-foreground/80 leading-relaxed">Avoid complex policy terms that confuse customers</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-yellow-500/5 transition-colors duration-300">
                      <span className="text-yellow-500 text-lg font-bold mt-0.5">•</span>
                      <span className="text-sm text-foreground/80 leading-relaxed">Don't neglect digital platform modernization</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-yellow-500/5 transition-colors duration-300">
                      <span className="text-yellow-500 text-lg font-bold mt-0.5">•</span>
                      <span className="text-sm text-foreground/80 leading-relaxed">Avoid inconsistent service quality across touchpoints</span>
                    </li>
                  </ul>
                </div>
              </Card>

              {/* Best Practices Card */}
              <Card className="group relative overflow-hidden glass border-border/50 backdrop-blur-xl hover:border-blue-500/40 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                      <Lightbulb className="w-7 h-7 text-blue-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Best Practices</h2>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-500/5 transition-colors duration-300">
                      <span className="text-blue-500 text-lg font-bold mt-0.5">•</span>
                      <span className="text-sm text-foreground/80 leading-relaxed">Provide clear and transparent communication</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-500/5 transition-colors duration-300">
                      <span className="text-blue-500 text-lg font-bold mt-0.5">•</span>
                      <span className="text-sm text-foreground/80 leading-relaxed">Invest in user-friendly digital platforms</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-500/5 transition-colors duration-300">
                      <span className="text-blue-500 text-lg font-bold mt-0.5">•</span>
                      <span className="text-sm text-foreground/80 leading-relaxed">Maintain consistent service excellence</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-500/5 transition-colors duration-300">
                      <span className="text-blue-500 text-lg font-bold mt-0.5">•</span>
                      <span className="text-sm text-foreground/80 leading-relaxed">Offer flexible and customizable policies</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
