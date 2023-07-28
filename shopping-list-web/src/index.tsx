import './index.css';
import App from './App';
import React from 'react';
import i18n from 'i18next';
import { store } from './app/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import HttpApi from 'i18next-http-backend';
import reportWebVitals from './reportWebVitals';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(initReactI18next) // passes i18n down to react-i18next
	.use(LanguageDetector)
	.use(HttpApi)
	.init({
		// the translations
		// (tip move them in a JSON file and import them,
		// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
		// lng: document.querySelector('html')?.lang, // if you're using a language detector, do not define the lng option
		supportedLngs: ['en', 'fr'],
		fallbackLng: 'en',
		detection: {
			order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
			caches: ['cookie'],
		},
		backend: {
			loadPath: '/assets/locales/{{lng}}/translation.json',
		},
		react: {
			useSuspense: false,
		},
	});

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
