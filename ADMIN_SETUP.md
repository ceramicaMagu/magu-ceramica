# Panel de Administración - Magu Cerámica

## 🔐 Sistema de Autenticación y Administración

Este proyecto incluye un sistema completo de autenticación y panel de administración protegido.

## 📋 Características Implementadas

### Seguridad
- ✅ Validación de inputs con Zod (prevención de SQL injection)
- ✅ Sanitización de datos de entrada
- ✅ Autenticación basada en tokens
- ✅ Protección de rutas admin
- ✅ Caracteres peligrosos bloqueados en contraseñas

### Panel de Administración
- ✅ Gestión completa de productos (CRUD)
- ✅ Gestión de configuración del sitio
- ✅ Redes sociales y datos de contacto
- ✅ Vista previa de productos
- ✅ Estados de stock (disponible, bajo stock, sin stock)
- ✅ Productos destacados

## 🚀 Acceso al Sistema

### Credenciales de Prueba (Desarrollo)
```
Email: admin@maguceramica.com
Contraseña: Admin123!
```

### URLs
- **Login**: `/login`
- **Panel Admin**: `/admin` (protegido, requiere autenticación)

## 📁 Estructura de Archivos Creados

```
app/
├── admin/
│   ├── page.tsx                     # Página principal del admin (protegida)
│   ├── classes.ts                   # Estilos del admin
│   └── components/
│       ├── ProductManagement.tsx    # Gestión de productos
│       ├── ProductForm.tsx          # Formulario de productos
│       ├── ConfigManagement.tsx     # Gestión de configuración
│       └── classes.ts               # Estilos de componentes
├── login/
│   ├── page.tsx                     # Página de login
│   └── classes.ts                   # Estilos del login
└── api/
    ├── auth/
    │   └── login/
    │       └── route.ts             # API de autenticación
    ├── products/
    │   └── route.ts                 # API de productos (GET, POST, PUT, DELETE)
    └── config/
        └── route.ts                 # API de configuración (GET, PUT)

types/
├── auth.ts                          # Tipos de autenticación y configuración

state/redux/
├── auth/
│   ├── initialState.ts              # Estado inicial con config del sitio
│   └── index.ts                     # Acciones: setUser, logout, updateSiteConfig
└── shop/
    └── index.ts                     # Acciones: addProduct, updateProduct, deleteProduct
```

## 🔧 Integración con Supabase

### 1. Instalar Supabase
```bash
npm install @supabase/supabase-js
```

### 2. Configurar Variables de Entorno
Crear archivo `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
SUPABASE_SERVICE_ROLE_KEY=tu_clave_de_servicio
```

### 3. Crear Cliente de Supabase
Crear archivo `utils/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 4. Estructura de Base de Datos en Supabase

#### Tabla: `products`
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    price INTEGER NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(featured);
```

#### Tabla: `site_config`
```sql
CREATE TABLE site_config (
    id INTEGER PRIMARY KEY DEFAULT 1,
    social_media JSONB,
    contact JSONB,
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT single_row CHECK (id = 1)
);

-- Insertar configuración inicial
INSERT INTO site_config (id, social_media, contact) VALUES (
    1,
    '{"instagram": "https://instagram.com/maguceramica", "facebook": "https://facebook.com/maguceramica", "whatsapp": "+5491112345678"}',
    '{"email": "contacto@maguceramica.com", "phone": "+54 9 11 1234-5678", "address": "Buenos Aires, Argentina"}'
);
```

#### Autenticación
Supabase ya incluye autenticación. Configurar en el dashboard:
1. Habilitar Email/Password authentication
2. Crear usuario admin en Authentication > Users
3. Asignar rol de admin usando metadata:
```json
{
  "role": "admin"
}
```

### 5. Actualizar API Routes

#### `app/api/auth/login/route.ts`
Reemplazar la sección TODO con:
```typescript
import { supabase } from '@/utils/supabase';

// En la función POST:
const { data, error } = await supabase.auth.signInWithPassword({
    email: sanitizedEmail,
    password: sanitizedPassword,
})

if (error || !data.user) {
    return NextResponse.json(
        { error: 'Credenciales incorrectas' },
        { status: 401 }
    );
}

// Verificar metadata de rol
const userRole = data.user.user_metadata?.role || 'user';

if (userRole !== 'admin') {
    return NextResponse.json(
        { error: 'Acceso no autorizado' },
        { status: 403 }
    );
}

return NextResponse.json({
    success: true,
    user: {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata?.name || 'Admin',
        role: userRole,
    },
    token: data.session.access_token,
});
```

#### `app/api/products/route.ts`
Actualizar cada método (GET, POST, PUT, DELETE):

**GET:**
```typescript
const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

if (error) throw error;

return NextResponse.json({
    success: true,
    products: data,
});
```

**POST:**
```typescript
const { data, error } = await supabase
    .from('products')
    .insert([validation.data])
    .select()
    .single();

if (error) throw error;

return NextResponse.json({
    success: true,
    product: data,
});
```

**PUT:**
```typescript
const { data, error } = await supabase
    .from('products')
    .update(validation.data)
    .eq('id', validation.data.id)
    .select()
    .single();

if (error) throw error;

return NextResponse.json({
    success: true,
    product: data,
});
```

**DELETE:**
```typescript
const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

if (error) throw error;

return NextResponse.json({
    success: true,
    id: parseInt(id),
});
```

#### `app/api/config/route.ts`
**GET:**
```typescript
const { data, error } = await supabase
    .from('site_config')
    .select('*')
    .single();

if (error) throw error;

return NextResponse.json({
    success: true,
    config: data,
});
```

**PUT:**
```typescript
const { data, error } = await supabase
    .from('site_config')
    .update({
        social_media: validation.data.socialMedia,
        contact: validation.data.contact,
        updated_at: new Date().toISOString(),
    })
    .eq('id', 1)
    .select()
    .single();

if (error) throw error;

return NextResponse.json({
    success: true,
    config: data,
});
```

### 6. Cargar Datos desde Supabase al Iniciar

Crear hook para cargar productos y configuración:

**`hooks/useInitialData.ts`:**
```typescript
import { useEffect } from 'react';
import { useAppDispatch } from '@/state/redux/store';
import { setProducts } from '@/state/redux/shop';
import { updateSiteConfig } from '@/state/redux/auth';

export const useInitialData = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const loadData = async () => {
            try {
                // Cargar productos
                const productsRes = await fetch('/api/products');
                const productsData = await productsRes.json();
                if (productsData.products) {
                    dispatch(setProducts(productsData.products));
                }

                // Cargar configuración
                const configRes = await fetch('/api/config');
                const configData = await configRes.json();
                if (configData.config) {
                    dispatch(updateSiteConfig({
                        socialMedia: configData.config.social_media,
                        contact: configData.config.contact,
                    }));
                }
            } catch (error) {
                console.error('Error cargando datos:', error);
            }
        };

        loadData();
    }, [dispatch]);
};
```

Usar en `app/layout.tsx`:
```typescript
'use client';
import { useInitialData } from '@/hooks/useInitialData';

export default function RootLayout({ children }) {
    useInitialData();

    return (
        // ... resto del layout
    );
}
```

## 🔒 Seguridad Implementada

### Validación de Inputs
- Schema Zod para todos los endpoints
- Validación de formato de email
- Prevención de inyección SQL
- Caracteres peligrosos bloqueados: `'`, `"`, `;`, `--`
- Límites de longitud en campos

### Autenticación
- Tokens en headers Authorization
- Verificación de rol de admin
- Redirección automática si no está autenticado
- Estado persistente en Redux

### Protección de Rutas
- Verificación en cada API endpoint
- Protección client-side en página admin
- No se muestra contenido sin autenticación

## 📝 Notas Importantes

1. **Desarrollo vs Producción**:
   - Actualmente usa credenciales hardcoded para desarrollo
   - En producción, integrar con Supabase siguiendo los pasos arriba

2. **Estado Redux**:
   - Los productos se manejan en `state.shop.products`
   - La autenticación en `state.auth`
   - La configuración en `state.auth.siteConfig`

3. **Persistencia**:
   - Actualmente los cambios solo persisten en Redux (sesión)
   - Con Supabase, se sincronizará con la base de datos

4. **Validación**:
   - Tanto en frontend como backend
   - Mensajes de error específicos para el usuario

## 🧪 Testing

### Probar Login
1. Ir a `/login`
2. Usar credenciales de prueba
3. Debe redirigir a `/admin`

### Probar Gestión de Productos
1. Estar autenticado en `/admin`
2. Pestaña "Gestión de Productos"
3. Probar agregar, editar, ver y eliminar

### Probar Configuración
1. Estar autenticado en `/admin`
2. Pestaña "Configuración"
3. Modificar redes sociales y contacto
4. Guardar cambios

## 🚧 Próximos Pasos

1. Instalar y configurar Supabase
2. Crear las tablas en Supabase
3. Actualizar las API routes con código de Supabase
4. Configurar Row Level Security (RLS) en Supabase
5. Implementar refresh de tokens
6. Agregar upload de imágenes a Supabase Storage
7. Implementar sistema de roles más complejo
