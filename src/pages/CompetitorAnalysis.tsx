import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card } from "@/components/ui/card";
import { TrendChart } from "@/components/TrendChart";
import { SentimentPieChart } from "@/components/SentimentPieChart";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { AlertTriangle, Lightbulb } from "lucide-react";
import { Loader } from "@/components/Loader";

const apiMap: Record<string, string> = {
  "allianz": "https://sagarsarang.app.n8n.cloud/webhook/alllianz-data",
  "generali": "https://sagarsarang.app.n8n.cloud/webhook/generali-data",
  "signal-iduna": "https://sagarsarang.app.n8n.cloud/webhook/signaliduna-data",
};

// Competitor Name and Logo mapping
const competitorInfo: Record<string, { name: string; logo: string }> = {
  "allianz": { name: "Allianz", logo: "../images/allianz.png" },
  "generali": { name: "Generali", logo: "../images/generali.png" },
  "signal-iduna": { name: "Signal Iduna", logo: "../images/signal.png" },
};

export default function CompetitorAnalysis() {
  const { competitor } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load competitor data dynamically
  useEffect(() => {
    if (!competitor) return;

    const fetchData = async () => {
      const apiUrl = apiMap[competitor];

      if (!apiUrl) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(apiUrl);
        const json = await res.json();

        // ✅ FIX : API returns array → extract first object
        setData(json[0]);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [competitor]);

  // Loading State
  if (loading) {
    return (
      <>
        <DashboardHeader />
        <div className="min-h-screen flex justify-center items-center">
          <Loader />
        </div>
      </>
    );
  }

  // No Data
  if (!data) {
    return (
      <>
        <DashboardHeader />
        <div className="min-h-screen flex justify-center items-center text-red-500 text-xl">
          No data available for this competitor.
        </div>
      </>
    );
  }

  // Get the competitor's name and logo from the mapping
  const competitorDetails = competitorInfo[competitor];

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-background p-6 relative">
        <AnimatedBackground />

        <div className="container mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <img
              src={competitorDetails.logo}
              alt={competitorDetails.name}
              className="w-12 h-12 object-contain"
              onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/64"; }}
            />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                {competitorDetails.name} Analysis
              </h1>
              <p className="text-muted-foreground">Competitor Intelligence & Insights</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-in">
            <TrendChart
              yearlyData={data.yearlyTrends}
              monthlyData={data.monthlyTrends}
            />
            <SentimentPieChart data={data.sentimentData} />
          </div>

          {/* Top Positive / Negative Reviews */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            <ReviewCarousel reviews={data.topPositive} type="positive" />
            <ReviewCarousel reviews={data.topNegative} type="negative" />
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
                {data.avoidPoints?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Best Practices */}
            <Card className="glass border-border/50 p-6 hover:border-blue-500/30 transition-all duration-500 hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-bold text-foreground">Best Practices to Follow</h2>
              </div>
              <ul className="space-y-2">
                {data.followPoints?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

          </div>
        </div>
      </div>
    </>
  );
}
