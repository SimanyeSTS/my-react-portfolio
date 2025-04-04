import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import themeReducer from "./themeReducer";

export const ThemeContext = createContext();

const getInitialThemeState = () => {
  const storedTheme = JSON.parse(localStorage.getItem("themeSettings")) || {};
  
  if (!storedTheme.background || localStorage.getItem('isFreshLoad') === 'true') {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return {
      primary: storedTheme.primary || "color-1",
      primaryHue: storedTheme.primaryHue || 270,
      background: systemPrefersDark ? "bg-2" : "bg-1"
    };
  }
  
  return storedTheme;
};

export const ThemeProvider = ({ children }) => {
  const [themeState, dispatchTheme] = useReducer(
    themeReducer,
    getInitialThemeState()
  );

  const themeHandler = (buttonClassName) => {
    dispatchTheme({ type: buttonClassName });
    if (buttonClassName === "bg-1" || buttonClassName === "bg-2") {
      localStorage.setItem('isFreshLoad', 'false');
    }
  };

  const handleSystemThemeChange = useCallback((e) => {
    if (localStorage.getItem('isFreshLoad') !== 'false') {
      dispatchTheme({
        type: e.matches ? "bg-2" : "bg-1"
      });
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [handleSystemThemeChange]);

  useEffect(() => {
    localStorage.setItem("themeSettings", JSON.stringify(themeState));
  }, [themeState.primary, themeState.background]);

  useEffect(() => {
    localStorage.setItem('isFreshLoad', 'true');
    return () => localStorage.setItem('isFreshLoad', 'false');
  }, []);

  return (
    <ThemeContext.Provider value={{ themeState, themeHandler }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);