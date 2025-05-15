import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'zooning-react-ionic-app',
  webDir: 'dist',
  // These settings apply to both iOS and Android
  loggingBehavior: 'debug',
  // iOS specific configuration
  ios: {
    backgroundColor: '#ffffff',
    contentInset: 'always',
    // Important: This explicitly enables zooming
    zoomEnabled: true,
    allowsLinkPreview: true,
    scrollEnabled: true,
    // Custom user agent to ensure proper WebView behavior
    overrideUserAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    appendUserAgent: 'photo-gallery-app',
    // Additional iOS settings
    limitsNavigationsToAppBoundDomains: false
  },
  // Android specific configuration
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  },
  // Server configuration
  server: {
    cleartext: true,
    androidScheme: 'https',
    iosScheme: 'https',
    allowNavigation: ['*']
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
    // Add WebView plugin configuration
    WebView: {
      allowZooming: true,
      scrollEnabled: true
    }
  }
};

export default config;
