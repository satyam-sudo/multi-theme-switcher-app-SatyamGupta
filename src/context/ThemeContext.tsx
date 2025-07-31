// src/context/ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Theme } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const themes: Theme[] = [
  {
    id: "theme1",
    name: "Minimalist",
    className: "theme-minimalist",
  },
  {
    id: "theme2",
    name: "Dark Professional",
    className: "theme-dark",
  },
  {
    id: "theme3",
    name: "Colorful Playful",
    className: "theme-colorful",
  },
];

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [storedTheme, setStoredTheme] = useLocalStorage<string>(
    "selectedTheme",
    "theme1"
  );
  const [currentTheme, setCurrentTheme] = useState<Theme>(
    themes.find((theme) => theme.id === storedTheme) || themes[0]
  );

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    setStoredTheme(theme.id);
  };

  useEffect(() => {
    // Apply theme class to document body
    document.body.className = "";
    document.body.classList.add(currentTheme.className);

    // Load Google Fonts for colorful theme
    if (currentTheme.id === "theme3") {
      const link = document.createElement("link");
      link.href =
        "https://fonts.googleapis.com/css2?family=Pacifico&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    if (currentTheme.id === "theme2") {
      const link = document.createElement("link");
      link.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, [currentTheme]);

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    themes,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
