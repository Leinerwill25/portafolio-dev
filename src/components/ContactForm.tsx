// src/components/ContactForm.tsx
'use client';
import React, { useEffect, useState } from 'react';

type FormState = { name: string; email: string; message: string };
type Notice = { type: 'success' | 'error'; text: string } | null;

function getErrorMessage(err: unknown): string {
	if (err instanceof Error) return err.message;
	try {
		return JSON.stringify(err);
	} catch {
		return String(err);
	}
}

export default function ContactForm() {
	const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
	const [sending, setSending] = useState(false);
	const [notice, setNotice] = useState<Notice>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setForm((p) => ({ ...p, [name]: value }));
	};

	const handleSubmit = async (ev: React.FormEvent) => {
		ev.preventDefault();
		setNotice(null);

		// Validación simple
		if (!form.name || !form.email || !form.message) {
			setNotice({ type: 'error', text: 'Todos los campos son obligatorios.' });
			return;
		}

		// Validación básica de email
		if (!/\S+@\S+\.\S+/.test(form.email)) {
			setNotice({ type: 'error', text: 'Por favor, ingresa un email válido.' });
			return;
		}

		setSending(true);

		// Helper local para convertir la respuesta parseada a string seguro
		const parsedToMessage = (p: unknown): string | null => {
			if (p == null) return null;
			if (typeof p === 'string') return p;
			if (typeof p === 'object') {
				// Si tiene campo 'error', úsalo
				const asRecord = p as Record<string, unknown>;
				if ('error' in asRecord) {
					const v = asRecord.error;
					if (typeof v === 'string') return v;
					try {
						return JSON.stringify(v);
					} catch {
						return String(v);
					}
				}
				// Si es objeto simple, intenta stringify
				try {
					return JSON.stringify(asRecord);
				} catch {
					return String(asRecord);
				}
			}
			// para otros tipos (number, boolean...)
			return String(p);
		};

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});

			// Intentamos parsear JSON; si falla, fallback a texto
			let parsed: unknown = null;
			try {
				parsed = await res.json();
			} catch {
				try {
					parsed = await res.text();
				} catch {
					parsed = null;
				}
			}

			if (!res.ok) {
				const bodyMessage = parsedToMessage(parsed);
				const errMsg = bodyMessage ?? `Error ${res.status}`;
				throw new Error(errMsg); // errMsg es siempre string aquí
			}

			setNotice({ type: 'success', text: 'Mensaje enviado. ¡Gracias!' });
			setForm({ name: '', email: '', message: '' });
		} catch (err: unknown) {
			const message = getErrorMessage(err);
			console.error('ContactForm submit error:', message);
			setNotice({ type: 'error', text: message || 'Error al enviar. Intenta más tarde.' });
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
				<button type="submit" className={`neo-minimal-btn ${sending ? 'loading' : ''} ${notice?.type === 'success' ? 'success' : ''}`} disabled={sending} aria-busy={sending} aria-live="polite">
					{/* Flecha: se oculta cuando loading o success */}
					<span className="icon-wrap" aria-hidden={sending || notice?.type === 'success' ? 'true' : 'false'}>
						<svg className="icon-arrow" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
							<path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
						</svg>
					</span>

					{/* Spinner: aparece SOLO cuando sending === true */}
					{sending && (
						<span className="spinner" role="status" aria-hidden={!sending}>
							<svg viewBox="0 0 50 50" width="20" height="20" aria-hidden="true">
								<circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" opacity="0.18" fill="none" />
								<path d="M45 25a20 20 0 00-6-14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
							</svg>
						</span>
					)}

					{/* Check: aparece SOLO cuando success AND not sending */}
					{notice?.type === 'success' && !sending && (
						<span className="check" aria-hidden="true">
							<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
								<path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</span>
					)}
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

				.neo-minimal-btn {
					position: relative;
					display: grid;
					place-items: center;
					width: 58px;
					height: 58px;
					border-radius: 18px;
					background: var(--surface);
					border: 1px solid rgba(255, 255, 255, 0.4);
					box-shadow: 6px 6px 12px rgba(163, 177, 198, 0.15), -6px -6px 12px rgba(255, 255, 255, 0.8);
					color: var(--text);
					cursor: pointer;
					transition: box-shadow 0.25s ease, transform 0.25s ease, background 0.25s ease;
					overflow: hidden; /* <-- importante para que nada "salga" fuera del botón */
					z-index: 0;
				}

				/* hover / active */
				.neo-minimal-btn:hover:not([disabled]) {
					transform: translateY(-3px);
					box-shadow: 8px 8px 20px rgba(163, 177, 198, 0.25), -8px -8px 20px rgba(255, 255, 255, 0.9);
				}
				.neo-minimal-btn:active:not([disabled]) {
					transform: translateY(1px);
					box-shadow: inset 4px 4px 8px rgba(163, 177, 198, 0.25), inset -4px -4px 8px rgba(255, 255, 255, 0.9);
				}

				/* Icon (arrow) - se oculta suavemente cuando loading o success */
				.icon-wrap {
					display: inline-grid;
					place-items: center;
					transition: opacity 180ms ease, transform 220ms ease;
				}
				.icon-wrap[aria-hidden='true'] {
					opacity: 0;
					transform: scale(0.95);
					pointer-events: none;
				}

				/* small arrow color + hover slide */
				.icon-arrow {
					color: var(--lilac-2);
					opacity: 0.95;
					transform: translateX(0);
					transition: transform 0.28s cubic-bezier(0.2, 0.9, 0.3, 1);
				}
				.neo-minimal-btn:hover .icon-arrow {
					transform: translateX(4px);
				}

				/* Spinner centered and small: limited to button area and above icon */
				.spinner {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 22px;
					height: 22px;
					display: grid;
					place-items: center;
					color: var(--lilac-2);
					z-index: 2;
					pointer-events: none;
					animation: spin 1s linear infinite;
				}
				@keyframes spin {
					to {
						transform: translate(-50%, -50%) rotate(360deg);
					}
				}

				/* Check small and centered (doesn't cover external elements) */
				.check {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 22px;
					height: 22px;
					display: grid;
					place-items: center;
					color: #047857; /* success green */
					z-index: 2;
					pointer-events: none;
					animation: pop 0.45s ease forwards;
				}
				@keyframes pop {
					0% {
						transform: translate(-50%, -50%) scale(0.8);
						opacity: 0;
					}
					60% {
						transform: translate(-50%, -50%) scale(1.12);
						opacity: 1;
					}
					100% {
						transform: translate(-50%, -50%) scale(1);
						opacity: 1;
					}
				}

				/* When success, adjust button bg/shadow slightly */
				.neo-minimal-btn.success {
					background: linear-gradient(180deg, #ecfdf5, #ccfbf1);
					color: #047857;
					box-shadow: 4px 4px 10px rgba(6, 95, 70, 0.12), -4px -4px 10px rgba(255, 255, 255, 0.9);
				}

				/* Disabled */
				.neo-minimal-btn[disabled] {
					opacity: 0.6;
					cursor: not-allowed;
				}

				/* Dark mode adjustments */
				@media (prefers-color-scheme: dark) {
					.neo-minimal-btn {
						background: #0d1220;
						color: #e6f6ff;
						border: 1px solid rgba(255, 255, 255, 0.05);
						box-shadow: 6px 6px 14px rgba(0, 0, 0, 0.6), -6px -6px 14px rgba(255, 255, 255, 0.02);
					}
					.spinner {
						color: var(--lilac-1);
					}
					.neo-minimal-btn.success {
						background: linear-gradient(180deg, #065f46, #10b981);
						color: #eafff4;
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
