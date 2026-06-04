import { createContext, useContext, useState, useEffect, useLayoutEffect, ReactNode } from "react";

/** Ép trang luôn dùng dark mode — dùng useLayoutEffect để không flash sáng trước paint. */
export function useForceDark() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const prev = root.getAttribute("data-theme") ?? "dark";
    root.setAttribute("data-theme", "dark");
    return () => {
      root.setAttribute("data-theme", prev);
    };
  }, []);
}

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "dark", toggleTheme: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("seal-theme") as Theme) ?? "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("seal-theme", theme);
  }, [theme]);

  function toggleTheme() {
    document.documentElement.classList.add("theme-transitioning");
    setTheme(t => (t === "dark" ? "light" : "dark"));
    setTimeout(() => document.documentElement.classList.remove("theme-transitioning"), 400);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
