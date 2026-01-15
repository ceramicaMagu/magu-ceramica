import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/utils/supabase';

// Schema de validación para configuración del sitio
const configSchema = z.object({
    socialMedia: z.object({
        instagram: z.string().url().optional().or(z.literal('')),
        facebook: z.string().url().optional().or(z.literal('')),
        twitter: z.string().url().optional().or(z.literal('')),
        whatsapp: z.string().optional(),
    }),
    contact: z.object({
        email: z.string().email('Email inválido'),
        phone: z.string().min(1, 'Teléfono requerido'),
        address: z.string().optional(),
    }),
});

// Verificar token de autenticación con Supabase
async function verifyAuth(request: NextRequest): Promise<boolean> {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false;
    }

    const token = authHeader.substring(7);

    try {
        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data.user) {
            return false;
        }

        const userRole = data.user.user_metadata?.role;
        return userRole === 'admin';
    } catch {
        return false;
    }
}

// GET - Obtener configuración (público)
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('site_config')
            .select('*')
            .single();

        if (error) {
            throw error;
        }

        return NextResponse.json({
            success: true,
            config: data,
        });
    } catch {
        return NextResponse.json(
            { error: 'Error del servidor' },
            { status: 500 }
        );
    }
}

// PUT - Actualizar configuración (protegido)
export async function PUT(request: NextRequest) {
    try {
        // Verificar autenticación
        if (!(await verifyAuth(request))) {
            return NextResponse.json(
                { error: 'No autorizado' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const validation = configSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Datos inválidos', details: validation.error.issues },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('site_config')
            .update({
                social_media: validation.data.socialMedia,
                contact: validation.data.contact,
                updated_at: new Date().toISOString(),
            })
            .eq('id', 1)
            .select()
            .single();

        if (error) {
            throw error;
        }

        return NextResponse.json({
            success: true,
            config: data,
        });
    } catch {
        return NextResponse.json(
            { error: 'Error del servidor' },
            { status: 500 }
        );
    }
}
