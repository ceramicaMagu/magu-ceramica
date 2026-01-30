import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

async function verifyAuth(request: NextRequest): Promise<boolean> {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false;
    }

    const token = authHeader.substring(7);

    try {
        const { data, error } = await supabase.auth.getUser(token);
        if (error || !data.user) return false;
        return data.user.user_metadata?.role === 'admin';
    } catch {
        return false;
    }
}

// POST - Subir imagen
export async function POST(request: NextRequest) {
    try {
        if (!await verifyAuth(request)) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const folder = (formData.get('folder') as string) || 'products';

        if (!file) {
            return NextResponse.json({ error: 'No se proporcionó archivo' }, { status: 400 });
        }

        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: `"${file.name}" no es una imagen válida.` }, { status: 400 });
        }

        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: `"${file.name}" supera el límite de 5MB.` }, { status: 400 });
        }

        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const extension = file.type.split('/')[1] || 'jpg';
        const fileName = `${folder}/${timestamp}-${randomString}.${extension}`;

        const buffer = Buffer.from(await file.arrayBuffer());

        const { data, error } = await supabase.storage
            .from('images')
            .upload(fileName, buffer, {
                contentType: file.type,
                cacheControl: '31536000',
                upsert: false,
            });

        if (error) {
            console.error('Error al subir imagen:', error);
            return NextResponse.json({ error: `Error al subir imagen: ${error.message}` }, { status: 500 });
        }

        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(data.path);

        return NextResponse.json({ url: publicUrl, path: data.path });
    } catch (error) {
        console.error('Error en POST /api/images:', error);
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}

// DELETE - Eliminar imagen
export async function DELETE(request: NextRequest) {
    try {
        if (!await verifyAuth(request)) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const { imageUrl } = await request.json();

        if (!imageUrl) {
            return NextResponse.json({ error: 'URL de imagen requerida' }, { status: 400 });
        }

        const url = new URL(imageUrl);
        const pathParts = url.pathname.split('/');
        const bucketIndex = pathParts.findIndex(part => part === 'images');

        if (bucketIndex === -1) {
            return NextResponse.json({ error: 'URL de imagen inválida' }, { status: 400 });
        }

        const imagePath = pathParts.slice(bucketIndex + 1).join('/');

        const { error } = await supabase.storage
            .from('images')
            .remove([imagePath]);

        if (error) {
            console.error('Error al eliminar imagen:', error);
            return NextResponse.json({ error: `Error al eliminar: ${error.message}` }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error en DELETE /api/images:', error);
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}
