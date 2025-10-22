// components/ProjectCard.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';

type Status = 'Producción' | 'En desarrollo' | 'Beta' | 'Arquivado';

type Props = {
	title: string;
	desc: string;
	tags?: string[];
	url?: string;
	status?: Status;
	useIcons?: boolean;
	iconBaseUrl?: string;
};

const TECH_META: Record<string, { label: string; color: string; initials: string }> = {
	'node.js': { label: 'Node.js', color: '#3C873A', initials: 'Nd' },
	node: { label: 'Node.js', color: '#3C873A', initials: 'Nd' },
	'next.js': { label: 'Next.js', color: '#6E22FF', initials: 'Nx' },
	next: { label: 'Next.js', color: '#6E22FF', initials: 'Nx' },
	react: { label: 'React', color: '#00C6FF', initials: 'Re' },
	typescript: { label: 'TypeScript', color: '#3178C6', initials: 'Ts' },
	prisma: { label: 'Prisma', color: '#6F46FF', initials: 'Pr' },
	mysql: { label: 'MySQL', color: '#264B80', initials: 'My' },
	docker: { label: 'Docker', color: '#2496ED', initials: 'Dk' },
	aws: { label: 'AWS', color: '#F58525', initials: 'AWS' },
	stripe: { label: 'Stripe', color: '#635BFF', initials: 'St' },
	tailwind: { label: 'Tailwind', color: '#06B6D4', initials: 'Tw' },
	csv: { label: 'CSV', color: '#9CA3AF', initials: 'CV' },
	api: { label: 'API', color: '#0EA5A0', initials: 'API' },
	supabase: { label: 'Supabase', color: '#3ECF8E', initials: 'Sb' },
	github: { label: 'GitHub', color: '#181717', initials: 'GH' },
	javascript: { label: 'JavaScript', color: '#F7DF1E', initials: 'Js' },
};

function techMeta(t: string) {
	const key = t.replace(/\s+|\/|\.|-/g, '').toLowerCase();
	return (
		TECH_META[key] ?? {
			label: t,
			color: '#7C8EA3',
			initials: t
				.split(/[\s./-]+/)
				.map((p) => (p ? p.trim()[0] : ''))
				.slice(0, 2)
				.join('')
				.toUpperCase(),
		}
	);
}

export default function ProjectCard({ title, desc, tags = [], url, status = 'En desarrollo', useIcons = false, iconBaseUrl }: Props) {
	return (
		<motion.article className="project-card" role="article" aria-labelledby={`proj-${slugify(title)}`} tabIndex={0} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} whileHover={{ translateY: -6, scale: 1.004 }} whileFocus={{ translateY: -6, scale: 1.004 }} transition={{ duration: 0.36, ease: [0.2, 0.9, 0.3, 1] }}>
			{/* Priority / status badge (top-right) */}
			<div className={`status-badge status-${slugify(status)}`} aria-hidden>
				<span className="status-dot" />
				<span className="status-text">{status}</span>
			</div>

			{/* inner wrapper with additional padding so content never touches the outer border */}
			<div className="card-inner" role="group" aria-label={title}>
				<div className="card-head">
					<div className="head-content">
						<h4 id={`proj-${slugify(title)}`} className="proj-title text-xl sm:text-2xl md:text-3xl font-bold text-neo-light mb-2">
							{title}
						</h4>
						<p className="proj-sub">Proyecto · Implementación técnica</p>
					</div>
				</div>

				<div className="proj-body" aria-hidden={false}>
					<p className="proj-desc">{desc}</p>

					<div className="proj-meta">
						<div className="meta-left">
							{/* placeholder for structured bullets or short summary */}
							<p className="proj-excerpt" />
						</div>

						<div className="meta-right" aria-hidden>
							<div className="mini-neo">
								<div className="mini-line" />
								<div className="mini-line short" />
								<div className="mini-dot" />
							</div>
						</div>
					</div>
				</div>

				<div className="card-foot">
					<ul className="proj-tags" role="list" aria-label={`Tecnologías utilizadas en ${title}`}>
						{tags.map((t) => {
							const meta = techMeta(t);
							const key = t.replace(/\s+|\/|\.|-/g, '').toLowerCase();
							const iconUrl = useIcons && iconBaseUrl ? `${iconBaseUrl}/${key}.svg` : null;

							return (
								<li key={t} className="proj-tag" tabIndex={0} aria-label={meta.label} title={meta.label}>
									<span className="tag-badge" aria-hidden="true" style={{ background: `linear-gradient(180deg, ${meta.color}33, ${meta.color}11)` }}>
										{iconUrl ? (
											<img src={iconUrl} alt="" className="tag-icon" aria-hidden="true" onError={(e) => (e.currentTarget.style.display = 'none')} />
										) : (
											<span className="tag-initials" style={{ background: meta.color }}>
												{meta.initials}
											</span>
										)}
									</span>
									<span className="tag-label">{meta.label}</span>
								</li>
							);
						})}
					</ul>

					<div className="actions">
						{url ? (
							<a className="project-link" href={url} target="_blank" rel="noopener noreferrer" aria-label={`Ver proyecto ${title} (se abre en nueva pestaña)`} title={url}>
								<span className="link-inner">
									Ver proyecto
									<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
										<path d="M14 3h7v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
										<path d="M10 14L21 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
										<path d="M21 21H3V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
									</svg>
								</span>
							</a>
						) : (
							<button className="project-ghost" type="button" aria-hidden="true" tabIndex={-1}>
								Más info
							</button>
						)}
					</div>
				</div>
			</div>

			<style jsx>{`
				:root {
					--card-a: #071032;
					--card-b: #041229;
					--muted: #9fb4d4;
					--muted-2: #cfe8ff;
					--accent-soft: #5b6bf7;
					--glass-border: rgba(100, 130, 160, 0.06);
				}

				.project-card {
					position: relative;
					border-radius: 18px;
					/* Slightly reduced outer padding in favor of inner padding for predictable spacing */
					padding: 18px;
					background: linear-gradient(180deg, var(--card-a), var(--card-b));
					border: 1px solid var(--glass-border);
					color: var(--muted-2);
					box-shadow: inset 6px 6px 16px rgba(2, 6, 18, 0.52), inset -6px -6px 14px rgba(18, 36, 58, 0.12), 12px 16px 34px rgba(2, 6, 18, 0.46);
					display: flex;
					flex-direction: column;
					gap: 16px;
					min-height: 170px;
					transition: box-shadow 0.22s ease, transform 0.22s cubic-bezier(0.2, 0.9, 0.3, 1);
					will-change: transform;
					overflow: visible;
					box-sizing: border-box;
				}

				/* Priority badge (top-right) */
				.status-badge {
					position: absolute;
					right: 14px;
					top: 12px;
					display: inline-flex;
					align-items: center;
					gap: 8px;
					padding: 6px 10px;
					border-radius: 999px;
					background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(10, 20, 34, 0.1));
					border: 1px solid rgba(255, 255, 255, 0.04);
					box-shadow: 4px 6px 14px rgba(2, 6, 18, 0.28), -4px -4px 10px rgba(18, 36, 58, 0.06);
					font-weight: 700;
					font-size: 12px;
					color: var(--muted-2);
				}
				.status-badge .status-dot {
					width: 10px;
					height: 10px;
					border-radius: 99px;
					box-shadow: 0 4px 8px rgba(0, 0, 0, 0.18);
					background: #f59e0b;
				}
				.status-enden-desarrollo .status-dot,
				.status-en-desarrollo .status-dot {
					background: #f59e0b;
				}
				.status-producción .status-dot,
				.status-produccion .status-dot {
					background: #10b981;
				}
				.status-beta .status-dot {
					background: #06b6d4;
				}
				.status-archivado .status-dot {
					background: #9ca3af;
				}

				/* inner layout: added padding to ensure content never touches the border */
				.card-inner {
					display: flex;
					flex-direction: column;
					gap: 14px;
					width: 100%;
					padding: 12px; /* inner padding for breathing room */
					border-radius: 12px;
					box-sizing: border-box;
					background: transparent;
				}

				.card-head {
					display: flex;
					gap: 14px;
					align-items: flex-start;
				}
				.accent {
					width: 12px;
					height: 52px;
					border-radius: 10px;
					background: linear-gradient(180deg, var(--accent-soft), #06b6d4);
					box-shadow: 0 10px 26px rgba(91, 107, 247, 0.1), 0 -6px 12px rgba(6, 182, 212, 0.03);
					flex-shrink: 0;
				}

				.head-content {
					display: flex;
					flex-direction: column;
					gap: 6px;
					min-width: 0;
				}
				.proj-title {
					margin: 0;
					font-size: 1.05rem;
					font-weight: 800;
					color: var(--muted-2);
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.proj-sub {
					margin: 0;
					font-size: 0.78rem;
					color: var(--muted);
					font-weight: 700;
					opacity: 0.9;
				}

				/* Body: description + meta row */
				.proj-body {
					display: flex;
					flex-direction: column;
					gap: 12px;
					padding: 6px 2px; /* subtle padding inside body */
				}

				.proj-desc {
					margin: 0;
					color: var(--muted);
					font-size: 0.98rem;
					line-height: 1.45;
					max-width: 72ch;
					opacity: 0.98;
					/* ensure text doesn't touch right edge on small screens */
					padding-right: 6px;
				}

				.proj-meta {
					display: flex;
					gap: 12px;
					align-items: center;
					justify-content: space-between;
					padding-top: 4px;
				}
				.meta-left {
					flex: 1;
					min-width: 0;
				}
				.meta-right {
					width: 72px;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.mini-neo {
					width: 64px;
					height: 48px;
					border-radius: 10px;
					background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(10, 20, 34, 0.08));
					box-shadow: inset 4px 4px 10px rgba(2, 6, 18, 0.28), inset -4px -4px 8px rgba(18, 36, 58, 0.06);
					padding: 8px;
					display: flex;
					flex-direction: column;
					gap: 6px;
					align-items: flex-start;
					justify-content: center;
				}
				.mini-line {
					height: 6px;
					width: 100%;
					background: rgba(255, 255, 255, 0.06);
					border-radius: 6px;
				}
				.mini-line.short {
					width: 60%;
				}
				.mini-dot {
					width: 8px;
					height: 8px;
					border-radius: 99px;
					background: rgba(255, 255, 255, 0.08);
				}

				.card-foot {
					display: flex;
					gap: 16px;
					align-items: center;
					justify-content: space-between;
					margin-top: auto;
					padding-top: 8px;
				}

				.proj-tags {
					display: flex;
					gap: 10px;
					flex-wrap: wrap;
					align-items: center;
					list-style: none;
					margin: 0;
					padding: 0;
				}

				.proj-tag {
					display: inline-flex;
					gap: 10px;
					align-items: center;
					padding: 8px 12px;
					border-radius: 999px;
					background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(10, 20, 34, 0.12));
					border: 1px solid rgba(255, 255, 255, 0.02);
					box-shadow: inset 3px 3px 8px rgba(2, 6, 18, 0.38), inset -3px -3px 8px rgba(18, 36, 58, 0.06);
					font-size: 13px;
					font-weight: 700;
					color: var(--muted-2);
					transition: transform 160ms ease, box-shadow 160ms ease;
					white-space: nowrap;
				}
				.proj-tag:focus,
				.proj-tag:hover {
					transform: translateY(-3px);
					box-shadow: inset 2px 2px 6px rgba(2, 6, 18, 0.45), 6px 8px 18px rgba(2, 6, 18, 0.12);
				}

				.tag-badge {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					width: 40px;
					height: 28px;
					border-radius: 10px;
					padding: 2px;
					flex-shrink: 0;
				}
				.tag-icon {
					width: 24px;
					height: 16px;
					object-fit: contain;
					display: block;
					filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.12));
				}
				.tag-initials {
					display: inline-grid;
					place-items: center;
					width: 30px;
					height: 22px;
					border-radius: 8px;
					color: #fff;
					font-weight: 800;
					font-size: 12px;
					box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
				}
				.tag-label {
					display: inline-block;
					color: var(--muted-2);
					max-width: 140px;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.actions {
					display: flex;
					gap: 10px;
					align-items: center;
				}
				.project-link,
				.project-ghost {
					display: inline-flex;
					align-items: center;
					gap: 10px;
					padding: 10px 16px;
					border-radius: 999px;
					font-weight: 800;
					font-size: 0.95rem;
					text-decoration: none;
					cursor: pointer;
					border: 1px solid rgba(255, 255, 255, 0.06);
					background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(10, 20, 34, 0.12));
					color: var(--muted-2);
					box-shadow: 8px 10px 26px rgba(2, 6, 18, 0.18), -6px -6px 12px rgba(18, 36, 58, 0.06);
					transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
				}
				.project-link:hover,
				.project-link:focus {
					transform: translateY(-5px) scale(1.01);
					box-shadow: 20px 22px 56px rgba(3, 10, 30, 0.6);
				}

				.project-ghost {
					opacity: 0.6;
					pointer-events: none;
				}

				/* responsive */
				@media (max-width: 640px) {
					.project-card {
						padding: 14px;
						min-height: 140px;
					}
					.card-inner {
						padding: 10px;
					}
					.accent {
						height: 42px;
						width: 10px;
					}
					.proj-tag {
						padding: 7px 10px;
						font-size: 12px;
					}
					.tag-badge {
						width: 34px;
						height: 24px;
					}
					.status-badge {
						right: 10px;
						top: 8px;
						padding: 5px 8px;
						font-size: 11px;
					}
				}

				/* light mode variant */
				@media (prefers-color-scheme: light) {
					:root {
						--card-a: #f3f6ff;
						--card-b: #ffffff;
						--muted: #475569;
						--muted-2: #0f172a;
					}
					.project-card {
						background: linear-gradient(180deg, var(--card-b), var(--card-a));
						color: var(--muted-2);
						border: 1px solid rgba(255, 255, 255, 0.6);
						box-shadow: inset 6px 6px 12px rgba(163, 177, 198, 0.08), inset -6px -6px 12px rgba(255, 255, 255, 0.95), 6px 6px 16px rgba(124, 139, 156, 0.08);
					}
					.proj-tag {
						background: linear-gradient(180deg, #fff, #f3f6ff);
						color: #334155;
						border: 1px solid rgba(255, 255, 255, 0.6);
					}
					.status-badge {
						background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(240, 243, 255, 0.9));
						color: #0f172a;
						border: 1px solid rgba(255, 255, 255, 0.6);
					}
				}

				@media (prefers-reduced-motion: reduce) {
					.project-card,
					.proj-tag,
					.project-link {
						transition: none !important;
					}
				}
			`}</style>
		</motion.article>
	);
}

function slugify(s: string) {
	return s
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]/g, '');
}
