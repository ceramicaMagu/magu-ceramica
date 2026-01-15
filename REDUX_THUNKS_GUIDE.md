# 🔄 Guía de Redux Thunks - Magu Cerámica

## 📋 Arquitectura Implementada

La integración con Supabase sigue la arquitectura estándar de Redux Toolkit:

```
state/redux/
├── auth/
│   ├── api.ts           ← Llamadas HTTP con axios
│   ├── thunk.ts         ← Async thunks (createAsyncThunk)
│   ├── extraReducers.ts ← Manejo de estados pending/fulfilled/rejected
│   ├── index.ts         ← Slice con reducers sincrónicos
│   └── initialState.ts
└── shop/
    ├── api.ts
    ├── thunk.ts
    ├── extraReducers.ts
    ├── index.ts
    └── initialState.ts
```

---

## 🔑 AUTH - Thunks Disponibles

### 1. `loginAsync` - Autenticación

**Uso en componentes:**
```typescript
import { useAppDispatch, useAppSelector } from '@/state/redux/store';
import { loginAsync } from '@/state/redux/auth/thunk';

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const { status } = useAppSelector(state => state.auth);
    const isLoading = status.loginAsync?.loading;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const result = await dispatch(loginAsync({ email, password }));

        if (loginAsync.fulfilled.match(result)) {
            // Login exitoso
            router.push('/admin');
        } else {
            // Login fallido
            const errorMessage = status.loginAsync?.message || 'Error';
            setError(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* ... */}
            <Button disabled={isLoading}>
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
        </form>
    );
};
```

**Estado manejado:**
- `state.auth.user` - Usuario autenticado
- `state.auth.token` - Access token de Supabase
- `state.auth.isAuthenticated` - Booleano
- `state.auth.status.loginAsync` - Estado de la petición

---

### 2. `getSiteConfigAsync` - Obtener Configuración

**Uso:**
```typescript
import { getSiteConfigAsync } from '@/state/redux/auth/thunk';

useEffect(() => {
    dispatch(getSiteConfigAsync());
}, [dispatch]);

const siteConfig = useAppSelector(state => state.auth.siteConfig);
```

**Estado manejado:**
- `state.auth.siteConfig.socialMedia` - Redes sociales
- `state.auth.siteConfig.contact` - Información de contacto

---

### 3. `updateSiteConfigAsync` - Actualizar Configuración

**Uso:**
```typescript
import { updateSiteConfigAsync } from '@/state/redux/auth/thunk';

const ConfigManagement = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);
    const { status } = useAppSelector(state => state.auth);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const config = {
            socialMedia: { instagram, facebook, twitter, whatsapp },
            contact: { email, phone, address }
        };

        const result = await dispatch(updateSiteConfigAsync({ config, token: token! }));

        if (updateSiteConfigAsync.fulfilled.match(result)) {
            alert('Configuración actualizada');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* ... */}
            <Button disabled={status.updateSiteConfigAsync?.loading}>
                {status.updateSiteConfigAsync?.loading ? 'Guardando...' : 'Guardar'}
            </Button>
        </form>
    );
};
```

---

## 🛍️ SHOP - Thunks Disponibles

### 1. `getProductsAsync` - Obtener Productos

**Uso:**
```typescript
import { getProductsAsync } from '@/state/redux/shop/thunk';

useEffect(() => {
    dispatch(getProductsAsync());
}, [dispatch]);

const products = useAppSelector(state => state.shop.products);
const isLoading = useAppSelector(state => state.shop.status.getProductsAsync?.loading);
```

**Estado manejado:**
- `state.shop.products` - Array de productos

---

### 2. `createProductAsync` - Crear Producto

**Uso:**
```typescript
import { createProductAsync } from '@/state/redux/shop/thunk';

const ProductForm = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);
    const { status } = useAppSelector(state => state.shop);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const newProduct = {
            name: formData.name,
            image: formData.image,
            price: formData.price,
            description: formData.description,
            category: formData.category,
            stock: 999,
            featured: formData.featured
        };

        const result = await dispatch(createProductAsync({
            product: newProduct,
            token: token!
        }));

        if (createProductAsync.fulfilled.match(result)) {
            alert('Producto creado exitosamente');
            onClose();
        } else {
            const errorMessage = status.createProductAsync?.message;
            setError(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* ... */}
            <Button disabled={status.createProductAsync?.loading}>
                {status.createProductAsync?.loading ? 'Guardando...' : 'Guardar'}
            </Button>
        </form>
    );
};
```

---

### 3. `updateProductAsync` - Actualizar Producto

**Uso:**
```typescript
import { updateProductAsync } from '@/state/redux/shop/thunk';

const handleUpdate = async () => {
    const updatedProduct = {
        id: product.id,
        name: formData.name,
        image: formData.image,
        price: formData.price,
        description: formData.description,
        category: formData.category,
        stock: 999,
        featured: formData.featured
    };

    const result = await dispatch(updateProductAsync({
        product: updatedProduct,
        token: token!
    }));

    if (updateProductAsync.fulfilled.match(result)) {
        alert('Producto actualizado');
        onClose();
    }
};
```

---

### 4. `deleteProductAsync` - Eliminar Producto

**Uso:**
```typescript
import { deleteProductAsync } from '@/state/redux/shop/thunk';

const handleDelete = async (productId: number) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) {
        return;
    }

    const result = await dispatch(deleteProductAsync({
        id: productId,
        token: token!
    }));

    if (deleteProductAsync.fulfilled.match(result)) {
        alert('Producto eliminado');
    } else {
        alert('Error al eliminar producto');
    }
};
```

---

## 🎯 Patrones de Uso

### 1. Verificar Estado de Loading

```typescript
const { status } = useAppSelector(state => state.auth);
const isLoading = status.loginAsync?.loading || false;

if (isLoading) {
    return <CircularProgress />;
}
```

### 2. Mostrar Mensajes de Error

```typescript
const { status } = useAppSelector(state => state.shop);
const errorMessage = status.createProductAsync?.message;

{status.createProductAsync?.response === 'rejected' && (
    <Alert severity="error">{errorMessage}</Alert>
)}
```

### 3. Mostrar Mensajes de Éxito

```typescript
const { status } = useAppSelector(state => state.shop);

{status.updateProductAsync?.response === 'fulfilled' && (
    <Alert severity="success">
        {status.updateProductAsync.message}
    </Alert>
)}
```

### 4. Deshabilitar Botones Durante Carga

```typescript
<Button
    disabled={status.createProductAsync?.loading}
    onClick={handleSave}
>
    {status.createProductAsync?.loading ? 'Guardando...' : 'Guardar'}
</Button>
```

### 5. Verificar Éxito del Thunk

```typescript
const result = await dispatch(loginAsync({ email, password }));

if (loginAsync.fulfilled.match(result)) {
    // Éxito - navegar o mostrar mensaje
    router.push('/admin');
} else if (loginAsync.rejected.match(result)) {
    // Error - mostrar mensaje de error
    setError('Credenciales incorrectas');
}
```

---

## 📊 Estados de los Thunks

Cada thunk tiene 3 estados:

### 1. **Pending** (Cargando)
```typescript
state.status.loginAsync = {
    response: 'pending',
    message: '',
    loading: true
}
```

### 2. **Fulfilled** (Exitoso)
```typescript
state.status.loginAsync = {
    response: 'fulfilled',
    message: 'Login exitoso',
    loading: false
}
```

### 3. **Rejected** (Error)
```typescript
state.status.loginAsync = {
    response: 'rejected',
    message: 'Credenciales incorrectas',
    loading: false
}
```

---

## 🔧 Ejemplo Completo: Login Component

```typescript
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Box, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/state/redux/store";
import { loginAsync } from "@/state/redux/auth/thunk";

const LoginPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { status } = useAppSelector(state => state.auth);
    const isLoading = status.loginAsync?.loading || false;
    const errorMessage = status.loginAsync?.message || '';

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const result = await dispatch(loginAsync({ email, password }));

        if (loginAsync.fulfilled.match(result)) {
            router.push('/admin');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h4">Iniciar Sesión</Typography>

            {status.loginAsync?.response === 'rejected' && (
                <Alert severity="error">{errorMessage}</Alert>
            )}

            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                disabled={isLoading}
            />

            <TextField
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                disabled={isLoading}
            />

            <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                fullWidth
            >
                {isLoading ? (
                    <>
                        <CircularProgress size={20} sx={{ mr: 1 }} />
                        Iniciando sesión...
                    </>
                ) : (
                    'Iniciar Sesión'
                )}
            </Button>
        </Box>
    );
};

export default LoginPage;
```

---

## 🔧 Ejemplo Completo: Product Management

```typescript
"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/state/redux/store";
import {
    getProductsAsync,
    createProductAsync,
    updateProductAsync,
    deleteProductAsync
} from "@/state/redux/shop/thunk";

const ProductManagement = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.shop.products);
    const token = useAppSelector(state => state.auth.token);
    const { status } = useAppSelector(state => state.shop);

    // Cargar productos al montar
    useEffect(() => {
        dispatch(getProductsAsync());
    }, [dispatch]);

    const handleDelete = async (id: number) => {
        if (!confirm("¿Estás seguro?")) return;

        const result = await dispatch(deleteProductAsync({ id, token: token! }));

        if (deleteProductAsync.fulfilled.match(result)) {
            alert("Producto eliminado");
        }
    };

    if (status.getProductsAsync?.loading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            {products.map(product => (
                <Box key={product.id}>
                    <Typography>{product.name}</Typography>
                    <Button onClick={() => handleDelete(product.id)}>
                        Eliminar
                    </Button>
                </Box>
            ))}
        </Box>
    );
};
```

---

## ✅ Checklist de Migración

Para actualizar un componente existente:

- [ ] Importar el thunk desde `state/redux/[module]/thunk.ts`
- [ ] Reemplazar `fetch` directo por `dispatch(thunkAsync(...))`
- [ ] Usar `status.[thunkName]?.loading` para mostrar loading
- [ ] Verificar `thunkAsync.fulfilled.match(result)` para éxito
- [ ] Mostrar `status.[thunkName]?.message` para errores
- [ ] Eliminar llamadas directas a `/api/*` con fetch

---

## 🎉 Beneficios de esta Arquitectura

1. **Centralización**: Todas las llamadas API en un solo lugar
2. **Reutilización**: Los thunks se pueden usar en cualquier componente
3. **Estado consistente**: Redux maneja todo el estado global
4. **Loading automático**: El estado de carga se maneja en extraReducers
5. **Errores manejados**: Los errores se capturan y guardan en el estado
6. **TypeScript**: Todo tipado con seguridad de tipos
7. **Testing**: Fácil de testear con mock de thunks

---

**¡Listo para usar! 🚀**

Ahora todos los componentes pueden usar los thunks de Redux en lugar de fetch directo.
