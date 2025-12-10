import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-card/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Company Info */}
          <div className="space-y-3 animate-slide-up">
            <h3 className="text-lg font-semibold gradient-text">Repugo Team</h3>
            <p className="text-sm text-muted-foreground">
              Advanced analytics and insights for your brand reputation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 animate-slide-up stagger-2">
            <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </a>
              <a href="/settings" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Settings
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-3 animate-slide-up stagger-3">
            <h4 className="text-sm font-semibold text-foreground">Contact</h4>
            <p className="text-sm text-muted-foreground">
              support@repugo.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in animation-delay-1000">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Repugo Team. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-destructive fill-destructive animate-pulse" />
            <span>by Repugo Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
