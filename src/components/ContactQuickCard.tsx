'use client';

import React from 'react';
import { FiMail, FiPhone } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { FaWhatsapp, FaGithub, FaInstagram } from 'react-icons/fa';

type Props = {
	email?: string;
	phone?: string;
	addressLines?: string[];
	whatsapp?: string; // e.g. "584242070878"
	github?: string; // e.g. "username"
	instagram?: string; // e.g. "username"
};

export default function ContactCard({ email = 'leinerwill25@gmail.com', phone = '+58 424 2070878', addressLines = ['Av. San Martin, Capuchino', 'Parroquia San Juan'], whatsapp = '584242070878', github = 'leinerwill25', instagram = 'syncwave_agency' }: Props) {
	// Combine address lines into one string to allow wrapping and clamping
	const fullAddress = addressLines.filter(Boolean).join(', ');

	return (
		<aside className="contact-card neo-card u-card-padding-sm" aria-labelledby="contact-quick-title">
			<h4 id="contact-quick-title" className="title">
				Contacto rápido
			</h4>

			<address className="contact-body" aria-label="Información de contacto">
				<a className="contact-line" href={`mailto:${email}`} aria-label={`Enviar correo a ${email}`}>
					<span className="icon-wrap" aria-hidden="true">
						<FiMail />
					</span>
					<span className="contact-text single-line">{email}</span>
				</a>

				<a className="contact-line" href={`tel:${phone.replace(/\s+/g, '')}`} aria-label={`Llamar a ${phone}`}>
					<span className="icon-wrap" aria-hidden="true">
						<FiPhone />
					</span>
					<span className="contact-text single-line">{phone}</span>
				</a>

				<div className="contact-line contact-address" aria-label={`Dirección: ${fullAddress}`}>
					<span className="icon-wrap" aria-hidden="true">
						<HiOutlineLocationMarker />
					</span>

					{/* Address text: permite hasta 2 líneas y luego muestra ellipsis */}
					<span className="contact-text address-clamp" title={fullAddress}>
						{fullAddress}
					</span>
				</div>
			</address>

			<nav className="socials" aria-label="Redes sociales">
				<a className="social social-whatsapp" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp">
					<FaWhatsapp />
				</a>

				<a className="social social-github" href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer" aria-label="Abrir GitHub">
					<FaGithub />
				</a>

				<a className="social social-instagram" href={`https://www.instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" aria-label="Abrir Instagram">
					<FaInstagram />
				</a>
			</nav>

			<style jsx>{`
				.contact-card {
					min-width: 220px;
					display: flex;
					flex-direction: column;
					gap: 12px;
					background: linear-gradient(180deg, rgba(6, 16, 28, 0.9), rgba(8, 20, 36, 0.95));
					border: 1px solid rgba(80, 110, 135, 0.08);
					color: var(--muted-300, #cfe8ff);
					border-radius: 16px;
					padding: 14px;
					box-shadow: inset 6px 6px 12px rgba(2, 8, 20, 0.45), inset -6px -6px 12px rgba(12, 28, 44, 0.12), 10px 10px 24px rgba(2, 6, 18, 0.5);
				}

				.title {
					margin: 0;
					font-weight: 700;
					color: var(--muted-300, #cfe8ff);
					font-size: 1rem;
				}

				.contact-body {
					display: flex;
					flex-direction: column;
					gap: 8px;
					color: var(--muted-300, #cfe8ff);
					font-size: 0.95rem;
					line-height: 1.3;
				}

				.contact-line {
					display: flex;
					gap: 10px;
					align-items: center;
					color: var(--muted-300, #cfe8ff);
					text-decoration: none;
					transition: transform 140ms ease, opacity 140ms ease;
				}

				.contact-line:hover,
				.contact-line:focus {
					transform: translateY(-3px);
					opacity: 0.95;
				}

				.icon-wrap {
					width: 18px;
					height: 18px;
					display: inline-grid;
					place-items: center;
					color: var(--muted-300, #cfe8ff);
					flex-shrink: 0;
					opacity: 0.95;
				}

				/* Adjust react-icons size via font-size */
				.icon-wrap :global(svg) {
					width: 18px;
					height: 18px;
					display: block;
				}

				/* Default single-line items (email, phone) keep nowrap + ellipsis */
				.contact-text {
					display: inline-block;
					color: var(--muted-300, #cfe8ff);
					font-weight: 600;
					font-size: 0.92rem;
				}

				.single-line {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					max-width: calc(100% - 28px); /* leave space for icon */
				}

				/* ADDRESS: allow wrapping up to 2 lines, then ellipsis */
				.contact-address .address-clamp {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2; /* <= 2 lines */
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: normal; /* allow wrapping */
					font-weight: 500;
					color: var(--muted-400, #9fb4d4);
					max-width: calc(100% - 28px); /* reserve space for icon */
					line-height: 1.25;
				}

				/* Small tweak: if the card is narrow, allow 2 lines but slightly smaller font */
				@media (max-width: 420px) {
					.contact-card {
						padding: 12px;
					}
					.contact-address .address-clamp {
						font-size: 0.88rem;
					}
				}

				.socials {
					display: flex;
					gap: 10px;
					align-items: center;
					justify-content: flex-start;
					margin-top: 6px;
				}

				.social {
					width: 40px;
					height: 40px;
					display: inline-grid;
					place-items: center;
					border-radius: 10px;
					text-decoration: none;
					box-shadow: 4px 4px 12px rgba(2, 8, 20, 0.45), -4px -4px 8px rgba(12, 28, 44, 0.12);
					transition: transform 150ms ease, box-shadow 150ms ease;
					overflow: hidden;
					color: inherit;
				}

				.social :global(svg) {
					width: 22px;
					height: 22px;
					display: block;
				}

				.social:hover,
				.social:focus {
					transform: translateY(-4px) scale(1.02);
					box-shadow: 10px 10px 28px rgba(2, 8, 20, 0.55), -6px -6px 18px rgba(12, 28, 44, 0.14);
				}

				.social-whatsapp {
					background: linear-gradient(180deg, rgba(37, 211, 102, 0.12), rgba(37, 211, 102, 0.06));
					border: 1px solid rgba(37, 211, 102, 0.14);
					color: #25d366;
				}
				.social-github {
					background: linear-gradient(180deg, rgba(24, 23, 23, 0.12), rgba(24, 23, 23, 0.04));
					border: 1px solid rgba(255, 255, 255, 0.02);
					color: #ffff;
				}
				.social-instagram {
					background: linear-gradient(180deg, rgba(225, 48, 108, 0.08), rgba(245, 130, 48, 0.06));
					border: 1px solid rgba(245, 130, 48, 0.12);
					color: #e4405f;
				}
			`}</style>
		</aside>
	);
}
