// src/components/ContactSection.tsx
'use client';
import React, { useState, useEffect } from 'react';

type FormState = { name: string; email: string; message: string };

export default function ContactSection() {
	const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
	const [sending, setSending] = useState(false);
	const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setForm((p) => ({ ...p, [name]: value }));
	};

	const handleSubmit = async (ev: React.FormEvent) => {
		ev.preventDefault();
		setNotice(null);
		if (!form.name || !form.email || !form.message) {
			setNotice({ type: 'error', text: 'Todos los campos son obligatorios.' });
			return;
		}

		setSending(true);
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});

			const json = await res.json().catch(() => null);
			if (!res.ok) {
				// intenta leer mensaje desde body
				const errMsg = (json && json.error) || (typeof json === 'string' && json) || 'Error al enviar. Intenta más tarde.';
				throw new Error(errMsg);
			}

			setNotice({ type: 'success', text: 'Mensaje enviado. ¡Gracias!' });
			setForm({ name: '', email: '', message: '' });
		} catch (err: any) {
			console.error('Contact submit error', err);
			setNotice({ type: 'error', text: err?.message || 'Error al enviar. Intenta más tarde.' });
		} finally {
			setSending(false);
		}
	};

	useEffect(() => {
		if (!notice) return;
		const t = setTimeout(() => setNotice(null), notice.type === 'success' ? 4200 : 6000);
		return () => clearTimeout(t);
	}, [notice]);

	return (
		<form className="contact-card" onSubmit={handleSubmit} aria-label="Formulario de contacto">
			<div className="head">
				<div>
					<h3 className="title">Contacto</h3>
					<p className="sub">Escríbeme — responderé lo antes posible</p>
				</div>
				<div className="avatar" aria-hidden />
			</div>

			<div className="fields">
				<label className="sr-only" htmlFor="name">
					Nombre
				</label>
				<input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Nombre" aria-label="Nombre" className="input" />

				<label className="sr-only" htmlFor="email">
					Email
				</label>
				<input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" aria-label="Email" className="input" />

				<label className="sr-only" htmlFor="message">
					Mensaje
				</label>
				<textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Tu mensaje" aria-label="Mensaje" className="textarea" rows={4} />
			</div>

			<div className="footer">
				<button type="submit" className={`neo-cta-futuristic ${sending ? 'loading' : ''} ${notice?.type === 'success' ? 'success' : ''}`} disabled={sending} aria-busy={sending} aria-live="polite">
					<span className="neo-border" aria-hidden />

					<span className="neo-inner" aria-hidden={sending}>
						<svg className="icon-plane" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
							<path d="M2 21l20-9L2 3l6 7-6 11z" fill="currentColor" opacity="0.95" />
						</svg>
						<span className="label">{sending ? 'Enviando' : notice?.type === 'success' ? 'Enviado' : 'Enviar'}</span>
						<svg className="icon-arrow" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
							<path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
						</svg>
					</span>

					<span className="neo-spinner" aria-hidden={!sending}>
						<svg viewBox="0 0 50 50" width="20" height="20" aria-hidden="true">
							<circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" strokeOpacity="0.14" fill="none" />
							<path d="M45 25a20 20 0 00-6-14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
						</svg>
					</span>

					<span className="neo-success" aria-hidden={!(notice?.type === 'success')}>
						<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
							<path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</span>
				</button>
			</div>

			{notice && <div className={`alert ${notice.type}`}>{notice.text}</div>}

			<style jsx>{`
				:root {
					--surface: #f8fbfd;
					--shadow-dark: rgba(124, 139, 156, 0.16);
					--shadow-light: rgba(255, 255, 255, 0.95);
					--lilac-1: #c9a6ff;
					--lilac-2: #a17bff;
					--muted: #6b6b6b;
					--text: #0f172a;
					--btn-height: 52px;
				}

				.contact-card {
					background: linear-gradient(180deg, var(--surface), #eef6fb);
					border-radius: 20px;
					padding: 16px;
					border: 1px solid rgba(255, 255, 255, 0.6);
					box-shadow: inset 6px 6px 14px rgba(163, 177, 198, 0.08), inset -6px -6px 14px rgba(255, 255, 255, 0.95), 6px 6px 16px var(--shadow-dark), -6px -6px 16px var(--shadow-light);
				}

				.head {
					display: flex;
					justify-content: space-between;
					gap: 8px;
					align-items: center;
					margin-bottom: 12px;
				}
				.title {
					margin: 0;
					font-size: 16px;
					font-weight: 600;
					color: var(--text);
				}
				.sub {
					margin: 2px 0 0 0;
					font-size: 12px;
					color: var(--muted);
				}

				.avatar {
					width: 40px;
					height: 40px;
					border-radius: 10px;
					background: linear-gradient(180deg, #ffffff, #efeef3);
					box-shadow: 6px 6px 12px rgba(209, 205, 199, 0.14), -6px -6px 12px rgba(255, 255, 255, 0.9);
					flex-shrink: 0;
				}

				.fields {
					display: flex;
					flex-direction: column;
					gap: 10px;
					margin-bottom: 12px;
				}

				.input {
					width: 100%;
					height: 56px;
					padding: 10px 16px;
					border-radius: 9999px;
					background: var(--surface);
					border: 1px solid rgba(255, 255, 255, 0.6);
					box-shadow: inset 6px 6px 14px rgba(209, 205, 199, 0.45), inset -6px -6px 14px rgba(255, 255, 255, 0.9);
					color: var(--text);
					font-size: 14px;
					transition: box-shadow 0.18s ease, transform 0.14s ease;
				}

				.textarea {
					min-height: 96px;
					padding: 12px 16px;
					border-radius: 16px;
					background: var(--surface);
					border: 1px solid rgba(255, 255, 255, 0.6);
					box-shadow: inset 6px 6px 14px rgba(209, 205, 199, 0.45), inset -6px -6px 14px rgba(255, 255, 255, 0.9);
					color: var(--text);
					resize: none;
					font-size: 14px;
				}

				.input:focus,
				.textarea:focus {
					outline: none;
					transform: translateY(-1px);
					box-shadow: 0 10px 30px rgba(161, 123, 255, 0.08), inset 3px 3px 8px rgba(209, 205, 199, 0.25), inset -3px -3px 8px rgba(255, 255, 255, 0.9);
					border: 1px solid rgba(161, 123, 255, 0.18);
				}

				.footer {
					display: flex;
					gap: 12px;
					align-items: center;
					justify-content: space-between;
				}

				/* ---------------- neo-cta-futuristic (new) ---------------- */
				.neo-cta-futuristic {
					--h: 54px;
					position: relative;
					display: inline-grid;
					align-items: center;
					grid-auto-flow: column;
					gap: 12px;
					min-width: 170px;
					height: var(--h);
					padding: 0 20px;
					border-radius: 14px;
					background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(10, 12, 20, 0.02));
					color: #eaf6ff;
					cursor: pointer;
					border: none;
					overflow: visible;
					-webkit-tap-highlight-color: transparent;
					transition: transform 220ms cubic-bezier(0.2, 0.9, 0.3, 1), box-shadow 220ms ease, filter 220ms ease;
					box-shadow: 8px 10px 24px rgba(2, 8, 20, 0.42), -6px -6px 16px rgba(255, 255, 255, 0.02), inset 1px 1px 0 rgba(255, 255, 255, 0.02);
				}

				/* animated border (pseudo-element style but using inner span .neo-border to keep styled-jsx safe) */
				.neo-cta-futuristic .neo-border {
					position: absolute;
					inset: -2px;
					border-radius: 16px;
					padding: 2px;
					background: linear-gradient(90deg, rgba(99, 102, 241, 0.9), rgba(6, 182, 212, 0.85), rgba(99, 102, 241, 0.9));
					-webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
					-webkit-mask-composite: xor;
					mask-composite: exclude;
					animation: border-slide 3.5s linear infinite;
					filter: blur(8px);
					opacity: 0.85;
					pointer-events: none;
					z-index: 0;
				}
				@keyframes border-slide {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}

				/* inner content sits above border */
				.neo-cta-futuristic .neo-inner {
					display: inline-flex;
					gap: 10px;
					align-items: center;
					z-index: 1;
					transform: translateZ(0);
				}

				.neo-cta-futuristic .icon-plane {
					color: #bfe9ff;
					opacity: 0.95;
				}
				.neo-cta-futuristic .icon-arrow {
					color: #bfe9ff;
					opacity: 0.9;
				}

				.neo-cta-futuristic .label {
					font-weight: 800;
					font-size: 14px;
					letter-spacing: 0.01em;
					color: #e6f6ff;
				}

				/* hover: neon glow + lift + slight skew for futuristic feel */
				.neo-cta-futuristic:hover:not([disabled]) {
					transform: translateY(-6px) scale(1.02) perspective(600px) rotateX(1deg);
					box-shadow: 22px 24px 60px rgba(3, 10, 30, 0.6), -12px -12px 30px rgba(10, 20, 36, 0.06), inset 0 0 30px rgba(99, 102, 241, 0.06);
					filter: saturate(1.05);
				}

				/* loading state: dim inner, show spinner */
				.neo-cta-futuristic.loading {
					cursor: progress;
					transform: none;
				}
				.neo-cta-futuristic .neo-spinner {
					position: absolute;
					left: 12px;
					top: 50%;
					transform: translateY(-50%) scale(0.9);
					z-index: 2;
					opacity: 0;
					transition: opacity 160ms ease, transform 160ms ease;
					color: #e6f6ff;
				}
				.neo-cta-futuristic.loading .neo-spinner {
					opacity: 1;
					transform: translateY(-50%) scale(1);
					animation: spin 900ms linear infinite;
				}
				@keyframes spin {
					to {
						transform: translateY(-50%) rotate(360deg);
					}
				}

				/* success state: green pulse + icon */
				.neo-cta-futuristic.success {
					box-shadow: 0 8px 30px rgba(6, 95, 70, 0.12), inset 0 0 28px rgba(6, 95, 70, 0.04);
					transform: translateY(-4px);
				}
				.neo-cta-futuristic.success .neo-success {
					position: absolute;
					right: 12px;
					top: 50%;
					transform: translateY(-50%) scale(1);
					color: #eafff4;
					z-index: 2;
					opacity: 1;
					animation: success-pulse 1200ms ease;
				}
				@keyframes success-pulse {
					0% {
						transform: translateY(-50%) scale(0.8);
						opacity: 0;
					}
					40% {
						transform: translateY(-50%) scale(1.15);
						opacity: 1;
					}
					100% {
						transform: translateY(-50%) scale(1);
						opacity: 1;
					}
				}

				/* ripple effect element */
				.neo-cta-futuristic .ripple {
					position: absolute;
					width: 12px;
					height: 12px;
					background: rgba(255, 255, 255, 0.12);
					border-radius: 50%;
					transform: translate(-50%, -50%) scale(0.6);
					pointer-events: none;
					animation: ripple 600ms cubic-bezier(0.2, 0.9, 0.3, 1);
					z-index: 2;
					mix-blend-mode: screen;
				}
				@keyframes ripple {
					to {
						transform: translate(-50%, -50%) scale(10);
						opacity: 0;
					}
				}

				/* disabled visual */
				.neo-cta-futuristic[disabled] {
					opacity: 0.6;
					cursor: not-allowed;
					transform: none !important;
					filter: grayscale(0.08);
				}

				/* focus ring for keyboard */
				.neo-cta-futuristic:focus {
					outline: none;
					box-shadow: 0 0 0 6px rgba(99, 102, 241, 0.08), 0 12px 30px rgba(3, 10, 30, 0.5);
				}

				/* small screen adjustments */
				@media (max-width: 420px) {
					.neo-cta-futuristic {
						min-width: 140px;
						padding: 0 14px;
						--h: 48px;
						border-radius: 12px;
					}
					.neo-cta-futuristic .label {
						font-size: 13px;
					}
				}

				/* ---------- CTA (improved) ---------- */
				.cta {
					--btn-h: var(--btn-height);
					position: relative;
					display: inline-grid;
					grid-auto-flow: column;
					gap: 12px;
					align-items: center;
					justify-items: center;
					align-content: center;
					min-width: 160px;
					height: var(--btn-h);
					padding: 0 18px;
					border-radius: 9999px;
					font-weight: 800;
					color: #081026;
					background: linear-gradient(180deg, var(--lilac-1), var(--lilac-2));
					border: 1px solid rgba(255, 255, 255, 0.25);
					box-shadow: 8px 12px 28px rgba(161, 123, 255, 0.14), -8px -8px 20px rgba(255, 255, 255, 0.88);
					cursor: pointer;
					transition: transform 180ms cubic-bezier(0.2, 0.9, 0.3, 1), box-shadow 180ms ease, filter 180ms ease;
					overflow: hidden;
				}

				/* inner layout */
				.cta-inner {
					display: inline-flex;
					gap: 10px;
					align-items: center;
					transform: translateZ(0);
					will-change: transform;
				}

				.cta-icon svg {
					display: block;
					width: 18px;
					height: 18px;
					color: inherit;
					opacity: 0.98;
				}

				.cta-label {
					font-size: 14px;
					letter-spacing: 0.02em;
				}

				/* subtle hover / micro-lift */
				.cta:hover:not([disabled]) {
					transform: translateY(-4px) scale(1.01);
					box-shadow: 18px 20px 44px rgba(161, 123, 255, 0.14), -12px -12px 28px rgba(255, 255, 255, 0.85);
					filter: saturate(1.02);
				}

				/* focus ring */
				.cta:focus {
					outline: none;
					box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12), 12px 14px 36px rgba(161, 123, 255, 0.08);
				}

				/* pressed */
				.cta:active:not([disabled]) {
					transform: translateY(-1px) scale(0.997);
				}

				/* disabled */
				.cta[disabled] {
					opacity: 0.66;
					cursor: not-allowed;
					transform: none;
					box-shadow: inset 4px 4px 12px rgba(0, 0, 0, 0.04);
				}

				/* spinner (appears during sending) */
				.cta-spinner {
					position: absolute;
					left: 12px;
					top: 50%;
					transform: translateY(-50%);
					display: inline-grid;
					place-items: center;
					color: #081026;
					opacity: 0;
					transition: opacity 160ms ease, transform 160ms ease;
				}
				.cta.is-loading .cta-spinner {
					opacity: 1;
					transform: translateY(-50%) translateX(0);
					animation: spin 900ms linear infinite;
				}
				@keyframes spin {
					to {
						transform: translateY(-50%) rotate(360deg);
					}
				}

				/* hide the default inner while loading? we just show both but style accordingly */
				.cta.is-loading .cta-inner {
					opacity: 0.12;
				}

				/* success check */
				.cta-check {
					position: absolute;
					right: 12px;
					top: 50%;
					transform: translateY(-50%) scale(0.85);
					color: #062f2f;
					opacity: 0;
					transition: opacity 220ms ease, transform 220ms cubic-bezier(0.2, 0.9, 0.3, 1);
				}
				.cta.is-success {
					background: linear-gradient(180deg, #e6fffa, #ccfbf1);
					color: #04403a;
					box-shadow: 8px 12px 28px rgba(6, 176, 144, 0.06), -8px -8px 20px rgba(255, 255, 255, 0.88);
				}
				.cta.is-success .cta-check {
					opacity: 1;
					transform: translateY(-50%) scale(1);
				}
				.cta.is-success .cta-inner {
					opacity: 0.14;
				}

				/* small hint / note area */
				.note {
					width: 140px;
					text-align: right;
					font-size: 12px;
					color: var(--muted);
				}
				.hint {
					color: var(--muted);
				}

				.alert {
					padding: 6px 8px;
					border-radius: 8px;
					font-size: 12px;
				}
				.alert.success {
					background: #ecfdf5;
					color: #065f46;
				}
				.alert.error {
					background: #fff1f2;
					color: #b91c1c;
				}

				/* Responsiveness */
				@media (max-width: 420px) {
					.cta {
						min-width: 124px;
						padding: 0 12px;
						--btn-height: 44px;
					}
					.note {
						width: 110px;
						font-size: 11px;
					}
				}

				/* Dark mode variant for the form/card and CTA */
				@media (prefers-color-scheme: dark) {
					:root {
						--surface: #0b1220;
						--text: #e6eef8;
						--muted: #94a3b8;
					}
					.contact-card {
						background: linear-gradient(180deg, var(--surface), #071021);
						border: 1px solid rgba(255, 255, 255, 0.02);
						box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.6), -6px -6px 16px rgba(255, 255, 255, 0.02);
					}

					.avatar {
						background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
						box-shadow: inset 4px 4px 10px rgba(0, 0, 0, 0.6);
					}

					.input,
					.textarea {
						background: var(--surface);
						box-shadow: inset 6px 6px 12px rgba(0, 0, 0, 0.6), inset -6px -6px 12px rgba(255, 255, 255, 0.02);
						color: var(--text);
						border: 1px solid rgba(255, 255, 255, 0.02);
					}

					.cta {
						color: #0b1220;
						background: linear-gradient(180deg, #6366f1, #06b6d4);
						box-shadow: 8px 12px 28px rgba(99, 102, 241, 0.12), -8px -8px 20px rgba(255, 255, 255, 0.02);
					}

					.cta.is-success {
						background: linear-gradient(180deg, #065f46, #10b981);
						color: #e6fff9;
						box-shadow: 8px 12px 28px rgba(6, 95, 70, 0.12), -8px -8px 20px rgba(255, 255, 255, 0.02);
					}

					.cta-spinner,
					.cta-check {
						color: #0b1220;
					}
				}

				/* Respect reduced motion */
				@media (prefers-reduced-motion: reduce) {
					.cta,
					.cta-inner,
					.cta-spinner,
					.cta-check {
						transition: none !important;
						animation: none !important;
					}
				}
			`}</style>
		</form>
	);
}
