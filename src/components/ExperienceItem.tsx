// components/ExperienceItem.tsx
'use client';
import React from 'react';

type Props = {
	title: string;
	company: string;
	dateRange?: string;
	bullets: string[];
};

function deriveImpactPct(bullets: string[]): number {
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
	if (/(reduci|optimi|mejor|aument|aceler)/i.test(text)) return 78;
	return 56;
}

function computeLengths(bullets: string[]) {
	const lens = bullets.map((b) => Math.min(1, b.length / 120));
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
									<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
										<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.12" />
										<path d="M9 12.5l1.8 1.8L15 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</span>
							</div>

							<div className="xp-item-main">
								<p className="xp-item-text">{b}</p>

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
					/* dark-first tokens to match blue-dark layout */
					--bg: #071022;
					--card-surface: linear-gradient(180deg, rgba(12, 18, 30, 0.95), rgba(6, 12, 22, 0.95));
					--card-edge: rgba(255, 255, 255, 0.02);
					--neo-text: #dceeff;
					--neo-muted: #8fa7c7;
					--accent: #7b82ff;
					--accent-2: #22c1d8;
					--shadow-dark-lg: rgba(2, 6, 18, 0.7);
					--shadow-light-lg: rgba(255, 255, 255, 0.03);
					--inner-shadow: rgba(0, 0, 0, 0.45);
				}

				/* principal card (dark friendly) */
				.xp-card {
					background: var(--card-surface);
					border-radius: 18px;
					padding: 18px;
					border: 1px solid rgba(255, 255, 255, 0.02);
					box-shadow: inset 6px 6px 18px rgba(0, 0, 0, 0.6), inset -6px -6px 18px rgba(255, 255, 255, 0.02), 8px 12px 28px rgba(0, 0, 0, 0.6);
					transition: transform 240ms cubic-bezier(0.2, 0.9, 0.3, 1), box-shadow 240ms ease;
				}
				/* hover: dark lift (NO white) */
				.xp-card:hover {
					transform: translateY(-8px);
					box-shadow: inset 4px 4px 12px rgba(0, 0, 0, 0.6), inset -3px -3px 10px rgba(255, 255, 255, 0.02), 22px 26px 60px rgba(0, 0, 0, 0.6), -6px -6px 24px rgba(255, 255, 255, 0.01);
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
					color: var(--neo-text);
					line-height: 1.05;
				}

				.xp-sub {
					margin-top: 6px;
					display: flex;
					gap: 8px;
					align-items: center;
					color: var(--neo-muted);
					font-weight: 600;
					font-size: 0.9rem;
				}

				.company {
					color: var(--neo-muted);
				}
				.dot {
					opacity: 0.5;
					margin: 0 4px;
				}
				.date {
					color: var(--neo-muted);
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
					color: rgba(123, 129, 255, 0.08);
					opacity: 0.9;
				}
				.calendar-icon {
					color: rgba(34, 193, 216, 0.06);
					opacity: 0.9;
				}

				.xp-stats {
					display: flex;
					gap: 12px;
					align-items: center;
				}

				/* stats: dark glass style (no white bg) */
				.stat {
					display: flex;
					gap: 8px;
					align-items: center;
					background: linear-gradient(180deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0));
					padding: 10px 12px;
					border-radius: 12px;
					border: 1px solid rgba(255, 255, 255, 0.02);
					box-shadow: inset 2px 2px 6px rgba(0, 0, 0, 0.6), inset -2px -2px 6px rgba(255, 255, 255, 0.01), 8px 10px 18px rgba(0, 0, 0, 0.45);
					color: var(--neo-text);
					transition: transform 180ms ease, box-shadow 180ms ease;
				}
				/* subtle stat hover (dark highlight) */
				.stat:hover {
					transform: translateY(-3px);
					box-shadow: inset 3px 3px 8px rgba(0, 0, 0, 0.65), inset -3px -3px 8px rgba(255, 255, 255, 0.01), 12px 14px 30px rgba(0, 0, 0, 0.6);
				}

				.stat-icon {
					width: 18px;
					height: 18px;
					color: var(--accent);
					opacity: 0.98;
				}
				.stat .stat-value {
					display: block;
					font-weight: 800;
					color: var(--neo-text);
					font-size: 0.98rem;
				}
				.stat .stat-label {
					display: block;
					font-size: 0.72rem;
					color: var(--neo-muted);
					margin-top: 2px;
				}

				.xp-body {
					margin-top: 8px;
				}
				.xp-list {
					list-style: none;
					padding: 0;
					margin: 0;
					display: grid;
					gap: 10px;
				}

				/* each responsibility item uses dark card look, NOT white */
				.xp-item {
					display: flex;
					gap: 12px;
					align-items: flex-start;
					padding: 12px 14px;
					border-radius: 12px;
					background: linear-gradient(180deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0));
					border: 1px solid rgba(255, 255, 255, 0.02);
					box-shadow: 6px 8px 18px rgba(0, 0, 0, 0.5), -4px -4px 12px rgba(255, 255, 255, 0.01), inset 2px 2px 6px rgba(0, 0, 0, 0.5);
					transition: transform 220ms cubic-bezier(0.2, 0.9, 0.3, 1), box-shadow 220ms ease;
				}
				/* hover: dark lift, subtle inner highlight (no white) */
				.xp-item:hover {
					transform: translateY(-5px);
					box-shadow: 14px 18px 40px rgba(0, 0, 0, 0.6), -10px -10px 30px rgba(255, 255, 255, 0.02), inset 3px 3px 8px rgba(0, 0, 0, 0.6);
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
					color: var(--neo-text);
					font-size: 0.95rem;
					line-height: 1.4;
				}

				.mini-bar {
					margin-top: 8px;
				}
				.mini-track {
					height: 7px;
					background: linear-gradient(90deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
					border-radius: 999px;
					overflow: hidden;
					box-shadow: inset 2px 2px 6px rgba(0, 0, 0, 0.6);
				}
				.mini-fill {
					height: 100%;
					background: linear-gradient(90deg, #00eaff, #7b2ff7, #ff00e0);
					border-radius: 999px;
					box-shadow: 0 0 14px rgba(123, 47, 247, 0.4), 0 0 28px rgba(0, 234, 255, 0.3);
					animation: flow 3s linear infinite;
					transition: width 420ms cubic-bezier(0.2, 0.9, 0.3, 1);
				}

				/* small responsive tweaks */
				@media (max-width: 720px) {
					.xp-header {
						flex-direction: column;
						gap: 10px;
						align-items: flex-start;
					}
					.xp-stats {
						order: 3;
						flex-wrap: wrap;
						gap: 8px;
					}
					.stat {
						padding: 8px 10px;
					}
				}
			`}</style>
		</article>
	);
}
