// components/SkillsGrid.tsx
'use client';
import React from 'react';

type Props = {
	skills?: string[];
};

export default function SkillsGrid({ skills = ['Node.js', 'TypeScript', 'React / Next.js', 'Prisma', 'MySQL', 'Puppeteer', 'Tailwind', 'Docker', 'AWS', 'ETL'] }: Props) {
	// Clasificación simple basada en palabras clave — no cambia la API externa
	const categorize = (list: string[]) => {
		const groups: Record<string, string[]> = {
			'Lenguajes & Frameworks': [],
			'Bases de datos': [],
			'Automatización & Scraping': [],
			'Herramientas & DevOps': [],
			Otros: [],
		};

		list.forEach((s) => {
			const key = s.toLowerCase();
			if (/(node|typescript|react|next|javascript|express|tailwind|material)/.test(key)) {
				groups['Lenguajes & Frameworks'].push(s);
			} else if (/(mysql|postgres|mongo|prisma)/.test(key)) {
				groups['Bases de datos'].push(s);
			} else if (/(puppeteer|scrap|scraper|cheerio|axios|etl|selenium)/.test(key)) {
				groups['Automatización & Scraping'].push(s);
			} else if (/(docker|kubernetes|aws|ci\/cd|github|git|devops)/.test(key)) {
				groups['Herramientas & DevOps'].push(s);
			} else {
				groups['Otros'].push(s);
			}
		});

		// Eliminar grupos vacíos para no renderizar secciones innecesarias
		const filtered = Object.fromEntries(Object.entries(groups).filter(([, arr]) => arr.length > 0));
		return filtered as Record<string, string[]>;
	};

	const grouped = categorize(skills);

	return (
		<section aria-labelledby="skills-heading">
			<h3 id="skills-heading" className="sr-only">
				Habilidades
			</h3>

			<div className="skills-grid" role="list">
				{Object.entries(grouped).map(([groupName, items]) => (
					<section key={groupName} className="skill-group" role="listitem" aria-label={groupName}>
						<header className="group-title" aria-hidden>
							{groupName}
						</header>

						<div className="group-items" role="list" aria-label={`${groupName} lista`}>
							{items.map((skill) => (
								<div key={skill} role="listitem" className="skill-card" tabIndex={0} aria-label={skill}>
									<p>{skill}</p>
								</div>
							))}
						</div>
					</section>
				))}
			</div>

			<style jsx>{`
				:root {
					--surface: #f8fbfd;
					--bg-a: #f6fbff;
					--bg-b: #eef6fb;
					--shadow-dark: rgba(124, 139, 156, 0.16);
					--shadow-light: rgba(255, 255, 255, 0.95);
					--accent: #6366f1;
					--accent-2: #06b6d4;
					--muted: #6b7280;
				}

				/* categorías apiladas verticalmente */
				.skills-grid {
					display: grid;
					grid-template-columns: 1fr;
					gap: 16px;
				}

				.skill-group {
					display: flex;
					flex-direction: column;
					gap: 10px;
				}

				.group-title {
					font-size: 13px;
					font-weight: 800;
					color: #0f172a;
					letter-spacing: -0.01em;
					padding-left: 6px;
				}

				/* Dentro de cada categoría, skills en GRID de 2 columnas (dos por fila) */
				.group-items {
					display: grid;
					grid-template-columns: repeat(2, minmax(0, 1fr));
					gap: 10px;
					width: 100%;
				}

				/* NEU Card para cada skill */
				.skill-card {
					background: linear-gradient(180deg, var(--surface), #ecf9ff);
					border-radius: 14px;
					padding: 10px 12px;
					display: flex;
					align-items: center;
					justify-content: flex-start;
					cursor: default;
					border: 1px solid rgba(255, 255, 255, 0.6);
					box-shadow: inset 6px 6px 12px rgba(163, 177, 198, 0.08), inset -6px -6px 12px rgba(255, 255, 255, 0.95), 6px 6px 16px var(--shadow-dark), -6px -6px 16px var(--shadow-light);
					transition: transform 180ms cubic-bezier(0.2, 0.9, 0.3, 1), box-shadow 180ms ease, background 180ms ease;
					will-change: transform, box-shadow;
					user-select: none;
					width: 100%;
				}

				.skill-label {
					margin: 0;
					font-size: 13px;
					font-weight: 600;
					color: #0f172a;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.skill-card:hover,
				.skill-card:focus {
					transform: translateY(-6px) rotateX(1deg);
					box-shadow: inset 4px 4px 10px rgba(163, 177, 198, 0.06), inset -4px -4px 10px rgba(255, 255, 255, 0.95), 14px 14px 30px rgba(99, 102, 241, 0.08), -8px -8px 24px rgba(255, 255, 255, 0.9);
					background: linear-gradient(180deg, #ffffff, #e9f6ff);
				}

				.skill-card:active {
					transform: translateY(-2px) scale(0.997);
					box-shadow: inset 6px 6px 12px rgba(124, 139, 156, 0.12), inset -6px -6px 12px rgba(255, 255, 255, 0.9);
				}

				/* En pantallas muy pequeñas, mostrar una columna dentro de cada categoría (mejor legibilidad) */
				@media (max-width: 420px) {
					.group-items {
						grid-template-columns: 1fr;
					}
				}

				/* Oscuro */
				@media (prefers-color-scheme: dark) {
					:root {
						--surface: #0b1220;
						--bg-a: #0f1724;
						--bg-b: #0b1226;
						--shadow-dark: rgba(0, 0, 0, 0.6);
						--shadow-light: rgba(255, 255, 255, 0.02);
					}
					.skill-card {
						background: linear-gradient(180deg, rgba(20, 28, 45, 0.85), rgba(10, 16, 28, 0.85));
						color: #e6eef8;
						border: 1px solid rgba(255, 255, 255, 0.02);
						box-shadow: inset 6px 6px 12px rgba(0, 0, 0, 0.6), inset -6px -6px 12px rgba(255, 255, 255, 0.02), 6px 6px 12px rgba(0, 0, 0, 0.6);
					}
					.skill-card:hover,
					.skill-card:focus {
						box-shadow: inset 3px 3px 10px rgba(0, 0, 0, 0.6), inset -3px -3px 10px rgba(255, 255, 255, 0.02), 14px 14px 30px rgba(99, 102, 241, 0.06);
						background: linear-gradient(180deg, #0b1220, #08101a);
					}
					.skill-label,
					.group-title {
						color: #e6eef8;
					}
				}

				/* ayuda accesible */
				.sr-only {
					position: absolute !important;
					height: 1px;
					width: 1px;
					overflow: hidden;
					clip: rect(1px, 1px, 1px, 1px);
					white-space: nowrap;
				}
			`}</style>
		</section>
	);
}
