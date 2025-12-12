import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Loader } from "@/components/Loader";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ErgoSummary() {
  const [summary, setSummary] = useState("");
  const [comparisonData, setComparisonData] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://sagarsarang.app.n8n.cloud/webhook/dash-summary");
        const data = await res.json();
        setSummary(data.text || "");

        const compRes = await fetch("https://sagarsarang.app.n8n.cloud/webhook/comparison-summary");
        const compData = await compRes.json();
        setComparisonData(compData.text || "");
      } catch (err) {
        console.error("Failed to load summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  // -----------------------------
  // FORMAT SUMMARY CLEANLY
  // -----------------------------
  const formatText = (text: string) => {
    return text
      .replace(/[#*•]/g, "") // remove markdown/bullets
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")
      .map((line) => {
        // Headings & subheadings — primary gradient
        if (
          /executive summary|risk analysis|strategic recommendations|bottom line|the leaderboard|head-to-head analysis|strategic edge|where ergo is winning|where we lag|recommendation/i.test(line)
        ) {
          return `<h2 class="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mt-8 mb-4">${line}</h2>`;
        }

        // Lines starting with icons — keep icons default color
        if (/^[📋⚠️🚀⚔️💡🏆]/.test(line)) {
          const icon = line[0];
          const content = line.slice(1).trim();
          return `<p class="text-base mb-2"><span class="mr-2">${icon}</span>${content}</p>`;
        }

        // Key-value lines
        if (line.includes(":")) {
          const [key, value] = line.split(":");
          return `<p class="text-base mb-2"><strong>${key.trim()}:</strong> ${value.trim()}</p>`;
        }

        // Regular paragraph
        return `<p class="text-base mb-2">${line}</p>`;
      })
      .join("");
  };

  const formatted = formatText(summary);
  const formattedComparison = formatText(comparisonData);

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <DashboardHeader />

      <main className="container mx-auto px-6 py-12">
        {/* TITLE WITH LEFT ARROW */}
        <div className="flex items-center gap-3 mb-6">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className="w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-300"
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            ERGO Summary & Insights
          </h1>
        </div>

        {/* ERGO SUMMARY CARD */}
        <div
          className="glass p-8 rounded-2xl border border-primary/30 shadow-xl shadow-primary/10 animate-fade-in leading-relaxed text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />

        {/* COMPARISON SUMMARY CARD */}
        <div
          className="glass p-8 mt-10 rounded-2xl border border-primary/30 shadow-xl shadow-primary/10 animate-slide-in leading-relaxed text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: formattedComparison }}
        />
      </main>
    </div>
  );
}
