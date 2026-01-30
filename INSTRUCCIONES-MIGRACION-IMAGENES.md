# Instrucciones para Migración de Múltiples Imágenes

## Contexto
Se ha implementado soporte para múltiples imágenes por producto (hasta 5 imágenes). Las imágenes ahora se almacenan en **Supabase Storage** en lugar de base64, lo cual mejora significativamente el rendimiento.

## ⚠️ IMPORTANTE: Configurar Supabase Storage Primero
**Antes de continuar**, debes configurar el bucket de imágenes en Supabase Storage. Consulta el archivo [`CONFIGURACION-SUPABASE-STORAGE.md`](./CONFIGURACION-SUPABASE-STORAGE.md) para instrucciones detalladas.

## Pasos para la Migración

### 1. Acceder al SQL Editor de Supabase
1. Ingresar a [Supabase](https://supabase.com)
2. Seleccionar tu proyecto
3. Ir a **SQL Editor** en el menú lateral izquierdo

### 2. Ejecutar el Script de Migración
1. Crear una nueva query
2. Copiar y pegar el contenido del archivo `supabase-migration-images.sql`
3. Hacer clic en **Run** para ejecutar el script

### 3. Verificar la Migración
El script incluye una consulta de verificación al final que mostrará los primeros 5 productos con sus imágenes. Verifica que:
- La columna `images` existe
- Los productos existentes tienen su imagen actual en el array `images`

## ¿Qué hace el script?

1. **Agrega la columna `images`**: Crea una nueva columna de tipo array de texto (TEXT[]) en la tabla products
2. **Migra datos existentes**: Copia la imagen actual de cada producto al nuevo array
3. **Verifica la migración**: Muestra los primeros 5 productos para confirmar que todo funcionó correctamente

## Productos Existentes
Los productos que ya tienes en la base de datos:
- Mantendrán su imagen actual en el campo `image`
- Tendrán esa misma imagen como primer elemento en el array `images`
- Podrás editarlos en el panel admin para agregar más imágenes

## Nuevos Productos
Los nuevos productos que se creen desde el panel admin:
- Requerirán al menos 1 imagen
- Podrán tener hasta 5 imágenes
- La primera imagen del array será la imagen principal

## Soporte
Si encuentras algún error durante la migración, verifica:
1. Que tienes permisos de administrador en Supabase
2. Que la tabla `products` existe
3. Que no hay errores de sintaxis en el script SQL

## Rollback (opcional)
Si necesitas revertir los cambios:

```sql
-- Eliminar la columna images
ALTER TABLE products DROP COLUMN IF EXISTS images;
```

⚠️ **Advertencia**: Solo ejecuta el rollback si realmente necesitas revertir los cambios, ya que perderás todas las imágenes adicionales que hayas agregado.
