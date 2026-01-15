import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/state/redux/store';
import { logout } from '@/state/redux/auth';

/**
 * Hook para verificar la sesión del usuario periódicamente
 * Si la sesión expira o es inválida, desloguea automáticamente
 *
 * @param checkInterval - Intervalo de verificación en milisegundos (default: 5 minutos)
 */
export const useSessionCheck = (checkInterval: number = 5 * 60 * 1000) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);
    const user = useAppSelector(state => state.auth.user);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const verifySession = async () => {
        // Si no hay token o usuario, no hay nada que verificar
        if (!token || !user) {
            return;
        }

        try {
            // Intentar hacer una petición autenticada para verificar la sesión
            const response = await fetch('/api/auth/verify', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                // Si la sesión no es válida, desloguear
                console.log('Sesión inválida o expirada. Deslogueando...');
                dispatch(logout());
                router.push('/login');
            }
        } catch (error) {
            console.error('Error al verificar sesión:', error);
            // En caso de error de red, no deslogueamos para evitar interrupciones innecesarias
        }
    };

    useEffect(() => {
        // Solo iniciar verificación si hay token y usuario
        if (!token || !user) {
            return;
        }

        // Verificar inmediatamente al montar
        verifySession();

        // Configurar verificación periódica
        intervalRef.current = setInterval(verifySession, checkInterval);

        // Limpiar intervalo al desmontar
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [token, user, checkInterval]);

    return { verifySession };
};
