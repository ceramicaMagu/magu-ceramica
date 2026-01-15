/**
 * Environment Variables Validator
 *
 * Este archivo valida que las variables de entorno sensibles
 * NUNCA sean expuestas al cliente (frontend).
 *
 * IMPORTANTE:
 * - Variables con prefijo NEXT_PUBLIC_ son accesibles en el cliente
 * - Variables sin prefijo son SOLO para el servidor
 */

// ============================================
// VALIDACIÓN DE VARIABLES PÚBLICAS (CLIENT)
// ============================================

export const getPublicEnvVars = (): { supabaseUrl: string; supabaseAnonKey: string } => {
    // Solo estas variables pueden ser usadas en el cliente
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Validar que existan
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
            '❌ FALTAN VARIABLES PÚBLICAS DE ENTORNO:\n' +
            'Asegúrate de definir:\n' +
            '- NEXT_PUBLIC_SUPABASE_URL\n' +
            '- NEXT_PUBLIC_SUPABASE_ANON_KEY\n' +
            'en tu archivo .env.local'
        );
    }

    return { supabaseUrl, supabaseAnonKey };
};

// ============================================
// VALIDACIÓN DE VARIABLES PRIVADAS (SERVER)
// ============================================

/**
 * ⚠️ SOLO USAR EN SERVER SIDE (API Routes, Server Components)
 * NUNCA importar esto en componentes 'use client'
 */
export const getServerEnvVars = (): { supabaseUrl: string; supabaseServiceRoleKey: string } => {
    // Verificar que estamos en el servidor
    if (typeof window !== 'undefined') {
        throw new Error(
            '🚨 VIOLACIÓN DE SEGURIDAD DETECTADA!\n' +
            'Intentaste acceder a variables de servidor desde el cliente.\n' +
            'Esto podría exponer credenciales sensibles.\n' +
            'Usa getPublicEnvVars() en su lugar.'
        );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Validar que existan
    if (!supabaseUrl || !supabaseServiceRoleKey) {
        throw new Error(
            '❌ FALTAN VARIABLES PRIVADAS DE ENTORNO:\n' +
            'Asegúrate de definir:\n' +
            '- SUPABASE_SERVICE_ROLE_KEY\n' +
            'en tu archivo .env.local'
        );
    }

    return { supabaseUrl, supabaseServiceRoleKey };
};

// ============================================
// VERIFICACIÓN DE SEGURIDAD
// ============================================

/**
 * Verifica que las variables sensibles NO estén expuestas
 * Esta función se ejecuta en tiempo de compilación
 */
export const verifyEnvSecurity = () => {
    // Lista de variables que NUNCA deben tener prefijo NEXT_PUBLIC_
    const sensitiveVars = [
        'SUPABASE_SERVICE_ROLE_KEY',
        'DATABASE_URL',
        'PRIVATE_KEY',
        'SECRET_KEY',
        'API_SECRET',
    ];

    // Verificar que ninguna variable sensible tenga el prefijo público
    const allEnvVars = Object.keys(process.env);
    const violations: string[] = [];

    sensitiveVars.forEach(sensitiveVar => {
        const publicVersion = `NEXT_PUBLIC_${sensitiveVar}`;
        if (allEnvVars.includes(publicVersion)) {
            violations.push(publicVersion);
        }
    });

    if (violations.length > 0) {
        throw new Error(
            '🚨 VIOLACIÓN CRÍTICA DE SEGURIDAD!\n' +
            'Las siguientes variables sensibles tienen el prefijo NEXT_PUBLIC_:\n' +
            violations.join('\n') + '\n\n' +
            'Esto expondría credenciales al cliente.\n' +
            'Elimina el prefijo NEXT_PUBLIC_ de estas variables.'
        );
    }

    return true;
};

// ============================================
// HELPER PARA LOGS SEGUROS
// ============================================

/**
 * Enmascara valores sensibles para logs
 */
export const maskSensitiveValue = (value: string): string => {
    if (!value || value.length < 8) return '***';

    const visibleChars = 4;
    const start = value.substring(0, visibleChars);
    const end = value.substring(value.length - visibleChars);
    const masked = '*'.repeat(Math.min(value.length - (visibleChars * 2), 20));

    return `${start}${masked}${end}`;
};

/**
 * Log seguro de configuración (sin exponer valores completos)
 * Función de utilidad para desarrollo/debugging - no se usa en producción
 */
export const logEnvConfig = () => {
    // Esta función está disponible pero no se llama automáticamente
    // para evitar console.log en producción
    if (process.env.NODE_ENV === 'development') {
        if (typeof window === 'undefined') {
            // Solo en servidor
            return {
                environment: 'servidor',
                supabaseUrl: maskSensitiveValue(process.env.NEXT_PUBLIC_SUPABASE_URL || ''),
                serviceRoleKey: maskSensitiveValue(process.env.SUPABASE_SERVICE_ROLE_KEY || ''),
            };
        } else {
            // En cliente
            return {
                environment: 'cliente',
                supabaseUrl: maskSensitiveValue(process.env.NEXT_PUBLIC_SUPABASE_URL || ''),
                anonKey: maskSensitiveValue(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''),
            };
        }
    }
    return null;
};
