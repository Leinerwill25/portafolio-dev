// data/resume.ts
export type Resume = {
	personal: {
		firstName: string;
		lastName: string;
		title: string;
		avatar?: string;
		contact: {
			phone: string;
			email: string;
			address: string;
			cityParish: string;
			website?: string;
		};
	};
	education: {
		degree: string;
		institution: string;
		period?: string;
	};
	summary: string;
	skills: {
		category: string;
		items: string[];
	}[];
	experience: {
		role: string;
		company: string;
		period?: string;
		bullets: string[];
	}[];
	projects?: {
		title: string;
		period?: string;
		bullets: string[];
	}[];
	references?: {
		name: string;
		position: string;
		phone?: string;
	}[];
};

export const resume: Resume = {
	personal: {
		firstName: 'Dereck',
		lastName: 'Ruiz',
		title: 'Programador FullStack',
		avatar: '/avatar.jpg', // coloca tu foto en /public/avatar.jpg
		contact: {
			phone: '+58 424 2070878',
			email: 'leinerwill25@gmail.com',
			address: 'Av. San Martin, Capuchino',
			cityParish: 'Parroquia San Juan',
			website: 'https://syncwave.com.ve',
		},
	},

	education: {
		degree: 'Técnico Medio En Informática',
		institution: 'Liceo San Vicente De Paul',
		period: '2020 - 2021',
	},

	summary: 'Desarrollador Fullstack con más de 6 años de experiencia en la creación de soluciones web y automatizaciones robustas. Trabajo con Node.js, React/Next.js, Prisma y MySQL; implementador de scripts de scraping, ETL y workflows de datos a gran escala. Fundador de SyncWave donde lidero equipos multidisciplinarios para diseñar e integrar soluciones que optimizan recursos y potencian la productividad.',

	skills: [
		{
			category: 'Lenguajes & Frameworks',
			items: ['Node.js', 'TypeScript', 'JavaScript (ES6+)', 'React', 'Next.js', 'Express', 'Tailwind CSS', 'Material-UI', 'PHP', 'Python'],
		},
		{
			category: 'Bases de Datos',
			items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Prisma ORM'],
		},
		{
			category: 'Automatización & Scraping',
			items: ['Puppeteer', 'Cheerio', 'Axios', 'cron jobs', 'REST & GraphQL APIs'],
		},
		{
			category: 'DevOps & Cloud',
			items: ['Docker', 'Kubernetes', 'AWS (EC2, S3, RDS)', 'CI/CD (GitHub Actions)'],
		},
		{
			category: 'Control de Versiones',
			items: ['Git', 'GitHub', 'GitLab'],
		},
	],

	experience: [
		{
			role: 'Desarrollador FullStack',
			company: 'Valery Software',
			period: 'Actualmente',
			bullets: ['Diseñé e implementé APIs RESTful y microservicios en Node.js para la gestión de transcripciones y almacenamiento de datos estructurados.', 'Desarrollé interfaces interactivas con React.js/Next.js, Material-UI y Tailwind, mejorando la experiencia de usuario y reduciendo tiempos de carga un 40%.', 'Configuré y optimicé bases de datos MySQL con Prisma, implementando migraciones, consultas complejas y paginación eficiente.', 'Lideré la migración de un sistema monolítico a arquitectura modular, reduciendo costos de infraestructura y facilitando escalabilidad.', 'Soporte, integración y despliegue en pipelines CI/CD.'],
		},
		{
			role: 'Founder / Lead Technical',
			company: 'SyncWave',
			period: 'Fundador / Lead Technical (Automatizaciones & Plataformas)',
			bullets: ['Concebí y desarrollé desde cero múltiples plataformas de gestión: solución para talleres de autos, software para farmacias (inventario, facturación, reportes KPI) y CRM para freelancers.', 'Producticé procesos repetibles: transformé proyectos a medida en plantillas y flujos reproducibles (scripts), habilitando onboarding rápido.', 'Implementé integraciones seguras: OAuth2.0, webhooks bidireccionales, encriptación end-to-end para credenciales y vault para secrets.', 'Automatizaciones y RPA: desarrollé bots y pipelines ETL; scrapers robustos con rotación de IP y anti-bloqueo, reduciendo tiempos operativos entre 70–90%.', 'Resultado comercial: aumento de capacidad de entrega escalable y habilitación de fuentes de ingresos recurrentes.'],
		},
	],

	projects: [
		{
			title: 'Scraper / Raspador de Datos — Directa Group',
			period: '2022 - 2023',
			bullets: ['Automatización de extracción de datos de múltiples portales (ventas, reseñas, inventarios) usando Puppeteer y Axios.', 'Diseñé pipelines en Node.js para limpieza, transformación y carga (ETL) en bases NoSQL/SQL.', 'Implementé mecanismos de retry y throttling para cumplir con políticas y evitar bloqueos de IP.'],
		},
	],

	references: [
		{ name: 'Stefany Acacio', position: 'RRHH / Directa Group', phone: '+58 4241224636' },
		{ name: 'Eduardo Aparcedo', position: 'Valery Software', phone: '+58 4241151948' },
	],
};
