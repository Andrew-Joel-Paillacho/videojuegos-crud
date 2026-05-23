import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'VideoGames Store',
  webDir: 'www',

  plugins: {
    SplashScreen: {
      launchShowDuration: 4000,      // Duración en milisegundos
      launchAutoHide: true,          // Se oculta automáticamente
      splashFullScreen: true,        // Pantalla completa
      splashImmersive: true,         // Modo inmersivo
      backgroundColor: '#ffffff',    // Color de fondo
      androidScaleType: 'CENTER_CROP',
      androidSplashResourceName: "splash",
    }
  }
};

export default config;
