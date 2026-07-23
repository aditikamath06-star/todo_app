import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.todoapp',
  appName: 'TodoApp',
  webDir: 'build',
  plugins: {
    FirebaseAuthentication: {
      providers: ["google.com"],
      skipNativeAuth: false
    }
  }
};

export default config;
