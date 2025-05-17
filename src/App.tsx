import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { App as CapacitorApp } from '@capacitor/app';
import Home from './pages/Home';
import FilesystemPage from './pages/FilesystemPage';
import WhatsappPage from './pages/WhatsappPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useEffect } from 'react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* Using class-based dark mode instead of system preference */
import '@ionic/react/css/palettes/dark.class.css';

/* Theme variables */
import './theme/variables.css';

/* Dark mode fixes */
import './theme/dark-mode-fixes.css';

/* Performance optimizations */
import './theme/performance.css';

// Configure Ionic for better performance
setupIonicReact({
  // Optimize Ionic for better performance
  hardwareBackButton: true,
  rippleEffect: false,
  mode: 'ios', // iOS mode has better performance
  animated: false
});

const App: React.FC = () => {
  // Optimize hardware back button for faster navigation
  useEffect(() => {
    const handleBackButton = () => {
      // This makes the hardware back button faster by skipping animations
      const path = window.location.pathname;
      if (path === '/filesystem' || path === '/whatsapp') {
        window.location.href = '/home';
        return false; // Prevent default back button behavior
      }
      return true; // Allow default back button behavior
    };

    // Add listener for hardware back button
    CapacitorApp.addListener('backButton', handleBackButton);
    
    // Clean up listener when component unmounts
    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, []);
  
  return (
  <LanguageProvider>
    <ThemeProvider>
      <IonApp>
        <IonReactRouter>
          {/* Optimized for faster navigation */}
          <IonRouterOutlet animated={false}>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/filesystem">
              <FilesystemPage />
            </Route>
            <Route exact path="/whatsapp">
              <WhatsappPage />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </ThemeProvider>
  </LanguageProvider>
  );
};

export default App;
