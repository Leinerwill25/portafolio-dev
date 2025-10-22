'use client';
import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	children: React.ReactNode;
};

/**
 * AnimatedButton
 * - Reusable CTA with subtle scale animation.
 * - Accepts all standard button props.
 */
export default function AnimatedButton({ children, className = '', ...rest }: Props) {
	return (
		<button
			{...rest}
			className={`inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold transition-transform transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm ${className}`}
			style={{
				background: 'linear-gradient(90deg,#06b6d4,#6366f1)',
				color: 'white',
			}}>
			{children}
		</button>
	);
}
