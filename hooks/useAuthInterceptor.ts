import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/state/redux/store';
import { logout } from '@/state/redux/auth';

/**
 * Hook para interceptar respuestas de API y manejar sesión expirada
 */
export const useAuthInterceptor = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Guardar el fetch original
        const originalFetch = window.fetch;

        // Override del fetch global
        window.fetch = async (...args) => {
            const response = await originalFetch(...args);

            // Si recibimos 401 Unauthorized, desloguear
            if (response.status === 401) {
                // Clonar response para poder leerlo
                const clonedResponse = response.clone();

                try {
                    const data = await clonedResponse.json();

                    // Verificar si el mensaje indica sesión expirada
                    if (data.error && (
                        data.error.includes('token') ||
                        data.error.includes('sesión') ||
                        data.error.includes('expirada') ||
                        data.error.includes('autenticación')
                    )) {
                        console.warn('Sesión expirada o inválida. Cerrando sesión...');

                        // Desloguear y redirigir
                        dispatch(logout());
                        router.push('/login');
                    }
                } catch {
                    // Si no se puede parsear, asumir que es problema de autenticación
                    console.warn('Error 401 recibido. Cerrando sesión...');
                    dispatch(logout());
                    router.push('/login');
                }
            }

            return response;
        };

        // Cleanup: restaurar fetch original
        return () => {
            window.fetch = originalFetch;
        };
    }, [router, dispatch]);
};
