// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
	console.error('Faltan variables de entorno SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY');
	// Note: en producción lanzaría error para evitar inserts mal formados
}

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { name, email, message } = body ?? {};

		if (!name || !email || !message) {
			return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
		}

		const payload = {
			name: String(name).trim(),
			email: String(email).trim().toLowerCase(),
			message: String(message).trim(),
			source: 'web_contact_form',
			user_agent: req.headers.get('user-agent') ?? null,
			created_at: new Date().toISOString(),
		};

		const { error } = await supabase.from('contact_requests_port').insert([payload]);

		if (error) {
			console.error('Supabase insert error:', error);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json({ success: true }, { status: 201 });
	} catch (err: any) {
		console.error('POST /api/contact error', err);
		return NextResponse.json({ error: err?.message || 'Error interno' }, { status: 500 });
	}
}
