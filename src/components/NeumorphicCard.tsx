'use client';

import React from 'react';

/**
 * NeumorphicCard
 * Wrapper accesible y reutilizable para aplicar el estilo neumórfico central.
 *
 * - `as` permite renderizar 'div' | 'button' | 'a' según la semántica que necesites.
 * - Maneja accesibilidad: soporte keyboard (Enter/Space) para elementos no-button con onClick.
 */

type As = 'div' | 'button' | 'a';

type CommonProps = {
	className?: string;
	children?: React.ReactNode;
	role?: string;
	tabIndex?: number;
};

type Props = CommonProps & {
	as?: As;
	onClick?: (e?: React.SyntheticEvent) => void; // callback opcional (sin obligar a evento específico)
	href?: string;
	type?: 'button' | 'submit' | 'reset';
};

const NeumorphicCard = React.forwardRef<HTMLElement, Props>(function NeumorphicCard({ as = 'div', className = '', children, onClick, role, tabIndex, href, type = 'button' }, ref) {
	const isButton = as === 'button';
	const isAnchor = as === 'a';

	const handleKeyDown = (e: React.KeyboardEvent) => {
		// Si no es un button y hay onClick, simular activación con Enter/Space
		if (!isButton && typeof onClick === 'function' && (e.key === 'Enter' || e.key === ' ')) {
			e.preventDefault();
			// Llamamos el callback sin un MouseEvent; el handler puede optar por ignorar el argumento
			onClick();
		}
	};

	// Renderizar según el "as" elegido para mantener tipado y props correctos
	if (isButton) {
		return (
			<button ref={ref as React.Ref<HTMLButtonElement>} className={`neum-card ${className}`} onClick={(e) => onClick?.(e)} role={role} tabIndex={tabIndex} type={type} onKeyDown={handleKeyDown}>
				{children}
			</button>
		);
	}

	if (isAnchor) {
		return (
			<a
				ref={ref as React.Ref<HTMLAnchorElement>}
				className={`neum-card ${className}`}
				onClick={(e) => {
					// Si href no está definido, tratamos como botón => permitimos onClick
					if (!href) {
						e.preventDefault();
					}
					onClick?.(e);
				}}
				role={role ?? 'link'}
				tabIndex={tabIndex ?? 0}
				href={href}
				onKeyDown={handleKeyDown}>
				{children}
			</a>
		);
	}

	// default: div
	return (
		<div ref={ref as React.Ref<HTMLDivElement>} className={`neum-card ${className}`} onClick={() => onClick?.()} role={role} tabIndex={tabIndex} onKeyDown={handleKeyDown}>
			{children}
		</div>
	);
});

NeumorphicCard.displayName = 'NeumorphicCard';

export default NeumorphicCard;
