# Configuración de Supabase Storage para Imágenes

## Contexto
Las imágenes de productos ahora se almacenan en **Supabase Storage** en lugar de guardarlas como base64 en la base de datos. Esto mejora significativamente el rendimiento y reduce los costos.

## Pasos para Configurar el Storage

### 1. Crear el Bucket de Imágenes

1. Acceder a [Supabase](https://supabase.com)
2. Seleccionar tu proyecto
3. Ir a **Storage** en el menú lateral izquierdo
4. Click en **Create a new bucket**
5. Configurar el bucket:
   - **Name**: `images`
   - **Public bucket**: ✅ **Activar** (para que las imágenes sean públicas)
   - **File size limit**: `5 MB` (opcional, pero recomendado)
   - Click en **Create bucket**

### 2. Configurar las Políticas de Seguridad (RLS)

Por defecto, el bucket es público para lectura pero privado para escritura. Necesitamos permitir que usuarios autenticados suban y eliminen imágenes.

#### 2.1 Política de Lectura (ya configurada al ser público)
✅ Automáticamente configurado al crear el bucket como público

#### 2.2 Política de Subida de Imágenes

1. En la página del bucket, ir a la pestaña **Policies**
2. Click en **New Policy** para la acción **INSERT**
3. Configurar:
   - **Policy name**: `Allow authenticated users to upload images`
   - **Target roles**: `authenticated`
   - **Policy definition**: Usar el editor SQL y pegar:

```sql
(bucket_id = 'images'::text)
```

4. Click en **Review** y luego **Save policy**

#### 2.3 Política de Eliminación de Imágenes

1. Click en **New Policy** para la acción **DELETE**
2. Configurar:
   - **Policy name**: `Allow authenticated users to delete images`
   - **Target roles**: `authenticated`
   - **Policy definition**:

```sql
(bucket_id = 'images'::text)
```

3. Click en **Review** y luego **Save policy**

### 3. Estructura de Carpetas

El sistema creará automáticamente las siguientes carpetas en el bucket:
- `products/` - Imágenes de productos
- `categories/` - Imágenes de categorías (futuro)

No necesitas crear estas carpetas manualmente, se crean automáticamente al subir la primera imagen.

## Verificación

Para verificar que todo funciona correctamente:

1. Ir al panel de administración de tu app
2. Intentar crear un nuevo producto con imágenes
3. Las imágenes deberían:
   - Subirse automáticamente a Supabase Storage
   - Mostrarse correctamente en la vista previa
   - Guardarse como URLs (no base64) en la base de datos

4. Verificar en Supabase Storage:
   - Ir a **Storage** → **images** → **products/**
   - Deberías ver las imágenes subidas con nombres como `1706123456789-abc123.jpg`

## Migración de Imágenes Existentes

Si ya tienes productos con imágenes en base64, necesitas:

1. **Opción 1 - Manual**:
   - Editar cada producto en el panel admin
   - Eliminar la imagen base64
   - Volver a subir la imagen (se guardará en Storage)

2. **Opción 2 - Script** (avanzado):
   - Crear un script que convierta las imágenes base64 existentes
   - Subirlas a Storage
   - Actualizar las URLs en la base de datos

## Ventajas de Usar Supabase Storage

✅ **Rendimiento**: Las imágenes se sirven desde un CDN global
✅ **Escalabilidad**: Soporta millones de imágenes sin problemas
✅ **Optimización**: Puedes transformar imágenes on-demand (redimensionar, formato WebP, etc.)
✅ **Costos**: Más económico que guardar en la base de datos
✅ **Cache**: Las imágenes se cachean automáticamente por 1 año

## Solución de Problemas

### Error: "bucket not found"
- Verifica que el bucket se llame exactamente `images`
- Verifica que el bucket esté creado en el proyecto correcto

### Error: "new row violates row-level security policy"
- Revisa que las políticas RLS estén configuradas correctamente
- Verifica que el usuario esté autenticado (con token válido)

### Las imágenes no se muestran
- Verifica que el bucket sea público
- Verifica que la URL comience con tu proyecto de Supabase
- Revisa la consola del navegador para ver errores CORS

## Configuración Avanzada (Opcional)

### Transformaciones de Imágenes

Supabase permite transformar imágenes on-demand agregando parámetros a la URL:

```
https://[proyecto].supabase.co/storage/v1/render/image/public/images/products/imagen.jpg?width=400&height=300
```

Parámetros disponibles:
- `width`: Ancho deseado
- `height`: Alto deseado
- `quality`: Calidad (1-100)
- `format`: Formato de salida (webp, png, jpeg)

Puedes integrar esto en el frontend para servir imágenes optimizadas.

## Límites y Costos

Revisa los límites de tu plan en [Supabase Pricing](https://supabase.com/pricing):

- **Free Plan**: 1 GB de almacenamiento
- **Pro Plan**: 100 GB incluidos
- **Bandwidth**: Transferencia de datos puede tener cargos adicionales

Para un e-commerce pequeño/mediano, el plan gratuito suele ser suficiente.
