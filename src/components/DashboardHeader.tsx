import { User, LogOut, Settings, Menu, LayoutDashboard, } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const competitors = [
  { name: "Allianz", logo: "https://companieslogo.com/img/orig/ALV.DE.D-ce2f8648.png?t=1720244490" },
  { name: "Generali", logo: "https://companieslogo.com/img/orig/G.MI.D-21c612f2.png?t=1720244491" },
  { name: "Signal Iduna", logo: "../images/logo.png" },
];

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

          <button className="flex items-center gap-2 focus:outline-none group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-2 ring-primary/30 transition-all group-hover:ring-4 group-hover:ring-primary/50 cursor-pointer">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
          </button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(true)}
            className="hover:bg-accent/50"
          >
            <Menu className="w-5 h-5" />
          </Button>

        </div>


      </div>

      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="right" className="w-80 bg-card/95 backdrop-blur-xl border-l border-border/50">
          <SheetHeader>
            <SheetTitle className="text-foreground">Navigation</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-2 mt-6">
            <Button
              variant="ghost"
              className="justify-start hover:bg-accent/50 text-foreground"
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </Button>

            <Separator className="my-2" />

            <div className="px-3 py-2">
              <p className="text-sm font-medium text-muted-foreground mb-3">Competitor Companies</p>
              {competitors.map((competitor) => (
                <Button
                  key={competitor.name}
                  variant="ghost"
                  className="w-full justify-start hover:bg-accent/50 text-foreground mb-2"
                  onClick={() => {
                    navigate(`/competitors/${competitor.name.toLowerCase().replace(' ', '-')}`);
                    setIsMenuOpen(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={competitor.logo}
                      alt={competitor.name}
                      className="w-5 h-5 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/24";
                      }}
                    />
                    <span>{competitor.name}</span>
                  </div>
                </Button>
              ))}
            </div>

            <Separator className="my-2" />

            <Button
              variant="ghost"
              className="justify-start hover:bg-accent/50 text-foreground"
              onClick={() => {
                navigate("/settings");
                setIsMenuOpen(false);
              }}
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Button>

            <Button
              variant="ghost"
              className="justify-start hover:bg-accent/50 text-destructive"
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};
