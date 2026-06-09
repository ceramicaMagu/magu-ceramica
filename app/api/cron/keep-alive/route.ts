import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { error } = await supabase
            .from('site_config')
            .select('id')
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') {
            throw error;
        }

        return NextResponse.json({
            success: true,
            timestamp: new Date().toISOString(),
        });
    } catch {
        return NextResponse.json({ error: 'Error al conectar con Supabase' }, { status: 500 });
    }
}
