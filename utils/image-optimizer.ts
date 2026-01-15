import imageCompression from 'browser-image-compression';

/**
 * Optimiza una imagen para reducir su tamaño manteniendo calidad aceptable
 * @param file - Archivo de imagen a optimizar
 * @returns Promise con la imagen optimizada en formato base64
 */
export async function optimizeImage(file: File): Promise<string> {
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
        throw new Error('El archivo debe ser una imagen');
    }

    // Opciones de compresión
    const options = {
        maxSizeMB: 0.5, // Máximo 500KB
        maxWidthOrHeight: 1024, // Máximo 1024px en cualquier dimensión
        useWebWorker: true,
        fileType: 'image/jpeg' as const, // Convertir a JPEG para mejor compresión
    };

    // Comprimir imagen
    const compressedFile = await imageCompression(file, options);

    // Convertir a base64
    const base64 = await imageCompression.getDataUrlFromFile(compressedFile);

    return base64;
}
