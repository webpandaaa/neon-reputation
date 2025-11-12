import { Building2, Shield } from "lucide-react";

interface TabSelectorProps {
  activeTab: "employer" | "insurance";
  onTabChange: (tab: "employer" | "insurance") => void;
}

export const TabSelector = ({ activeTab, onTabChange }: TabSelectorProps) => {
  return (
    <div className="glass rounded-2xl p-2 inline-flex gap-2">
      <button
        onClick={() => onTabChange("employer")}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300
          ${
            activeTab === "employer"
              ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg glow-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }
        `}
      >
        <Building2 className="w-5 h-5" />
        <span>As an Employer</span>
      </button>
      
      <button
        onClick={() => onTabChange("insurance")}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300
          ${
            activeTab === "insurance"
              ? "bg-gradient-to-r from-secondary to-accent text-secondary-foreground shadow-lg glow-secondary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }
        `}
      >
        <Shield className="w-5 h-5" />
        <span>As an Insurance Company</span>
      </button>
    </div>
  );
};
