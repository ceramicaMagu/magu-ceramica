import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/utils/supabase';

// Schema de validación para categorías
const categorySchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Nombre requerido').max(255),
    image: z.string().min(1, 'Imagen requerida'),
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

        // Verificar que el usuario tenga rol de admin
        const userRole = data.user.user_metadata?.role;
        return userRole === 'admin';
    } catch {
        return false;
    }
}

// GET - Obtener todas las categorías (público)
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name', { ascending: true });

        if (error) {
            throw error;
        }

        return NextResponse.json({
            success: true,
            categories: data,
        });
    } catch {
        return NextResponse.json(
            { error: 'Error del servidor' },
            { status: 500 }
        );
    }
}

// POST - Crear categoría (protegido)
export async function POST(request: NextRequest) {
    try {
        // Verificar autenticación
        if (!(await verifyAuth(request))) {
            return NextResponse.json(
                { error: 'Sesión expirada o token inválido. Por favor, inicia sesión nuevamente.' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const validation = categorySchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Datos inválidos', details: validation.error.issues },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('categories')
            .insert([validation.data])
            .select()
            .single();

        if (error) {
            throw error;
        }

        return NextResponse.json({
            success: true,
            category: data,
        });
    } catch {
        return NextResponse.json(
            { error: 'Error del servidor' },
            { status: 500 }
        );
    }
}

// PUT - Actualizar categoría (protegido)
export async function PUT(request: NextRequest) {
    try {
        // Verificar autenticación
        if (!(await verifyAuth(request))) {
            return NextResponse.json(
                { error: 'Sesión expirada o token inválido. Por favor, inicia sesión nuevamente.' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const validation = categorySchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Datos inválidos', details: validation.error.issues },
                { status: 400 }
            );
        }

        if (!validation.data.id) {
            return NextResponse.json(
                { error: 'ID de la categoría requerido' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('categories')
            .update(validation.data)
            .eq('id', validation.data.id)
            .select()
            .single();

        if (error) {
            throw error;
        }

        return NextResponse.json({
            success: true,
            category: data,
        });
    } catch {
        return NextResponse.json(
            { error: 'Error del servidor' },
            { status: 500 }
        );
    }
}

// DELETE - Eliminar categoría (protegido)
export async function DELETE(request: NextRequest) {
    try {
        // Verificar autenticación
        if (!(await verifyAuth(request))) {
            return NextResponse.json(
                { error: 'Sesión expirada o token inválido. Por favor, inicia sesión nuevamente.' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'ID de la categoría requerido' },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', id);

        if (error) {
            throw error;
        }

        return NextResponse.json({
            success: true,
            id: parseInt(id),
        });
    } catch {
        return NextResponse.json(
            { error: 'Error del servidor' },
            { status: 500 }
        );
    }
}
