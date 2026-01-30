import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/utils/supabase';

// Schema de validación para productos
const productSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Nombre requerido').max(255),
    image: z.string().min(1, 'Imagen requerida'), // Imagen principal (primera del array)
    images: z.array(z.string()).min(1, 'Al menos una imagen requerida').max(5, 'Máximo 5 imágenes permitidas'),
    price: z.number().positive('El precio debe ser positivo'),
    description: z.string().min(1, 'Descripción requerida').max(1000),
    category: z.string().min(1, 'Categoría requerida'),
    stock: z.number().int().min(0, 'Stock debe ser 0 o mayor').default(999),
    featured: z.boolean().optional().default(false),
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

// GET - Obtener todos los productos (público)
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        return NextResponse.json({
            success: true,
            products: data,
        });
    } catch {
        return NextResponse.json(
            { error: 'Error del servidor' },
            { status: 500 }
        );
    }
}

// POST - Crear producto (protegido)
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
        const validation = productSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Datos inválidos', details: validation.error.issues },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('products')
            .insert([validation.data])
            .select()
            .single();

        if (error) {
            console.error('Error al crear producto en Supabase:', error);
            return NextResponse.json(
                { error: `Error al crear producto: ${error.message}` },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            product: data,
        });
    } catch (err) {
        console.error('Error en POST /api/products:', err);
        const message = err instanceof Error ? err.message : 'Error desconocido';
        return NextResponse.json(
            { error: `Error del servidor: ${message}` },
            { status: 500 }
        );
    }
}

// PUT - Actualizar producto (protegido)
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
        const validation = productSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Datos inválidos', details: validation.error.issues },
                { status: 400 }
            );
        }

        if (!validation.data.id) {
            return NextResponse.json(
                { error: 'ID del producto requerido' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('products')
            .update(validation.data)
            .eq('id', validation.data.id)
            .select()
            .single();

        if (error) {
            throw error;
        }

        return NextResponse.json({
            success: true,
            product: data,
        });
    } catch {
        return NextResponse.json(
            { error: 'Error del servidor' },
            { status: 500 }
        );
    }
}

// DELETE - Eliminar producto (protegido)
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
                { error: 'ID del producto requerido' },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from('products')
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
