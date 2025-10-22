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
	const statusClass = `status-${slugify(status)}`;

	return (
		<motion.article className="project-card" role="article" aria-labelledby={`proj-${slugify(title)}`} tabIndex={0} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} whileHover={{ translateY: -8, scale: 1.01 }} whileFocus={{ translateY: -8, scale: 1.01 }} transition={{ duration: 0.32, ease: [0.2, 0.9, 0.3, 1] }}>
			<div className="card-inner" role="group" aria-label={title}>
				{/* HEAD: title + subtitle and right side status */}
				<header className="card-head">
					<div className="head-left">
						<div className="accent" aria-hidden />
						<div className="title-wrap">
							<h4 id={`proj-${slugify(title)}`} className="proj-title">
								{title}
							</h4>
							<p className="proj-sub">Proyecto · Implementación técnica</p>
						</div>
					</div>

					<div className={`status-wrap ${statusClass}`} aria-hidden>
						<span className="status-dot" />
						<span className="status-text">{status}</span>
					</div>
				</header>

				{/* BODY: description + mini preview */}
				<section className="proj-body">
					<p className="proj-desc">{desc}</p>

					<div className="meta-row" aria-hidden>
						<div className="meta-left">{/* reserved for short excerpt / metrics in the future */}</div>

						<div className="meta-right">
							<div className="mini-neo" aria-hidden>
								<div className="mini-line" />
								<div className="mini-line short" />
								<div className="mini-dot" />
							</div>
						</div>
					</div>
				</section>

				{/* FOOT: tags + actions */}
				<footer className="card-foot">
					<ul className="proj-tags" role="list" aria-label={`Tecnologías utilizadas en ${title}`}>
						{tags.map((t) => {
							const meta = techMeta(t);
							const key = t.replace(/\s+|\/|\.|-/g, '').toLowerCase();
							const iconUrl = useIcons && iconBaseUrl ? `${iconBaseUrl}/${key}.svg` : null;

							return (
								<li key={t} className="proj-tag" tabIndex={0} aria-label={meta.label} title={meta.label}>
									<span
										className="tag-badge"
										aria-hidden="true"
										style={{
											background: `linear-gradient(180deg, ${hexWithAlpha(meta.color, 0.16)}, ${hexWithAlpha(meta.color, 0.06)})`,
										}}>
										{iconUrl ? (
											// eslint-disable-next-line @next/next/no-img-element
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
								<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
									<path d="M14 3h7v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
									<path d="M10 14L21 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
									<path d="M21 21H3V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
								</svg>
								<span className="link-text">Ver proyecto</span>
							</a>
						) : (
							<button className="project-ghost" type="button" aria-hidden="true" tabIndex={-1}>
								Más info
							</button>
						)}
					</div>
				</footer>
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

				/* Outer card: deeper neumorphism but neutral so inner parts stand out */
				.project-card {
					position: relative;
					border-radius: 18px;
					padding: 8px;
					background: linear-gradient(180deg, var(--card-a), var(--card-b));
					border: 1px solid var(--glass-border);
					color: var(--muted-2);
					box-shadow: 20px 26px 56px rgba(2, 6, 18, 0.66), -12px -12px 36px rgba(18, 36, 58, 0.08), inset 8px 8px 20px rgba(2, 6, 18, 0.44), inset -6px -6px 14px rgba(18, 36, 58, 0.08);
					display: block;
					transition: transform 260ms cubic-bezier(0.2, 0.9, 0.3, 1), box-shadow 260ms ease;
					will-change: transform, box-shadow;
				}

				/* inner surface where content sits (lighter, elevated) */
				.card-inner {
					display: flex;
					flex-direction: column;
					gap: 14px;
					padding: 16px;
					border-radius: 12px;
					background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
					box-shadow: 8px 10px 26px rgba(2, 6, 18, 0.42), -6px -6px 16px rgba(18, 36, 58, 0.06), inset 3px 3px 10px rgba(0, 0, 0, 0.18), inset -3px -3px 10px rgba(255, 255, 255, 0.02);
				}

				/* === HEAD: grid layout to align left/right consistently === */
				.card-head {
					display: grid;
					grid-template-columns: 1fr auto;
					gap: 12px;
					align-items: start;
				}

				.head-left {
					display: flex;
					gap: 12px;
					align-items: flex-start;
					min-width: 0;
				}

				.accent {
					width: 12px;
					height: 52px;
					border-radius: 10px;
					background: linear-gradient(180deg, var(--accent-soft), #06b6d4);
					box-shadow: 0 10px 26px rgba(91, 107, 247, 0.12), 0 -6px 12px rgba(6, 182, 212, 0.03);
					flex-shrink: 0;
				}

				.title-wrap {
					display: flex;
					flex-direction: column;
					gap: 6px;
					min-width: 0;
				}

				.proj-title {
					margin: 0;
					font-weight: 800;
					font-size: 1.05rem;
					line-height: 1.06;
					color: var(--muted-2);
					word-break: break-word;
				}

				.proj-sub {
					margin: 0;
					font-size: 0.82rem;
					color: var(--muted);
					font-weight: 700;
					opacity: 0.95;
				}

				/* status area (now within flow, right aligned) */
				.status-wrap {
					display: inline-flex;
					align-items: center;
					gap: 10px;
					padding: 6px 10px;
					border-radius: 999px;
					background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(10, 20, 34, 0.06));
					border: 1px solid rgba(255, 255, 255, 0.02);
					box-shadow: 8px 10px 26px rgba(2, 6, 18, 0.18), -6px -6px 12px rgba(18, 36, 58, 0.06);
					font-weight: 700;
					font-size: 12px;
					color: var(--muted-2);
					min-width: 108px;
					justify-content: center;
				}

				.status-dot {
					width: 10px;
					height: 10px;
					border-radius: 50%;
					background: #f59e0b;
					box-shadow: 0 4px 8px rgba(0, 0, 0, 0.28);
				}
				.status-produccion .status-dot,
				.status-producción .status-dot {
					background: #10b981;
				}
				.status-en-desarrollo .status-dot {
					background: #f59e0b;
				}
				.status-beta .status-dot {
					background: #06b6d4;
				}
				.status-archivado .status-dot,
				.status-arquivado .status-dot {
					background: #9ca3af;
				}

				/* === BODY === */
				.proj-body {
					display: flex;
					flex-direction: column;
					gap: 12px;
				}

				.proj-desc {
					margin: 0;
					color: var(--muted);
					font-size: 0.98rem;
					line-height: 1.55;
				}

				.meta-row {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.meta-right {
					display: flex;
					align-items: center;
					gap: 8px;
				}

				/* mini preview cube (neumorphic) */
				.mini-neo {
					width: 78px;
					height: 48px;
					border-radius: 12px;
					padding: 8px;
					display: flex;
					flex-direction: column;
					gap: 6px;
					justify-content: center;
					background: linear-gradient(180deg, rgba(255, 255, 255, 0.018), rgba(10, 20, 34, 0.06));
					box-shadow: inset 4px 4px 10px rgba(2, 6, 18, 0.28), inset -4px -4px 8px rgba(18, 36, 58, 0.06), 6px 8px 20px rgba(2, 6, 18, 0.24);
				}
				.mini-line {
					height: 6px;
					width: 100%;
					border-radius: 6px;
					background: linear-gradient(90deg, rgba(99, 102, 241, 0.06), rgba(6, 182, 212, 0.04));
				}
				.mini-line.short {
					width: 62%;
				}
				.mini-dot {
					width: 8px;
					height: 8px;
					border-radius: 999px;
					background: rgba(99, 102, 241, 0.08);
				}

				/* === FOOT (tags + actions) === */
				.card-foot {
					display: flex;
					gap: 12px;
					justify-content: space-between;
					align-items: center;
					border-top: 1px solid rgba(255, 255, 255, 0.02);
					padding-top: 12px;
				}

				.proj-tags {
					display: flex;
					gap: 10px;
					flex-wrap: wrap;
					align-items: center;
					margin: 0;
					padding: 0;
					list-style: none;
				}

				.proj-tag {
					display: inline-flex;
					gap: 8px;
					align-items: center;
					padding: 8px 10px;
					border-radius: 999px;
					background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(10, 20, 34, 0.06));
					border: 1px solid rgba(255, 255, 255, 0.02);
					box-shadow: inset 3px 3px 8px rgba(2, 6, 18, 0.38), inset -3px -3px 8px rgba(18, 36, 58, 0.06);
					font-size: 13px;
					font-weight: 700;
					color: var(--muted-2);
				}

				.tag-badge {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					width: 36px;
					height: 26px;
					border-radius: 8px;
					padding: 2px;
					flex-shrink: 0;
				}

				.tag-icon {
					width: 22px;
					height: 14px;
					object-fit: contain;
					display: block;
				}

				.tag-initials {
					display: inline-grid;
					place-items: center;
					width: 28px;
					height: 20px;
					border-radius: 6px;
					color: #fff;
					font-weight: 800;
					font-size: 11px;
					box-shadow: 0 6px 10px rgba(0, 0, 0, 0.12);
				}

				.tag-label {
					display: inline-block;
					color: var(--muted-2);
					max-width: 120px;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.actions {
					display: flex;
					gap: 8px;
					align-items: center;
				}

				.project-link {
					display: inline-flex;
					gap: 8px;
					align-items: center;
					padding: 8px 12px;
					border-radius: 10px;
					font-weight: 700;
					font-size: 0.92rem;
					text-decoration: none;
					cursor: pointer;
					border: 1px solid rgba(255, 255, 255, 0.06);
					background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(10, 20, 34, 0.08));
					color: var(--muted-2);
					box-shadow: 8px 10px 20px rgba(2, 6, 18, 0.18), -6px -6px 12px rgba(18, 36, 58, 0.06);
				}

				.project-link svg {
					opacity: 0.95;
				}

				.project-link:hover {
					transform: translateY(-4px);
					box-shadow: 24px 26px 66px rgba(3, 10, 30, 0.6);
				}

				.project-ghost {
					opacity: 0.6;
					pointer-events: none;
					padding: 8px 12px;
					border-radius: 10px;
					background: transparent;
					border: none;
					color: var(--muted-2);
				}

				/* responsive */
				@media (max-width: 720px) {
					.card-head {
						grid-template-columns: 1fr;
					}
					.status-wrap {
						justify-self: start;
					}
					.mini-neo {
						width: 64px;
						height: 40px;
					}
					.proj-desc {
						font-size: 0.96rem;
					}
					.tag-label {
						max-width: 90px;
					}
				}

				/* light mode */
				@media (prefers-color-scheme: light) {
					:root {
						--card-a: #f3f6ff;
						--card-b: #ffffff;
						--muted: #475569;
						--muted-2: #0f172a;
					}
					.project-card {
						background: linear-gradient(180deg, var(--card-b), var(--card-a));
						box-shadow: inset 6px 6px 12px rgba(163, 177, 198, 0.08), inset -6px -6px 12px rgba(255, 255, 255, 0.95), 6px 6px 16px rgba(124, 139, 156, 0.08);
						color: var(--muted-2);
					}
					.card-inner {
						background: linear-gradient(180deg, #ffffff, #f3f6ff);
					}
					.proj-tag {
						background: linear-gradient(180deg, #fff, #f3f6ff);
						color: #334155;
					}
				}

				@media (prefers-reduced-motion: reduce) {
					.project-card,
					.project-link {
						transition: none !important;
					}
				}
			`}</style>
		</motion.article>
	);
}

/* helpers */
function slugify(s: string) {
	return s
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]/g, '');
}

/** convierte hex a rgba con alpha */
function hexWithAlpha(hex: string, alpha = 0.12) {
	try {
		const h = hex.replace('#', '');
		const full =
			h.length === 3
				? h
						.split('')
						.map((c) => c + c)
						.join('')
				: h;
		const bigint = parseInt(full, 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	} catch {
		return `rgba(124,139,156,${alpha})`;
	}
}
