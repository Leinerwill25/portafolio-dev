// components/Header.tsx
'use client';

import React from 'react';
import AnimatedButton from './AnimatedButton';
import { motion } from 'framer-motion';

type Props = {
	name?: string;
	title?: string;
	bio?: string;
	profileSrc?: string;
};

export default function Header({ name = 'Dereck Ruiz', title = 'Programador FullStack', bio = 'Soy fundador de SyncWave y desarrollador Full-Stack. En 6 años he automatizado procesos críticos con APIs, scrapers y pipelines ETL, reduciendo errores manuales y acelerando el acceso a datos accionables. Ofrecemos auditorías rápidas para mostrarte dónde automatizar y ahorrar tiempo desde el primer mes.', profileSrc = '/profile.jpg' }: Props) {
	const handleContact = () => {
		const el = document.getElementById('contact');
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		else window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
	};

	return (
		<motion.header initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.2, 0.9, 0.3, 1] }} aria-label="Hero — Perfil profesional" className="w-full">
			{/* Contenedor neumórfico: usa las mismas variables y sombras del SkillsGrid */}
			<div className="neum-header" role="region" aria-labelledby="hero-heading">
				<div className="container">
					{/* Avatar: ahora semántico con figure + figcaption */}
					<figure className="neo-avatar" aria-hidden={false}>
						<motion.div whileHover={{ scale: 1.035 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }}>
							<img src={profileSrc} alt={`${name} — foto de perfil`} />
						</motion.div>
						<figcaption className="sr-only">Foto de perfil de {name}</figcaption>
					</figure>

					{/* Texto principal: uso de hgroup para agrupar título y subtítulo */}
					<div className="content">
						<hgroup className="title-row" aria-hidden={false}>
							<span className="accent-bar" aria-hidden="true" />
							<div>
								<h1 id="hero-heading" className="name">
									{name}
								</h1>
								<p className="title">
									{title} <span className="cert">• Técnico Medio en Informática</span>
								</p>
							</div>
						</hgroup>

						{/* Biografía */}
						<p className="bio">{bio}</p>

						{/* Badges / metadata: ahora una lista para accesibilidad */}
						<ul className="meta" role="list" aria-label="Etiquetas y puestos">
							<li>
								<span className="badge">Syncwave · Founder</span>
							</li>
							<li>
								<span className="badge ghost">APIs · Scrapers · ETL</span>
							</li>
						</ul>
					</div>

					{/* Acciones: moved to an aside with clear aria-label */}
					<aside className="actions" aria-label="Acciones del perfil">
						<AnimatedButton onClick={handleContact} className="contact-btn" aria-label="Contactar">
							Contactar
						</AnimatedButton>
					</aside>
				</div>
			</div>

			<style jsx>{`
				/* --- Palette + tokens (same as SkillsGrid with fallbacks) --- */
				:root {
					--surface: #f8fbfd;
					--bg-a: #f6fbff;
					--bg-b: #eef6fb;
					--shadow-dark: rgba(124, 139, 156, 0.16);
					--shadow-light: rgba(255, 255, 255, 0.95);
					--accent: #6366f1;
					--accent-2: #06b6d4;
					--muted: #6b7280;
					--card-radius: 18px;
				}

				/* Container that visually behaves like your skill cards */
				.neum-header {
					background: linear-gradient(180deg, var(--surface), #ecf9ff);
					border-radius: 24px;
					padding: 16px;
					border: 1px solid rgba(255, 255, 255, 0.6);
					box-shadow: inset 6px 6px 12px rgba(163, 177, 198, 0.08), inset -6px -6px 12px rgba(255, 255, 255, 0.95), 12px 12px 28px var(--shadow-dark), -8px -8px 20px var(--shadow-light);
					transition: box-shadow 180ms ease, transform 180ms ease;
				}

				/* Layout */
				.container {
					max-width: 1100px;
					margin: 0 auto;
					display: flex;
					gap: 18px;
					align-items: center;
					flex-direction: column;
				}

				/* avatar */
				.neo-avatar {
					width: 88px;
					height: 88px;
					border-radius: 9999px;
					overflow: hidden;
					flex-shrink: 0;
					box-shadow: inset 6px 6px 12px rgba(15, 23, 42, 0.08), inset -6px -6px 12px rgba(255, 255, 255, 0.95);
					border: 1px solid rgba(255, 255, 255, 0.6);
				}
				.neo-avatar img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					display: block;
				}

				/* Content */
				.content {
					text-align: center;
					margin-top: 8px;
				}

				.title-row {
					display: flex;
					align-items: center;
					gap: 12px;
					justify-content: center;
				}

				.accent-bar {
					width: 6px;
					height: 48px;
					border-radius: 6px;
					background: linear-gradient(180deg, var(--accent), var(--accent-2));
					display: none;
				}

				.name {
					margin: 0;
					font-size: 1.375rem; /* 22px */
					line-height: 1.05;
					font-weight: 800;
					color: #0f172a;
				}

				.title {
					margin: 4px 0 0;
					font-size: 0.95rem;
					color: #475569;
					font-weight: 600;
				}

				.cert {
					color: #94a3b8;
					font-weight: 500;
					margin-left: 6px;
				}

				.bio {
					margin-top: 12px;
					color: #475569;
					font-size: 0.95rem;
					max-width: 64ch;
					margin-left: auto;
					margin-right: auto;
					line-height: 1.5;
				}

				.meta {
					margin-top: 12px;
					display: flex;
					gap: 8px;
					justify-content: center;
					flex-wrap: wrap;
					list-style: none;
					padding: 0;
					margin: 0;
				}

				.meta li {
					display: inline-block;
				}

				.badge {
					font-size: 0.75rem;
					font-weight: 700;
					padding: 6px 10px;
					border-radius: 999px;
					background: linear-gradient(180deg, rgba(255, 255, 255, 0.85), rgba(243, 246, 255, 0.7));
					border: 1px solid rgba(255, 255, 255, 0.6);
					color: #0f172a;
					backdrop-filter: blur(4px);
				}

				.badge.ghost {
					background: #ffff;
					color: #0f172a;
					font-weight: 600;
				}

				/* Actions: contact + theme toggle */
				.actions {
					margin-top: 14px;
					display: flex;
					gap: 12px;
					align-items: center;
					justify-content: center;
					flex-wrap: nowrap;
				}

				/* passthrough class to AnimatedButton to look neo */
				.contact-btn {
					min-width: 120px;
					--btn-bg: linear-gradient(180deg, #ffffff, #f3fbff);
					background: var(--btn-bg);
					border: 1px solid rgba(255, 255, 255, 0.6);
					box-shadow: 6px 6px 16px rgba(2, 6, 23, 0.04), -6px -6px 16px rgba(255, 255, 255, 0.8);
					color: #0f172a;
					border-radius: 12px;
					padding: 10px 14px;
					font-weight: 700;
					transition: transform 160ms ease, box-shadow 160ms ease;
				}
				.contact-btn:hover,
				.contact-btn:focus {
					transform: translateY(-4px);
					box-shadow: 14px 14px 30px rgba(99, 102, 241, 0.06), -8px -8px 24px rgba(255, 255, 255, 0.9);
				}

				.toggle-wrap {
					transform: scale(1.05);
					display: flex;
					align-items: center;
				}

				/* Responsive: bigger layout on md+ */
				@media (min-width: 768px) {
					.container {
						flex-direction: row;
						align-items: flex-start;
					}
					.content {
						text-align: left;
						margin-top: 0;
						flex: 1;
					}
					.accent-bar {
						display: inline-block;
					}
					.neo-avatar {
						width: 112px;
						height: 112px;
					}
					.name {
						font-size: 1.75rem; /* 28px */
					}
					.bio {
						margin-left: 0;
						margin-right: 0;
					}
					.actions {
						margin-top: 0;
						margin-left: auto;
						flex-direction: column;
						align-items: flex-end;
						gap: 10px;
					}
				}

				/* Dark mode variant (keeps contrast for page dark background) */
				@media (prefers-color-scheme: dark) {
					:root {
						--surface: #0b1220;
						--bg-a: #0f1724;
						--bg-b: #0b1226;
						--shadow-dark: rgba(0, 0, 0, 0.6);
						--shadow-light: rgba(255, 255, 255, 0.02);
					}
					.neum-header {
						background: linear-gradient(180deg, rgba(20, 28, 45, 0.85), rgba(10, 16, 28, 0.85));
						border: 1px solid rgba(255, 255, 255, 0.02);
						box-shadow: inset 6px 6px 12px rgba(0, 0, 0, 0.6), inset -6px -6px 12px rgba(255, 255, 255, 0.02), 8px 8px 18px rgba(0, 0, 0, 0.6);
					}
					.name {
						color: #e6eef8;
					}
					.title,
					.bio {
						color: #cbd5e1;
					}
					.badge {
						background: rgba(255, 255, 255, 0.02);
						color: #cbd5e1;
						border: 1px solid rgba(255, 255, 255, 0.02);
					}
					.contact-btn {
						background: linear-gradient(180deg, #0f1724, #071025);
						color: #e6eef8;
						border: 1px solid rgba(255, 255, 255, 0.02);
					}
				}
			`}</style>
		</motion.header>
	);
}
