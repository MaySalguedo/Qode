import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Qode',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    cleartext: true,
    url: 'http://10.21.63.54:8100'
  }
};

export default config;
