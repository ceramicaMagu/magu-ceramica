/**
 * Utilidades de validación para formularios
 */

export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

/**
 * Valida un email
 */
export const validateEmail = (email: string): ValidationResult => {
    if (!email || email.trim() === '') {
        return {
            isValid: false,
            error: 'El email es requerido'
        };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            error: 'El email ingresado no es válido'
        };
    }

    return { isValid: true };
};

/**
 * Valida una URL (acepta URLs con o sin protocolo)
 */
export const validateUrl = (url: string, fieldName: string = 'URL'): ValidationResult => {
    if (!url || url.trim() === '') {
        // URLs son opcionales, devolver válido si está vacío
        return { isValid: true };
    }

    const trimmedUrl = url.trim();

    // Patrón básico para validar formato de URL
    // Acepta: dominio.com, www.dominio.com, http://dominio.com, https://dominio.com
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;

    if (urlPattern.test(trimmedUrl)) {
        return { isValid: true };
    }

    return {
        isValid: false,
        error: `La ${fieldName} ingresada no es válida`
    };
};

/**
 * Valida un número de teléfono/WhatsApp
 */
export const validatePhone = (phone: string, fieldName: string = 'teléfono'): ValidationResult => {
    if (!phone || phone.trim() === '') {
        return {
            isValid: false,
            error: `El ${fieldName} es requerido`
        };
    }

    // Remover espacios, guiones y paréntesis
    const cleanPhone = phone.replace(/[\s\-()]/g, '');

    // Verificar que tenga al menos 10 dígitos
    const digitsOnly = cleanPhone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
        return {
            isValid: false,
            error: `El ${fieldName} debe tener al menos 10 dígitos`
        };
    }

    return { isValid: true };
};

/**
 * Valida un campo requerido
 */
export const validateRequired = (value: string | number | undefined | null, fieldName: string): ValidationResult => {
    if (value === undefined || value === null || value === '') {
        return {
            isValid: false,
            error: `${fieldName} es requerido`
        };
    }

    if (typeof value === 'string' && value.trim() === '') {
        return {
            isValid: false,
            error: `${fieldName} es requerido`
        };
    }

    return { isValid: true };
};

/**
 * Valida un precio
 */
export const validatePrice = (price: number | string): ValidationResult => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;

    if (isNaN(numPrice)) {
        return {
            isValid: false,
            error: 'El precio debe ser un número válido'
        };
    }

    if (numPrice <= 0) {
        return {
            isValid: false,
            error: 'El precio debe ser mayor a 0'
        };
    }

    return { isValid: true };
};

/**
 * Valida stock
 */
export const validateStock = (stock: number | string): ValidationResult => {
    const numStock = typeof stock === 'string' ? parseInt(stock, 10) : stock;

    if (isNaN(numStock)) {
        return {
            isValid: false,
            error: 'El stock debe ser un número válido'
        };
    }

    if (numStock < 0) {
        return {
            isValid: false,
            error: 'El stock no puede ser negativo'
        };
    }

    return { isValid: true };
};

/**
 * Valida contraseña
 */
export const validatePassword = (password: string): ValidationResult => {
    if (!password || password.trim() === '') {
        return {
            isValid: false,
            error: 'La contraseña es requerida'
        };
    }

    if (password.length < 6) {
        return {
            isValid: false,
            error: 'La contraseña debe tener al menos 6 caracteres'
        };
    }

    return { isValid: true };
};

/**
 * Valida longitud máxima
 */
export const validateMaxLength = (value: string, maxLength: number, fieldName: string): ValidationResult => {
    if (value && value.length > maxLength) {
        return {
            isValid: false,
            error: `${fieldName} no puede tener más de ${maxLength} caracteres`
        };
    }

    return { isValid: true };
};

/**
 * Valida longitud mínima
 */
export const validateMinLength = (value: string, minLength: number, fieldName: string): ValidationResult => {
    if (value && value.length < minLength) {
        return {
            isValid: false,
            error: `${fieldName} debe tener al menos ${minLength} caracteres`
        };
    }

    return { isValid: true };
};
