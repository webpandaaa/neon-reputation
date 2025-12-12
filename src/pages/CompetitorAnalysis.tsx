import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card } from "@/components/ui/card";
import { TrendChart } from "@/components/TrendChart";
import { SentimentPieChart } from "@/components/SentimentPieChart";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { Loader } from "@/components/Loader";
import { Lightbulb, AlertTriangle } from "lucide-react";

// API A → Existing sentiment/chart/reviews APIs
const sentimentApiMap: Record<string, string> = {
  "allianz": "https://sagarsarang.app.n8n.cloud/webhook/alllianz-data",
  "generali": "https://sagarsarang.app.n8n.cloud/webhook/generali-data",
  "signal-iduna": "https://sagarsarang.app.n8n.cloud/webhook/signaliduna-data",
};

// API B → New 4-section analysis APIs
const analysisApiMap: Record<string, string> = {
  "allianz": "https://sagarsarang.app.n8n.cloud/webhook/analysis-allianz",
  "generali": "https://sagarsarang.app.n8n.cloud/webhook/analysis-generali",
  "signal-iduna": "https://sagarsarang.app.n8n.cloud/webhook/analysis-signalIduna",
};

// Competitor Info
const competitorInfo: Record<string, { name: string; logo: string }> = {
  allianz: { name: "Allianz", logo: "../images/allianz.png" },
  generali: { name: "Generali", logo: "../images/generali.png" },
  "signal-iduna": { name: "Signal Iduna", logo: "../images/signal.png" },
};

export default function CompetitorAnalysis() {
  const { competitor } = useParams();

  const [data, setData] = useState<any>(null); // sentiment + charts + reviews
  const [analysisData, setAnalysisData] = useState<any>(null); // 4 sections
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!competitor) return;

    const loadData = async () => {
      setLoading(true);

      const sentimentAPI = sentimentApiMap[competitor];
      const analysisAPI = analysisApiMap[competitor];

      try {
        // API A → Sentiment + charts
        const res1 = await fetch(sentimentAPI);
        const json1 = await res1.json();
        setData(json1[0]); // your original API returns array

        // API B → 4 sections
        const res2 = await fetch(analysisAPI);
        const json2 = await res2.json();
        setAnalysisData(json2); // returns object

      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [competitor]);

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

  if (!data || !analysisData) {
    return (
      <>
        <DashboardHeader />
        <div className="min-h-screen flex justify-center items-center text-red-500 text-xl">
          No data available for this competitor.
        </div>
      </>
    );
  }

  const competitorDetails = competitorInfo[competitor];

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-background p-6 relative">
        <AnimatedBackground />

        <div className="container mx-auto space-y-10">

          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <img src={competitorDetails.logo} alt={competitorDetails.name} className="w-12 h-12 object-contain" onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/64"; }} />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"> {competitorDetails.name} Analysis </h1>
              <p className="text-muted-foreground">Competitor Intelligence & Insights</p>
            </div>
          </div>

          {/* --- Sentiment + Charts --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TrendChart
              yearlyData={data.yearlyTrends}
              monthlyData={data.monthlyTrends}
            />
            <SentimentPieChart data={data.sentimentData} />
          </div>

          {/* --- Reviews --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReviewCarousel reviews={data.topPositive} type="positive" />
            <ReviewCarousel reviews={data.topNegative} type="negative" />
          </div>

          {/* --- New 4-Section Analysis (Beautiful Version) --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">

            {/* What They Did Right */}
            <Card className="
                glass border border-green-500/20
                p-6 rounded-xl backdrop-blur-md
                shadow-lg shadow-green-500/10
                transition-all duration-500
                hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-1 
                hover:border-green-400/40
              ">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-green-400" />
                <h2 className="text-lg font-bold text-green-300">What They Did Right</h2>
              </div>
              <ul className="space-y-3">
                {analysisData.what_they_did_right?.map((point: string, i: number) => (
                  <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-green-400 font-bold">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </Card>

            {/* What They Did Wrong */}
            <Card className="
                  glass border border-red-500/20
                  p-6 rounded-xl backdrop-blur-md
                  shadow-lg shadow-red-500/10
                  transition-all duration-500
                  hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-1 
                  hover:border-red-400/40
                ">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h2 className="text-lg font-bold text-red-300">What They Did Wrong</h2>
              </div>
              <ul className="space-y-3">
                {analysisData.what_they_did_wrong?.map((point: string, i: number) => (
                  <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-red-400 font-bold">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </Card>

            {/* What ERGO Can Learn */}
            <Card className="
                glass border border-blue-500/20
                p-6 rounded-xl backdrop-blur-md
                shadow-lg shadow-blue-500/10
                transition-all duration-500
                hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 
                hover:border-blue-400/40
              ">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-blue-400" />
                <h2 className="text-lg font-bold text-blue-300">What ERGO Can Learn</h2>
              </div>
              <ul className="space-y-3">
                {analysisData.what_ergo_can_learn?.map((point: string, i: number) => (
                  <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-blue-400 font-bold">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </Card>

            {/* What ERGO Should Avoid */}            
            <Card className="
                glass border border-yellow-500/20
                p-6 rounded-xl backdrop-blur-md
                shadow-lg shadow-yellow-500/10
                transition-all duration-500
                hover:shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-1 
                hover:border-yellow-400/40
              ">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                <h2 className="text-lg font-bold text-yellow-300">What ERGO Should Avoid</h2>
              </div>
              <ul className="space-y-3">
                {analysisData.what_ergo_should_avoid?.map((point: string, i: number) => (
                  <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-yellow-400 font-bold">•</span>
                    {point}
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
