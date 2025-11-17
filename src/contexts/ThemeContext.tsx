import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  accentColor: string;
  setMode: (mode: ThemeMode) => void;
  setAccentColor: (color: string) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const DEFAULT_ACCENT = "#00D9FF"; // Default teal accent

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem("theme-mode");
    return (stored as ThemeMode) || "dark";
  });

  const [accentColor, setAccentColorState] = useState<string>(() => {
    return localStorage.getItem("theme-accent") || DEFAULT_ACCENT;
  });

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem("theme-mode", newMode);
  };

  const setAccentColor = (color: string) => {
    setAccentColorState(color);
    localStorage.setItem("theme-accent", color);
  };

  const toggleMode = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  // Convert hex to HSL
  const hexToHSL = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return "186 100% 50%";

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `${h} ${s}% ${l}%`;
  };

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme mode
    if (mode === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }

    // Apply accent color as HSL
    const hslColor = hexToHSL(accentColor);
    root.style.setProperty("--primary", hslColor);
    
    // Calculate lighter version for glow
    const [h, s, l] = hslColor.split(" ");
    const glowL = Math.min(parseInt(l) + 10, 90);
    root.style.setProperty("--primary-glow", `${h} ${s} ${glowL}% / 0.5`);
    
  }, [mode, accentColor]);

  return (
    <ThemeContext.Provider value={{ mode, accentColor, setMode, setAccentColor, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
