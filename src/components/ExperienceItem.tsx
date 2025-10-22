// components/ExperienceItem.tsx
'use client';
import React from 'react';

type Props = {
	title: string; // e.g. "Syncwave — Fundador / Lead Technical (Automatizaciones & Plataformas)"
	company: string;
	dateRange?: string; // e.g. "2022 - 2023" or "Actualmente"
	bullets: string[]; // responsabilidades
};

/** heurística simple para derivar un % de "impact" desde el texto de las responsabilidades */
function deriveImpactPct(bullets: string[]): number {
	// buscar porcentajes o rangos "70–90%" "70-90%" o números aislados
	const text = bullets.join(' ').replace(/\s+/g, ' ');
	const rangeMatch = text.match(/(\d{1,3})\s*(?:–|-|to)\s*(\d{1,3})\s*%?/);
	if (rangeMatch) {
		const hi = Number(rangeMatch[2]);
		if (!Number.isNaN(hi)) return Math.min(100, hi);
	}
	const pctMatch = text.match(/(\d{1,3})\s*%/);
	if (pctMatch) {
		const v = Number(pctMatch[1]);
		if (!Number.isNaN(v)) return Math.min(100, v);
	}
	// si detecta palabras como "optim" "reduciendo" "mejor" favorecer impacto
	if (/(reduci|optimi|mejor|aument|aceler)/i.test(text)) return 78;
	// default conservador
	return 56;
}

/** normaliza longitudes de bullets para barras (0..1) */
function computeLengths(bullets: string[]) {
	const lens = bullets.map((b) => Math.min(1, b.length / 120)); // cap para visual
	return lens;
}

export default function ExperienceItem({ title, company, dateRange = '', bullets }: Props) {
	const impact = deriveImpactPct(bullets);
	const lengths = computeLengths(bullets);

	return (
		<article className="xp-card" aria-labelledby={`xp-${company}-${title}`}>
			<header className="xp-header">
				<div className="xp-meta">
					<div className="xp-title-wrap">
						<h4 id={`xp-${company}-${title}`} className="xp-title">
							{title}
						</h4>
						<div className="xp-sub">
							<svg className="icon company-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
								<path d="M3 7v13h18V7H3zm0-2h18V4a1 1 0 00-1-1H4a1 1 0 00-1 1v1z" fill="currentColor" />
							</svg>
							<span className="company">{company}</span>
							<span className="dot">•</span>
							<svg className="icon calendar-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
								<path d="M7 10h5v5H7v-5zM3 8h18v11a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm2-4h2V2h2v2h6V2h2v2h2a1 1 0 011 1v1H4V5a1 1 0 011-1z" fill="currentColor" />
							</svg>
							<time className="date">{dateRange}</time>
						</div>
					</div>
				</div>

				<div className="xp-stats" aria-hidden>
					<div className="stat">
						<svg className="icon stat-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
							<path d="M3 13h4v7H3v-7zm6-5h4v12h-4V8zm6-4h4v16h-4V4z" fill="currentColor" />
						</svg>
						<div className="stat-body">
							<span className="stat-value">{bullets.length}</span>
							<span className="stat-label">Responsabilidades</span>
						</div>
					</div>

					<div className="stat impact">
						<svg className="icon stat-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
							<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3v7l5 3" fill="currentColor" />
						</svg>
						<div className="stat-body">
							<span className="stat-value">{impact}%</span>
							<span className="stat-label">Impacto estimado</span>
						</div>
					</div>
				</div>
			</header>

			<div className="xp-body">
				<ul className="xp-list" role="list" aria-label={`Responsabilidades en ${company}`}>
					{bullets.map((b, i) => (
						<li key={i} className="xp-item" role="listitem">
							<div className="xp-item-left">
								<span className="bullet-icon" aria-hidden>
									{/* small check-circle */}
									<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
										<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.12" />
										<path d="M9 12.5l1.8 1.8L15 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</span>
							</div>

							<div className="xp-item-main">
								<p className="xp-item-text">{b}</p>

								{/* mini bar chart representing 'weight' of the responsibility */}
								<div className="mini-bar" aria-hidden>
									<div className="mini-track">
										<div className="mini-fill" style={{ width: `${Math.round(lengths[i] * 100)}%` }} />
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>

			<style jsx>{`
				:root {
					--neo-surface: #f8fbfd;
					--neo-surface-2: #eef6fb;
					--muted: #6b7280;
					--text: #0f172a;
					--accent: #6366f1;
					--accent-2: #06b6d4;
					--shadow-dark: rgba(124, 139, 156, 0.12);
					--shadow-light: rgba(255, 255, 255, 0.95);
					--card-radius: 14px;
				}

				.xp-card {
					background: linear-gradient(180deg, var(--neo-surface), var(--neo-surface-2));
					border-radius: 18px;
					padding: 18px;
					border: 1px solid rgba(255, 255, 255, 0.6);
					box-shadow: inset 6px 6px 12px rgba(163, 177, 198, 0.06), inset -6px -6px 12px rgba(255, 255, 255, 0.95), 10px 10px 26px var(--shadow-dark), -8px -8px 20px var(--shadow-light);
					display: flex;
					flex-direction: column;
					gap: 12px;
				}

				.xp-header {
					display: flex;
					gap: 12px;
					align-items: flex-start;
					justify-content: space-between;
				}

				.xp-title {
					margin: 0;
					font-size: 1rem;
					font-weight: 800;
					color: var(--text);
					line-height: 1.05;
				}

				.xp-sub {
					margin-top: 6px;
					display: flex;
					gap: 8px;
					align-items: center;
					color: var(--muted);
					font-weight: 600;
					font-size: 0.9rem;
				}

				.company {
					color: var(--muted);
				}

				.dot {
					opacity: 0.5;
					margin: 0 4px;
				}

				.date {
					color: var(--muted);
					font-size: 0.88rem;
				}

				.icon {
					width: 16px;
					height: 16px;
					display: inline-block;
					vertical-align: middle;
					color: var(--accent);
					flex-shrink: 0;
				}

				.company-icon {
					color: #0b1220;
					opacity: 0.14;
				}
				.calendar-icon {
					color: #0b1220;
					opacity: 0.12;
				}

				.xp-stats {
					display: flex;
					gap: 12px;
					align-items: center;
				}

				.stat {
					display: flex;
					gap: 8px;
					align-items: center;
					background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(243, 246, 255, 0.8));
					padding: 8px 10px;
					border-radius: 12px;
					border: 1px solid rgba(255, 255, 255, 0.6);
					box-shadow: 4px 4px 12px rgba(163, 177, 198, 0.04), -4px -4px 8px rgba(255, 255, 255, 0.9);
				}

				.stat-icon {
					width: 20px;
					height: 20px;
					color: var(--accent);
					opacity: 0.96;
				}
				.stat .stat-value {
					display: block;
					font-weight: 800;
					color: var(--text);
					font-size: 0.98rem;
					line-height: 1;
				}
				.stat .stat-label {
					display: block;
					font-size: 0.72rem;
					color: var(--muted);
					margin-top: 2px;
				}

				.xp-body {
					margin-top: 6px;
				}
				.xp-list {
					list-style: none;
					padding: 0;
					margin: 0;
					display: grid;
					gap: 8px;
				}

				.xp-item {
					display: flex;
					gap: 12px;
					align-items: flex-start;
					padding: 10px;
					border-radius: 12px;
					background: linear-gradient(180deg, #ffffff, #f6fbff);
					border: 1px solid rgba(255, 255, 255, 0.6);
					box-shadow: 6px 6px 16px rgba(2, 6, 23, 0.03), -6px -6px 12px rgba(255, 255, 255, 0.8);
				}

				.xp-item-left {
					width: 30px;
					display: flex;
					align-items: center;
					justify-content: center;
					color: var(--accent);
				}
				.xp-item-text {
					margin: 0;
					color: var(--text);
					font-size: 0.95rem;
					line-height: 1.4;
				}

				.mini-bar {
					margin-top: 8px;
				}
				.mini-track {
					height: 6px;
					background: linear-gradient(90deg, rgba(11, 17, 34, 0.06), rgba(11, 17, 34, 0.02));
					border-radius: 999px;
					overflow: hidden;
				}
				.mini-fill {
					height: 100%;
					background: linear-gradient(90deg, var(--accent), var(--accent-2));
					border-radius: 999px;
					box-shadow: 8px 8px 20px rgba(99, 102, 241, 0.06), -6px -6px 16px rgba(255, 255, 255, 0.9);
					transition: width 420ms cubic-bezier(0.2, 0.9, 0.3, 1);
				}

				/* Hover interactivity on item */
				.xp-item:hover {
					transform: translateY(-6px);
					box-shadow: 18px 18px 44px rgba(99, 102, 241, 0.06), inset 3px 3px 8px rgba(163, 177, 198, 0.04);
				}

				/* Dark mode */
				@media (prefers-color-scheme: dark) {
					:root {
						--neo-surface: #0b1220;
						--neo-surface-2: #071021;
						--muted: #94a3b8;
						--text: #e6eef8;
						--accent: #6366f1;
						--accent-2: #06b6d4;
					}
					.xp-card {
						background: linear-gradient(180deg, rgba(20, 28, 45, 0.9), rgba(10, 16, 28, 0.9));
						border: 1px solid rgba(255, 255, 255, 0.02);
						box-shadow: inset 6px 6px 12px rgba(0, 0, 0, 0.6), inset -6px -6px 12px rgba(255, 255, 255, 0.02);
					}
					.xp-sub,
					.date,
					.company {
						color: var(--muted);
					}
					.xp-item {
						background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
						border: 1px solid rgba(255, 255, 255, 0.02);
						box-shadow: none;
					}
					.xp-item-text {
						color: var(--text);
					}
					.mini-fill {
						box-shadow: none;
					}
					.stat {
						background: rgba(255, 255, 255, 0.02);
						border: 1px solid rgba(255, 255, 255, 0.02);
						box-shadow: none;
					}
				}

				/* Responsive */
				@media (max-width: 720px) {
					.xp-header {
						flex-direction: column;
						align-items: flex-start;
						gap: 10px;
					}
					.xp-stats {
						order: 3;
					}
					.stat {
						padding: 6px 8px;
					}
				}
			`}</style>
		</article>
	);
}
