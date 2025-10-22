'use client';
import React, { useEffect, useState } from 'react';

/**
 * ThemeToggle
 * - Toggles a 'dark' class on <html> for Tailwind dark mode or custom CSS.
 * - Persists preference to localStorage.
 */
export default function ThemeToggle() {
	const [dark, setDark] = useState<boolean>(() => {
		try {
			const stored = localStorage.getItem('theme');
			if (stored) return stored === 'dark';
			// If no preference, check user system preference:
			return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		} catch {
			return false;
		}
	});

	useEffect(() => {
		if (dark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [dark]);

	return (
		<button
			aria-pressed={dark}
			onClick={() => setDark((v) => !v)}
			className="w-12 h-8 rounded-xl p-1 flex items-center relative transition-all"
			title="Alternar tema"
			style={{
				background: '#eef3f7',
				boxShadow: '6px 6px 16px rgba(2,6,23,0.06), -6px -6px 16px rgba(255,255,255,0.9)',
			}}>
			<div
				style={{
					width: 28,
					height: 28,
					borderRadius: 999,
					background: dark ? '#111827' : '#60a5fa',
					transform: dark ? 'translateX(20px)' : 'translateX(0px)',
					transition: 'transform 180ms linear, background 180ms',
				}}
			/>
		</button>
	);
}
