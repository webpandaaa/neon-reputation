import { User } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <header className="glass border-b border-border/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
            <span className="text-xl font-bold text-primary-foreground">R</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Online Reputation Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">Analytics & Insights</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium text-foreground">Admin User</span>
            <span className="text-xs text-muted-foreground">admin@reputation.io</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-2 ring-primary/30 transition-all hover:ring-4 hover:ring-primary/50 cursor-pointer">
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
};
