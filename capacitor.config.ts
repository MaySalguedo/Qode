import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'app.may.qode',
	appName: 'Qode',
	webDir: 'www',
	server: {
		cleartext: true
	}, android: {

		googleServicesFile: "./android/app/google-services.json"

	}
};

export default config;
