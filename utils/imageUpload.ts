import imageCompression from 'browser-image-compression';

export type UploadResult = {
    success: true;
    url: string;
    path: string;
} | {
    success: false;
    error: string;
};

export type UploadMultipleResult = {
    urls: string[];
    errors: string[];
};

/**
 * Comprime una imagen antes de subirla
 */
export async function compressImage(file: File): Promise<File> {
    const options = {
        maxSizeMB: 0.5, // Máximo 500KB
        maxWidthOrHeight: 1024, // Máximo 1024px
        useWebWorker: true,
        fileType: 'image/jpeg' as const,
    };

    return await imageCompression(file, options);
}

/**
 * Sube una imagen a través de la API del servidor
 */
export async function uploadImageToStorage(
    file: File,
    folder: 'products' | 'categories' = 'products',
    token?: string
): Promise<UploadResult> {
    try {
        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
            return { success: false, error: `"${file.name}" no es una imagen válida (tipo: ${file.type || 'desconocido'}).` };
        }

        // Validar tamaño antes de comprimir (máx 10MB original)
        if (file.size > 10 * 1024 * 1024) {
            return { success: false, error: `"${file.name}" es demasiado grande (${(file.size / 1024 / 1024).toFixed(1)}MB). Máximo 10MB antes de compresión.` };
        }

        // Comprimir imagen
        let compressedFile: File;
        try {
            compressedFile = await compressImage(file);
        } catch {
            return { success: false, error: `Error al comprimir "${file.name}". Probá con otra imagen o formato (JPG, PNG, WebP).` };
        }

        // Subir a través de la API del servidor
        const formData = new FormData();
        formData.append('file', compressedFile);
        formData.append('folder', folder);

        const response = await fetch('/api/images', {
            method: 'POST',
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            },
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.error || 'Error al subir imagen' };
        }

        return {
            success: true,
            url: data.url,
            path: data.path,
        };
    } catch (error) {
        console.error('Error en uploadImageToStorage:', error);
        const message = error instanceof Error ? error.message : 'Error desconocido';
        return { success: false, error: `Error inesperado al subir "${file.name}": ${message}` };
    }
}

/**
 * Sube múltiples imágenes y retorna las URLs y errores
 */
export async function uploadMultipleImages(
    files: File[],
    folder: 'products' | 'categories' = 'products',
    maxImages: number = 5,
    token?: string
): Promise<UploadMultipleResult> {
    const filesToUpload = files.slice(0, maxImages);
    const results = await Promise.all(
        filesToUpload.map(file => uploadImageToStorage(file, folder, token))
    );

    const urls: string[] = [];
    const errors: string[] = [];

    for (const result of results) {
        if (result.success) {
            urls.push(result.url);
        } else {
            errors.push(result.error);
        }
    }

    return { urls, errors };
}

/**
 * Elimina una imagen a través de la API del servidor
 */
export async function deleteImageFromStorage(imageUrl: string, token?: string): Promise<boolean> {
    try {
        const response = await fetch('/api/images', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ imageUrl }),
        });

        return response.ok;
    } catch (error) {
        console.error('Error en deleteImageFromStorage:', error);
        return false;
    }
}

/**
 * Elimina múltiples imágenes
 */
export async function deleteMultipleImages(imageUrls: string[], token?: string): Promise<void> {
    const deletePromises = imageUrls.map(url => deleteImageFromStorage(url, token));
    await Promise.all(deletePromises);
}
