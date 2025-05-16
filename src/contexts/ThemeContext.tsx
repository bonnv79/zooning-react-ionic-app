import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define theme types
export type ThemeMode = 'light' | 'dark';

// Define the context type
interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'light',
  toggleTheme: () => {},
  isDarkMode: false,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Try to get theme from localStorage, default to system preference or light
  const getInitialTheme = (): ThemeMode => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  };

  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialTheme());

  // Toggle theme function
  const toggleTheme = () => {
    setThemeMode(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  // Apply theme to document and prevent white flash during navigation
  useEffect(() => {
    const prefersDark = themeMode === 'dark';
    
    // Apply to document body
    document.body.classList.toggle('dark', prefersDark);
    
    // Apply to html element to prevent white flash
    document.documentElement.classList.toggle('dark', prefersDark);
    
    // Create or update meta theme-color for mobile browsers
    let metaThemeColor = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', prefersDark ? '#121212' : '#ffffff');
    
    // Apply immediate styles to prevent flash during navigation
    if (prefersDark) {
      // Dark mode styles
      document.documentElement.style.backgroundColor = '#121212';
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#f4f4f4';
      
      // Add a style tag to fix select elements in dark mode
      let styleEl = document.getElementById('dark-mode-fixes');
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'dark-mode-fixes';
        document.head.appendChild(styleEl);
        styleEl.innerHTML = `
          /* Fix select elements in dark mode */
          .dark ion-select::part(text),
          .dark ion-select::part(placeholder),
          .dark ion-select-option {
            color: #ffffff !important;
          }
          
          .dark ion-alert,
          .dark ion-alert .alert-title,
          .dark ion-alert .alert-message,
          .dark ion-alert .alert-input-group,
          .dark ion-alert .alert-input,
          .dark ion-alert button,
          .dark .action-sheet-button,
          .dark .select-interface-option {
            color: #ffffff !important;
            background-color: #2a2a2a !important;
          }
          
          /* Prevent white flash during navigation */
          body.dark ion-app,
          body.dark ion-content,
          body.dark ion-page,
          body.dark ion-router-outlet {
            background-color: #121212 !important;
          }
        `;
      }
    } else {
      // Light mode styles
      document.documentElement.style.backgroundColor = '#ffffff';
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#121212';
      
      // Remove dark mode fixes if they exist
      const styleEl = document.getElementById('dark-mode-fixes');
      if (styleEl) {
        styleEl.remove();
      }
    }
  }, [themeMode]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only change if user hasn't explicitly set a preference
      if (!localStorage.getItem('theme')) {
        setThemeMode(e.matches ? 'dark' : 'light');
      }
    };
    
    // Add listener for system preference changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    
    return undefined;
  }, []);

  return (
    <ThemeContext.Provider value={{ 
      themeMode, 
      toggleTheme, 
      isDarkMode: themeMode === 'dark' 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
