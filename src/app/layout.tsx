import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
	title: 'Dereck Ruiz — Portafolio',
	description: 'Portafolio profesional de Dereck Ruiz, desarrollador web especializado en interfaces modernas, neumorfismo y experiencias digitales elegantes.',
	keywords: ['Dereck Ruiz', 'portafolio', 'developer', 'frontend', 'Next.js', 'neumorfismo', 'diseño UI', 'web moderna'],
	authors: [{ name: 'Dereck Ruiz' }],
	openGraph: {
		title: 'Dereck Ruiz — Portafolio',
		description: 'Explora el portafolio de Dereck Ruiz, desarrollador web especializado en UI elegante y funcional.',
		url: 'https://dereckruiz.dev',
		siteName: 'Dereck Ruiz Portafolio',
		images: [
			{
				url: '/preview.png',
				width: 1200,
				height: 630,
				alt: 'Portafolio Dereck Ruiz',
			},
		],
		locale: 'es_ES',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Dereck Ruiz — Portafolio',
		description: 'Desarrollador web especializado en interfaces modernas y neumorfismo.',
		creator: '@dereckruiz',
		images: ['/preview.png'],
	},
	icons: {
		icon: '/favicon.png',
	},
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="es">
			<body className="bg-[#e9edf3] text-[#1e293b] dark:bg-[#0b1220] dark:text-[#f1f5f9] transition-colors duration-300">
				<main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
			</body>
		</html>
	);
}
