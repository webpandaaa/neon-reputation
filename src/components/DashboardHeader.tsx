import { User, ChevronDown, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const DashboardHeader = () => {
  const navigate = useNavigate();

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 focus:outline-none group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-2 ring-primary/30 transition-all group-hover:ring-4 group-hover:ring-primary/50 cursor-pointer">
                  <User className="w-5 h-5 text-primary-foreground" />
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform group-hover:text-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-xl border-border/50">
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-accent/50 focus:bg-accent/50"
                onClick={() => navigate("/settings")}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-accent/50 focus:bg-accent/50 text-destructive focus:text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
