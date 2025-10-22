// src/app/page.tsx
import React from 'react';
import Header from '../components/Header'; // client component
import AboutArticle from '../components/About'; // client component
import ContactForm from '../components/ContactForm'; // client component
import SkillsGrid from '../components/SkillsGrid';
import ExperienceItem from '../components/ExperienceItem';
import ProjectCard from '../components/ProjectCard';
import ContactQuickCard from '../components/ContactQuickCard';

export const metadata = {
	title: 'Dereck Ruiz — Portafolio',
	description: 'Dereck Ruiz — Desarrollador FullStack. Node.js, Next.js, Prisma, MySQL, scrapers y pipelines ETL. Fundador de Syncwave.',
};

type Project = {
	title: string;
	desc: string;
	tags?: string[];
	url?: string;
	status?: 'Producción' | 'En desarrollo' | 'Beta' | 'Arquivado';
};

const projects: Project[] = [
	{
		title: 'Dynamic Pricing & FX Sync',
		desc: 'Plataforma inteligente para sincronización automática de precios según la tasa de cambio diaria. Permite configurar reglas dinámicas por categoría, previsualizar resultados y exportar CSV compatibles con puntos de venta (POS).',
		tags: ['Node.js', 'ETL', 'Stripe', 'Automation'],
		status: 'Producción',
	},
	{
		title: 'Corporación Ejecutiva — Sitio Web Corporativo',
		desc: 'Desarrollo de una página web a medida para una empresa española, con integración de pasarela de pagos, formularios de registro y gestión de datos en base MySQL. Arquitectura implementada en Next.js con enfoque en rendimiento y SEO.',
		tags: ['Next.js', 'MySQL', 'Payments', 'Tailwind CSS'],
		url: 'https://corporacionejecutiva.com',
		status: 'Producción',
	},
	{
		title: 'Syncwave Health Platform',
		desc: 'Desarrollo integral de una plataforma de gestión médica para clínicas, farmacias y laboratorios. Implementa autenticación, roles de usuario, notificaciones en tiempo real y administración de datos clínicos. Proyecto en desarrollo bajo arquitectura modular.',
		tags: ['Next.js', 'Prisma', 'Supabase', 'TypeScript', 'Notifications'],
		status: 'En desarrollo',
	},
	{
		title: 'Landing Page — Agencia de Automatizaciones',
		desc: 'Diseño y desarrollo de una landing page institucional moderna, con formulario de contacto conectado a Supabase y analítica integrada. Enfocada en captar leads y optimizar conversiones mediante un frontend responsivo y ligero.',
		tags: ['Next.js', 'Supabase', 'Tailwind CSS', 'UI/UX'],
		url: 'https://syncwave.com.ve',
		status: 'Producción',
	},
	{
		title: 'Freelancer Hub Platform',
		desc: 'Plataforma web para freelancers con registro de usuarios, publicación de presupuestos, chat interno y notificaciones en tiempo real. Backend optimizado con MySQL y frontend interactivo construido en React.',
		tags: ['React.js', 'MySQL', 'Socket.io', 'Notifications', 'Auth'],
		status: 'Beta',
	},
];

/** === Datos extraídos del CV (integrados como JSON) === */
const cv = {
	name: 'Dereck Ruiz',
	title: 'Programador FullStack',
	contact: {
		address: 'Av. San Martin, Capuchino, Parroquia San Juan',
		email: 'leinerwill25@gmail.com',
		phone: '+58 424 2070878',
	},
	summary: 'Desarrollador Fullstack con más de 6 años de experiencia en la creación de soluciones web y automatizaciones robustas. Con conocimientos sólidos en Node.js, React/Next.js, Prisma y MySQL, y en la implementación de scrapers, ETL y workflows de datos a gran escala. Fundador de SyncWave.',
	education: [
		{
			degree: 'Técnico Medio en Informática',
			institution: 'Liceo San Vicente De Paul',
			period: '2020 - 2021',
		},
	],
	experience: [
		{
			company: 'Syncwave',
			role: 'Fundador / Lead Technical (Automatizaciones & Plataformas)',
			period: 'Actualmente',
			responsibilities: ['Desarrollé plataformas de gestión (talleres, farmacias, CRM).', 'Producticé procesos en plantillas y flujos.', 'Implementé OAuth2.0, webhooks y seguridad (vault, encriptación).', 'Diseñé bots, scripts y pipelines ETL; optimicé procesos reduciendo tiempos entre 70–90% (ej. 3.5h → 3min).'],
		},
		{
			company: 'Directa Group',
			role: 'Scraper / Raspador de Datos',
			period: '2022 - 2023',
			responsibilities: ['Automatización de extracción (Puppeteer, Axios).', 'Pipelines Node.js para ETL en NoSQL/SQL.', 'Mecanismos de retry y throttling para evitar bloqueos.'],
		},
		{
			company: 'Valery Software',
			role: 'Desarrollador FullStack',
			period: '',
			responsibilities: ['Diseñé e implementé APIs RESTful y microservicios en Node.js para la gestión de transcripciones y almacenamiento de datos estructurados.', 'Desarrollé interfaces interactivas con React.js/Next.js, Material-UI y Tailwind, mejorando la experiencia de usuario y reduciendo tiempos de carga un 40%.', 'Configuré y optimicé bases de datos MySQL con Prisma, implementando migraciones, consultas complejas y paginación eficiente.', 'Lideré la migración de un sistema monolítico a una arquitectura modular, reduciendo costos de infraestructura y facilitando la escalabilidad.'],
		},
	],
	skills: {
		languages_frameworks: ['Node.js', 'TypeScript', 'JavaScript (ES6+)', 'React', 'Next.js', 'Express', 'Tailwind CSS', 'Material-UI'],
		databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'Prisma ORM'],
		automation_scraping: ['Puppeteer', 'Cheerio', 'Axios', 'Selenium', 'cron jobs', 'REST', 'GraphQL'],
		devops_cloud: ['Docker', 'Kubernetes', 'AWS (EC2, S3, RDS)', 'CI/CD (GitHub Actions)'],
		version_control: ['Git', 'GitHub', 'GitLab'],
	},
	references: [
		{ name: 'Stefany Acacio', role: 'RRHH / Directa Group', phone: '+58 4241224636' },
		{ name: 'Eduardo Aparcedo', phone: '+58 4241151948' },
	],
	source: 'CV Dev.pdf',
};

/** combinar skills en un solo arreglo para SkillsGrid */
const aggregatedSkills = [...cv.skills.languages_frameworks, ...cv.skills.databases, ...cv.skills.automation_scraping, ...cv.skills.devops_cloud].filter((v, i, a) => a.indexOf(v) === i); // quitar duplicados simples

export default function Page(): React.ReactElement {
	return (
		// superficie de página (usa tu CSS global/neumorphism)
		<div className="neo-surface min-h-screen pb-16">
			<main className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Header */}
				<div className="pt-8">
					<Header name={cv.name} title={cv.title} profileSrc="/images.jpg" />
				</div>

				{/* Layout: main + aside */}
				<section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
					{/* Main column */}
					<div className="lg:col-span-2 space-y-8">
						{/* About: pasa sólo el resumen (el componente AboutArticle puede leer más si lo adaptas) */}
						<AboutArticle about={cv.summary} />

						{/* Experiencia */}
						<section aria-labelledby="exp-title" className="space-y-4">
							<h3 id="exp-title" className="text-lg font-semibold text-neo-light">
								Experiencia más relevante
							</h3>

							<div className="space-y-4">
								{cv.experience.map((exp) => (
									<div key={`${exp.company}-${exp.period}`} className="neo-card u-card-padding-sm">
										<ExperienceItem title={`${exp.company} — ${exp.role}`} company={exp.company} dateRange={exp.period} bullets={exp.responsibilities} />
									</div>
								))}
							</div>
						</section>

						{/* Proyectos */}
						<section aria-labelledby="projects-title">
							<h3 id="projects-title" className="text-lg font-semibold mb-4 text-neo-light">
								Proyectos destacados
							</h3>
							<div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
								{projects.map((p) => (
									<ProjectCard
										key={p.title}
										title={p.title}
										desc={p.desc}
										tags={p.tags}
										url={p.url}
										status={p.status}
										// useIcons and iconBaseUrl can be enabled if you host SVG icons
										useIcons={false}
									/>
								))}
							</div>
						</section>
					</div>

					{/* Aside */}
					<aside className="space-y-6">
						{/* Contact quick card: pasamos contacto directo */}
						<ContactQuickCard
							email={cv.contact.email}
							phone={cv.contact.phone}
							addressLines={[cv.contact.address]}
							whatsapp={cv.contact.phone.replace(/\D/g, '')}
							github="leinerwill25" // placeholder; cámbialo si quieres
							instagram="syncwave_agency" // placeholder
						/>

						<div className="neo-card u-card-padding-sm">
							<h4 className="font-semibold mb-3 text-neo-light">Skills</h4>
							<SkillsGrid skills={aggregatedSkills} />
						</div>

						<div id="contact" className="neo-card u-card-padding-sm">
							<ContactForm />
						</div>
					</aside>
				</section>

				<footer className="mt-12 text-center text-sm py-6 text-neo-muted">
					© {new Date().getFullYear()} {cv.name} — Syncwave
				</footer>
			</main>
		</div>
	);
}
