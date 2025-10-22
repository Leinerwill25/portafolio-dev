'use client';

import React from 'react';

/**
 * NeumorphicCard
 * Wrapper accesible y reutilizable para aplicar el estilo neumórfico central.
 * - Usa la clase global `neum-card` (defínela en `styles/globals.css`) para sombras/gradientes.
 * - `as` permite renderizar 'div' | 'button' | 'a' según la semántica que necesites.
 * - Maneja accesibilidad: soporte keyboard (Enter/Space) para elementos no-button con onClick.
 */

type As = 'div' | 'button' | 'a';

type Props = {
	as?: As;
	className?: string;
	children?: React.ReactNode;
	onClick?: (e: React.MouseEvent) => void;
	role?: string;
	tabIndex?: number | undefined;
	href?: string;
	type?: 'button' | 'submit' | 'reset';
};

const NeumorphicCard = React.forwardRef<HTMLElement, Props>(({ as = 'div', className = '', children, onClick, role, tabIndex, href, type = 'button' }, ref) => {
	const Tag = as as any;
	const isButton = as === 'button';

	return (
		<Tag
			ref={ref}
			className={`neum-card ${className}`}
			onClick={onClick}
			role={role}
			tabIndex={tabIndex}
			href={href}
			type={isButton ? type : undefined}
			onKeyDown={(e: React.KeyboardEvent) => {
				// Si no es un button, simular activación con Enter/Space
				if (!isButton && onClick && (e.key === 'Enter' || e.key === ' ')) {
					e.preventDefault();
					// @ts-ignore
					onClick(e as unknown as React.MouseEvent);
				}
			}}>
			{children}
		</Tag>
	);
});

NeumorphicCard.displayName = 'NeumorphicCard';

export default NeumorphicCard;
