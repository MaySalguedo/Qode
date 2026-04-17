import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'app.may.qode',
	appName: 'Qode',
	webDir: 'www',
	server: {

		cleartext: true

	}, plugins: {

		StatusBar: {

			overlaysWebView: true

		}

	}, android: {

		googleServicesFile: "./android/app/google-services.json",
		adjustMarginsForEdgeToEdge: 'auto'

	}
};

export default config;
