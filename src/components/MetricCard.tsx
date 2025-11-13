import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  color?: "success" | "warning" | "destructive" | "primary";
}

export const MetricCard = ({ title, value, change, icon: Icon, trend, color = "primary" }: MetricCardProps) => {
  const colorClasses = {
    success: "from-green-500/20 to-green-600/10 border-green-500/30",
    warning: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30",
    destructive: "from-red-500/20 to-red-600/10 border-red-500/30",
    primary: "from-primary/20 to-accent/10 border-primary/30",
  };

  const iconColorClasses = {
    success: "text-green-400",
    warning: "text-yellow-400",
    destructive: "text-red-400",
    primary: "text-primary",
  };

  return (
    <div className={`
      glass rounded-2xl p-6 border transition-all duration-500
      hover:scale-[1.02] hover:shadow-2xl cursor-pointer group
      hover:border-primary/50 animate-fade-in
      bg-gradient-to-br ${colorClasses[color]}
    `}>
      <div className="flex items-start justify-between mb-4">
        <div className={`
          w-12 h-12 rounded-xl bg-gradient-to-br from-card to-muted
          flex items-center justify-center group-hover:scale-110 transition-transform
        `}>
          <Icon className={`w-6 h-6 ${iconColorClasses[color]}`} />
        </div>
        {change && (
          <span className={`
            text-xs font-medium px-2 py-1 rounded-full
            ${trend === "up" ? "bg-green-500/20 text-green-400" : ""}
            ${trend === "down" ? "bg-red-500/20 text-red-400" : ""}
            ${trend === "neutral" ? "bg-neutral/20 text-neutral" : ""}
          `}>
            {change}
          </span>
        )}
      </div>
      
      <h3 className="text-3xl font-bold text-foreground mb-1">{value}</h3>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
};
