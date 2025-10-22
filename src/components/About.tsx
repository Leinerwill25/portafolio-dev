// components/AboutArticle.tsx
'use client';

import React from 'react';

type Props = {
	about: string;
};

export default function AboutArticle({ about }: Props) {
	return (
		<article className="neo-card u-card-padding about-article" style={{ maxWidth: '100%' }} aria-labelledby="about-title">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
				{/* Left: content */}
				<div className="md:col-span-2">
					<header className="about-header">
						<div className="title-row">
							<h2 id="about-title" className="title">
								Sobre mí
							</h2>
							<span className="pill">Senior · Fullstack</span>
						</div>
						<p className="subtitle">Desarrollador — APIs, scrapers y pipelines ETL</p>
					</header>

					<div className="about-body">
						<p className="lead">{about}</p>

						{/* Small stats row */}
						<ul className="stats" role="list" aria-label="Resumen rapido">
							<li className="stat">
								<strong>6+</strong>
								<span>Años</span>
							</li>
							<li className="stat">
								<strong>APIs</strong>
								<span>Diseño &amp; Documentación</span>
							</li>
							<li className="stat">
								<strong>Scrapers</strong>
								<span>Puppeteer &amp; Anti-block</span>
							</li>
						</ul>

						{/* CTAs */}
						<div className="cta-row">
							<a href="#contact" className="neo-cta" aria-label="Ir al formulario de contacto">
								Contactar
							</a>

							<a href="/CV Dev.pdf" className="download-btn" aria-label="Descargar CV" rel="noopener noreferrer" target="_blank">
								Descargar CV
							</a>
						</div>
					</div>
				</div>

				{/* Right: avatar / decorative card */}
				<aside className="md:col-span-1 avatar-block" aria-hidden="false">
					<figure className="neo-avatar-lg">
						<img src="/images.jpg" alt="Dereck Ruiz" className="avatar-img" />
						<figcaption className="sr-only">Foto de perfil de Dereck Ruiz</figcaption>
						<div className="avatar-badge" aria-hidden="true">
							Disponible
						</div>
					</figure>

					{/* small skill preview chips for visual richness */}
					<div className="chips" aria-hidden="true">
						<span className="chip">Node.js</span>
						<span className="chip">Next.js</span>
						<span className="chip">Prisma</span>
					</div>
				</aside>
			</div>

			<style jsx>{`
				/* Dark/cold token fallbacks local to this component */
				:root {
					--dark-900: #051025;
					--dark-800: #071032;
					--dark-700: #0b1724;
					--muted-400: #9fb4d4;
					--muted-300: #cfe8ff;
					--accent-a: #6366f1;
					--accent-b: #06b6d4;
					--glass-1: rgba(6, 16, 28, 0.7);
					--glass-2: rgba(8, 20, 36, 0.6);
					--outline: rgba(15, 35, 55, 0.28);
					--shadow-dark: rgba(3, 8, 20, 0.6);
					--shadow-soft: rgba(8, 18, 34, 0.28);
				}

				.about-article {
					--card-pad: 20px;
					border-radius: 16px;
					padding: var(--card-pad);
					position: relative;
					/* keep neo-card background (light) but if you want the card darker, override here */
					background: linear-gradient(180deg, var(--dark-700), var(--dark-800));
					border: 1px solid var(--outline);
					box-shadow: inset 6px 6px 12px rgba(2, 6, 18, 0.45), inset -6px -6px 12px rgba(12, 32, 52, 0.18), 10px 14px 30px rgba(2, 6, 18, 0.45);
				}

				.about-header .title-row {
					display: flex;
					align-items: center;
					gap: 12px;
				}

				.title {
					margin: 0;
					font-size: 1.5rem;
					color: var(--muted-300); /* light, readable on dark card */
					font-weight: 800;
					line-height: 1;
				}

				.pill {
					display: inline-block;
					background: linear-gradient(180deg, rgba(6, 24, 40, 0.9), rgba(8, 30, 50, 0.75));
					border: 1px solid rgba(100, 140, 170, 0.12);
					color: var(--muted-300);
					padding: 6px 10px;
					border-radius: 999px;
					font-weight: 700;
					font-size: 0.75rem;
					box-shadow: inset 3px 3px 8px rgba(2, 8, 20, 0.6), -3px -3px 6px rgba(12, 28, 44, 0.16);
				}

				.subtitle {
					margin: 6px 0 0;
					color: var(--muted-400);
					font-weight: 600;
					font-size: 0.95rem;
				}

				.about-body {
					margin-top: 14px;
				}

				.lead {
					color: var(--muted-300);
					font-size: 0.98rem;
					line-height: 1.6;
					max-width: 72ch;
					margin-bottom: 14px;
					opacity: 0.95;
				}

				/* Stats */
				.stats {
					display: flex;
					gap: 12px;
					margin: 6px 0 12px;
					padding: 0;
					list-style: none;
					align-items: center;
					flex-wrap: wrap;
				}

				.stat {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					background: linear-gradient(180deg, var(--glass-1), var(--glass-2));
					border: 1px solid rgba(80, 110, 135, 0.08);
					padding: 8px 10px;
					border-radius: 10px;
					box-shadow: inset 3px 3px 8px rgba(2, 8, 20, 0.4), inset -3px -3px 8px rgba(12, 28, 44, 0.12);
					min-width: 92px;
				}

				.stat strong {
					display: block;
					font-size: 1rem;
					color: var(--muted-300);
					font-weight: 800;
				}

				.stat span {
					font-size: 0.75rem;
					color: var(--muted-400);
					margin-top: 2px;
				}

				/* CTAs */
				.cta-row {
					display: flex;
					gap: 12px;
					margin-top: 8px;
					align-items: center;
					flex-wrap: wrap;
				}

				a.neo-cta,
				.download-btn,
				.chip,
				.pill {
					text-decoration: none;
				}

				.neo-cta {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					padding: 10px 14px;
					border-radius: 12px;
					font-weight: 700;
					background: linear-gradient(180deg, rgba(12, 40, 70, 0.95), rgba(8, 30, 52, 0.9));
					border: 1px solid rgba(80, 120, 150, 0.14);
					color: var(--muted-300);
					box-shadow: 6px 6px 16px rgba(2, 8, 20, 0.6), -6px -6px 16px rgba(8, 24, 44, 0.22);
					transition: transform 160ms ease, box-shadow 160ms ease;
				}
				.neo-cta:hover,
				.neo-cta:focus {
					transform: translateY(-4px);
					box-shadow: 14px 14px 30px rgba(8, 24, 40, 0.6), -8px -8px 24px rgba(10, 28, 44, 0.25);
				}

				.download-btn {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					padding: 10px 14px;
					border-radius: 12px;
					font-weight: 700;
					background: linear-gradient(90deg, rgba(10, 28, 48, 0.9), rgba(6, 20, 36, 0.85));
					border: 1px solid rgba(80, 120, 150, 0.1);
					color: var(--muted-300);
					box-shadow: 6px 6px 16px rgba(2, 8, 20, 0.5), -6px -6px 16px rgba(8, 24, 44, 0.18);
					text-decoration: none;
					transition: transform 160ms ease, box-shadow 160ms ease;
				}
				.download-btn:hover,
				.download-btn:focus {
					transform: translateY(-4px);
					box-shadow: 14px 14px 30px rgba(8, 24, 40, 0.6), -8px -8px 24px rgba(10, 28, 44, 0.25);
				}

				/* Avatar block */
				.avatar-block {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 12px;
					justify-content: start;
				}

				.neo-avatar-lg {
					width: 160px;
					height: 160px;
					border-radius: 18px;
					overflow: hidden;
					position: relative;
					border: 1px solid rgba(80, 110, 135, 0.08);
					box-shadow: inset 6px 6px 12px rgba(2, 8, 20, 0.45), inset -6px -6px 12px rgba(12, 28, 44, 0.16), 8px 8px 20px rgba(3, 8, 20, 0.45), -6px -6px 16px rgba(8, 24, 44, 0.18);
					background: linear-gradient(180deg, rgba(6, 16, 28, 0.9), rgba(10, 24, 40, 0.85));
				}

				.avatar-img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					display: block;
					filter: saturate(0.95) contrast(0.95);
				}

				.avatar-badge {
					position: absolute;
					left: 12px;
					bottom: 12px;
					background: linear-gradient(180deg, var(--accent-a), var(--accent-b));
					color: var(--muted-300);
					font-weight: 700;
					font-size: 0.75rem;
					padding: 6px 10px;
					border-radius: 999px;
					box-shadow: 6px 6px 14px rgba(3, 8, 20, 0.45);
					border: 1px solid rgba(40, 70, 95, 0.12);
				}

				.chips {
					display: flex;
					gap: 8px;
					flex-wrap: wrap;
					margin-top: 6px;
					justify-content: center;
				}

				.chip {
					font-size: 0.75rem;
					padding: 6px 8px;
					border-radius: 999px;
					background: linear-gradient(180deg, rgba(6, 16, 28, 0.7), rgba(8, 24, 40, 0.6));
					border: 1px solid rgba(80, 110, 135, 0.08);
					color: var(--muted-300);
					box-shadow: inset 3px 3px 6px rgba(2, 8, 20, 0.36), inset -3px -3px 6px rgba(12, 28, 44, 0.12);
				}

				@media (min-width: 768px) {
					.about-article {
						padding: 22px;
					}
					.title {
						font-size: 1.875rem;
					}
					.neo-avatar-lg {
						width: 180px;
						height: 180px;
						border-radius: 16px;
					}
					.chips {
						justify-content: flex-start;
					}
				}

				@media (prefers-color-scheme: dark) {
					/* keep colors consistent; card already dark */
					.title {
						color: var(--muted-300);
					}
					.subtitle,
					.lead {
						color: var(--muted-400);
					}
					.stat strong {
						color: var(--muted-300);
					}
					.stat span {
						color: var(--muted-400);
					}
					.neo-cta,
					.download-btn,
					.pill,
					.chip {
						/* slightly lighter variants are already used */
					}
					.avatar-badge {
						background: linear-gradient(180deg, #06b6d4, #0ea5a0);
					}
				}
			`}</style>
		</article>
	);
}
