import { NextRequest, NextResponse } from "next/server";
import { createSupabaseClient } from "@/utils/supabase";

export async function GET(request: NextRequest) {
    try {
        // Obtener token del header
        const authHeader = request.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "No autorizado" },
                { status: 401 }
            );
        }

        const token = authHeader.substring(7);

        // Verificar token con Supabase
        const supabase = createSupabaseClient();

        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data.user) {
            return NextResponse.json(
                { error: "Token inválido o expirado" },
                { status: 401 }
            );
        }

        const userRole = data.user.user_metadata?.role || 'user';

        // Sesión válida
        return NextResponse.json(
            {
                valid: true,
                user: {
                    id: data.user.id,
                    email: data.user.email!,
                    name: data.user.user_metadata?.name || 'Admin',
                    role: userRole,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error al verificar sesión:", error);
        return NextResponse.json(
            { error: "Error del servidor" },
            { status: 500 }
        );
    }
}
