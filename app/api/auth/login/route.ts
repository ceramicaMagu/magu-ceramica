import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseClient } from '@/utils/supabase';

// Schema de validación para prevenir inyección SQL y validar formato
const loginSchema = z.object({
    email: z.string()
        .email('Email inválido')
        .min(1, 'Email requerido')
        .max(255, 'Email demasiado largo')
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Formato de email inválido'),
    password: z.string()
        .min(1, 'Contraseña requerida')
        .max(255, 'Contraseña demasiado larga'),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validar entrada con Zod (protección contra SQL injection)
        const validation = loginSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    error: 'Datos inválidos',
                    details: validation.error.issues
                },
                { status: 400 }
            );
        }

        const { email, password } = validation.data;

        // Sanitizar entrada
        const sanitizedEmail = email.trim().toLowerCase();
        const sanitizedPassword = password.trim();

        // Autenticación con Supabase
        const supabase = createSupabaseClient();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: sanitizedEmail,
            password: sanitizedPassword,
        });

        if (error || !data.user) {
            return NextResponse.json(
                { error: 'Credenciales incorrectas' },
                { status: 401 }
            );
        }

        // Verificar metadata de rol
        const userRole = data.user.user_metadata?.role || 'user';

        if (userRole !== 'admin') {
            return NextResponse.json(
                { error: 'Acceso no autorizado. Solo administradores pueden acceder.' },
                { status: 403 }
            );
        }

        // Login exitoso
        return NextResponse.json({
            success: true,
            user: {
                id: data.user.id,
                email: data.user.email!,
                name: data.user.user_metadata?.name || 'Admin',
                role: userRole,
            },
            token: data.session.access_token,
        });

    } catch {
        return NextResponse.json(
            { error: 'Error del servidor' },
            { status: 500 }
        );
    }
}
