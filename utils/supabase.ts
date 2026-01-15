import { createClient } from '@supabase/supabase-js';
import { getServerEnvVars, getPublicEnvVars } from './env-validator';

/**
 * ⚠️ IMPORTANTE: Este archivo solo debe importarse en API Routes (servidor)
 * NUNCA importar en componentes 'use client'
 */

// ============================================
// CLIENTE SERVIDOR (SERVICE ROLE)
// ============================================

/**
 * Cliente de Supabase para el servidor (con service_role key)
 *
 * CARACTERÍSTICAS:
 * - Bypasea Row Level Security (RLS)
 * - Acceso completo a la base de datos
 * - SOLO usar en API routes del servidor
 *
 * ⚠️ NUNCA exponer este cliente al frontend
 */
export const supabase = (() => {
    const { supabaseUrl, supabaseServiceRoleKey } = getServerEnvVars();

    return createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
})();

// ============================================
// CLIENTE PÚBLICO (ANON KEY)
// ============================================

/**
 * Cliente de Supabase para el cliente (con anon key)
 *
 * CARACTERÍSTICAS:
 * - Respeta Row Level Security (RLS)
 * - Acceso limitado según políticas de RLS
 * - Seguro para usar en el frontend
 *
 * ✅ Puede usarse en componentes de cliente
 */
export const createSupabaseClient = () => {
    const { supabaseUrl, supabaseAnonKey } = getPublicEnvVars();

    return createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
        },
    });
};
