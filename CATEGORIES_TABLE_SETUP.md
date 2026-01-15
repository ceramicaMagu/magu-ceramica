# 📋 Configuración de Tabla `categories` en Supabase

## 📝 Descripción

Este documento contiene el script SQL para crear la tabla `categories` en Supabase, necesaria para el sistema de gestión de categorías dinámicas en Magu Cerámica.

---

## 🗄️ Script SQL para Crear la Tabla

Ejecuta el siguiente script en el **SQL Editor** de Supabase:

```sql
-- ==========================================
-- TABLA: categories
-- ==========================================

-- Crear la tabla categories
CREATE TABLE IF NOT EXISTS public.categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    image TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para búsquedas por nombre
CREATE INDEX IF NOT EXISTS idx_categories_name ON public.categories(name);

-- Comentarios de la tabla
COMMENT ON TABLE public.categories IS 'Tabla para almacenar las categorías de productos creadas dinámicamente por el administrador';
COMMENT ON COLUMN public.categories.id IS 'ID único autoincremental';
COMMENT ON COLUMN public.categories.name IS 'Nombre de la categoría (único)';
COMMENT ON COLUMN public.categories.image IS 'URL o base64 de la imagen de la categoría';
COMMENT ON COLUMN public.categories.created_at IS 'Fecha de creación';
COMMENT ON COLUMN public.categories.updated_at IS 'Fecha de última actualización';

-- ==========================================
-- POLÍTICAS RLS (Row Level Security)
-- ==========================================

-- Habilitar RLS en la tabla
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Política: Lectura pública (GET)
-- Cualquiera puede leer las categorías
CREATE POLICY "Lectura pública de categorías"
ON public.categories
FOR SELECT
TO public
USING (true);

-- Política: Inserción solo para administradores (POST)
-- Solo usuarios autenticados con rol admin pueden crear categorías
CREATE POLICY "Solo administradores pueden crear categorías"
ON public.categories
FOR INSERT
TO authenticated
WITH CHECK (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- Política: Actualización solo para administradores (PUT)
-- Solo usuarios autenticados con rol admin pueden actualizar categorías
CREATE POLICY "Solo administradores pueden actualizar categorías"
ON public.categories
FOR UPDATE
TO authenticated
USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
)
WITH CHECK (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- Política: Eliminación solo para administradores (DELETE)
-- Solo usuarios autenticados con rol admin pueden eliminar categorías
CREATE POLICY "Solo administradores pueden eliminar categorías"
ON public.categories
FOR DELETE
TO authenticated
USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- ==========================================
-- FUNCIÓN PARA ACTUALIZAR updated_at
-- ==========================================

-- Crear función para actualizar automáticamente updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON public.categories
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- DATOS INICIALES (OPCIONAL)
-- ==========================================

-- Insertar categorías de ejemplo
-- ⚠️ NOTA: Ajusta las URLs de imágenes según tus necesidades
INSERT INTO public.categories (name, image) VALUES
('Tazas', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400'),
('Platos', 'https://images.unsplash.com/photo-1578843661100-b4e4f9c1d4ad?w=400'),
('Bowls', 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=400'),
('Jarrones', 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400'),
('Sets', 'https://images.unsplash.com/photo-1556228841-c4e03d95f7bc?w=400')
ON CONFLICT (name) DO NOTHING;
```

---

## ✅ Verificación

Después de ejecutar el script, verifica que la tabla se haya creado correctamente:

```sql
-- Verificar estructura de la tabla
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'categories'
ORDER BY ordinal_position;

-- Verificar políticas RLS
SELECT policyname, cmd, qual
FROM pg_policies
WHERE tablename = 'categories';

-- Verificar datos iniciales
SELECT * FROM public.categories ORDER BY name;
```

---

## 🔄 Actualización de Productos

Si ya tienes productos en la base de datos con categorías hardcodeadas, considera ejecutar este script para asegurar consistencia:

```sql
-- Obtener categorías únicas de productos existentes
INSERT INTO public.categories (name, image)
SELECT DISTINCT
    category,
    'https://via.placeholder.com/400' -- Imagen placeholder
FROM public.products
WHERE category NOT IN (SELECT name FROM public.categories)
ON CONFLICT (name) DO NOTHING;
```

---

## 🗑️ Eliminación de la Tabla (Solo si necesitas empezar de cero)

⚠️ **ADVERTENCIA**: Esto eliminará TODOS los datos de categorías

```sql
-- Eliminar trigger primero
DROP TRIGGER IF EXISTS update_categories_updated_at ON public.categories;

-- Eliminar función
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Eliminar tabla
DROP TABLE IF EXISTS public.categories CASCADE;
```

---

## 📊 Estructura de la Tabla

| Columna      | Tipo         | Nullable | Default    | Descripción                              |
|------------- |------------- |--------- |----------- |----------------------------------------- |
| `id`         | BIGSERIAL    | NO       | AUTO       | ID único autoincremental                 |
| `name`       | VARCHAR(255) | NO       | -          | Nombre de la categoría (único)           |
| `image`      | TEXT         | NO       | -          | URL o base64 de la imagen                |
| `created_at` | TIMESTAMPTZ  | NO       | NOW()      | Fecha y hora de creación                 |
| `updated_at` | TIMESTAMPTZ  | NO       | NOW()      | Fecha y hora de última actualización     |

---

## 🔒 Políticas de Seguridad (RLS)

| Operación | Quién puede ejecutarla           | Descripción                                |
|---------- |--------------------------------- |------------------------------------------- |
| SELECT    | Público (cualquiera)             | Cualquiera puede leer las categorías       |
| INSERT    | Admin autenticado                | Solo admins pueden crear categorías        |
| UPDATE    | Admin autenticado                | Solo admins pueden actualizar categorías   |
| DELETE    | Admin autenticado                | Solo admins pueden eliminar categorías     |

---

## 🎯 Endpoints de la API

Los siguientes endpoints están disponibles en la aplicación:

### GET `/api/categories`
- **Descripción**: Obtener todas las categorías
- **Autenticación**: No requerida
- **Respuesta**:
```json
{
  "success": true,
  "categories": [
    {
      "id": 1,
      "name": "Tazas",
      "image": "https://...",
      "created_at": "2026-01-14T10:00:00Z",
      "updated_at": "2026-01-14T10:00:00Z"
    }
  ]
}
```

### POST `/api/categories`
- **Descripción**: Crear nueva categoría
- **Autenticación**: Token de admin requerido
- **Body**:
```json
{
  "name": "Nueva Categoría",
  "image": "https://... o data:image/jpeg;base64,..."
}
```

### PUT `/api/categories`
- **Descripción**: Actualizar categoría existente
- **Autenticación**: Token de admin requerido
- **Body**:
```json
{
  "id": 1,
  "name": "Categoría Actualizada",
  "image": "https://..."
}
```

### DELETE `/api/categories?id=1`
- **Descripción**: Eliminar categoría
- **Autenticación**: Token de admin requerido

---

## 🚀 Uso en el Sistema

### Panel de Administración

1. **Navegar a Categorías**:
   - Iniciar sesión como administrador
   - Ir al Panel de Administración
   - Hacer clic en la pestaña "Gestión de Categorías"

2. **Crear Categoría**:
   - Hacer clic en "Agregar Categoría"
   - Ingresar nombre
   - Subir imagen (se optimiza automáticamente)
   - Guardar

3. **Gestionar Categorías**:
   - Ver, editar o eliminar categorías existentes
   - Buscar categorías por nombre
   - Las categorías se actualizan en tiempo real en toda la aplicación

### Tienda Pública

- Las categorías aparecen automáticamente en los filtros
- Los usuarios pueden filtrar productos por categoría
- Las categorías se muestran como chips clicables

---

## 📝 Notas Importantes

1. **Imágenes**: Las imágenes pueden ser URLs externas o imágenes en base64 (optimizadas automáticamente por la aplicación)

2. **Unicidad**: El nombre de la categoría es único, no se pueden crear dos categorías con el mismo nombre

3. **Eliminación**: Al eliminar una categoría, los productos que la usen pueden quedar sin categoría asignada. Considera actualizar los productos primero

4. **Optimización**: Las imágenes subidas desde el formulario se optimizan automáticamente a máximo 500KB y 1024px

5. **Redux State**: Las categorías se cargan automáticamente en el estado de Redux al montar los componentes

---

## ✅ Checklist de Implementación

- [x] Crear tabla `categories` en Supabase
- [x] Configurar políticas RLS
- [x] Crear API routes (GET, POST, PUT, DELETE)
- [x] Crear Redux slice y thunks
- [x] Crear componente CategoryManagement
- [x] Crear formulario CategoryForm
- [x] Agregar pestaña en panel de admin
- [x] Actualizar filtros en ProductManagement
- [x] Actualizar filtros en Tienda
- [x] Actualizar ProductForm para usar categorías dinámicas
- [ ] **Ejecutar script SQL en Supabase** ⚠️ Pendiente

---

**Última actualización**: 2026-01-14
**Versión**: 1.0.0
