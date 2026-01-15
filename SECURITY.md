# 🔐 Guía de Seguridad - Magu Cerámica

## 📋 Resumen

Este documento describe todas las medidas de seguridad implementadas para proteger las credenciales sensibles y prevenir la exposición de variables de entorno al frontend.

---

## ✅ Estado de Seguridad

**Nivel de Seguridad**: ✅ **Máximo**

Todas las variables sensibles están protegidas y NO se exponen al cliente.

---

## 🔑 Variables de Entorno

### Variables Públicas (Frontend) ✅

Estas variables tienen el prefijo `NEXT_PUBLIC_` y son **seguras para exponer** al cliente:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://tuproyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

**Ubicación**: Accesibles en `process.env` tanto en servidor como cliente
**Riesgo**: ✅ Ninguno - diseñadas para ser públicas
**Uso**: Cliente de Supabase en frontend con RLS activado

---

### Variables Privadas (Backend) ⚠️

Estas variables **NO tienen prefijo** y son **SOLO para el servidor**:

```bash
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

**Ubicación**: Accesibles SOLO en API routes del servidor
**Riesgo**: 🚨 **CRÍTICO** si se exponen - acceso completo a la BD
**Uso**: API routes con permisos de administrador

---

## 🛡️ Capas de Seguridad Implementadas

### 1. **Validador de Variables de Entorno**

**Archivo**: [utils/env-validator.ts](utils/env-validator.ts)

Funciones de seguridad:

#### `getPublicEnvVars()`
```typescript
// ✅ Seguro usar en cliente
const { supabaseUrl, supabaseAnonKey } = getPublicEnvVars();
```
- Retorna solo variables públicas
- Valida que existan
- Puede usarse en componentes 'use client'

#### `getServerEnvVars()`
```typescript
// ⚠️ SOLO usar en servidor
const { supabaseServiceRoleKey } = getServerEnvVars();
```
- Retorna variables privadas
- **Lanza error si se usa en el cliente**
- Solo para API routes

#### `verifyEnvSecurity()`
```typescript
// Verifica que variables sensibles no tengan prefijo público
verifyEnvSecurity();
```
- Previene errores de configuración
- Detecta violaciones de seguridad
- Se ejecuta en tiempo de compilación

---

### 2. **Cliente de Supabase Seguro**

**Archivo**: [utils/supabase.ts](utils/supabase.ts)

#### Cliente Servidor (Privado)
```typescript
import { supabase } from '@/utils/supabase';  // ⚠️ SOLO en API routes

// Usa SERVICE_ROLE_KEY
// Bypasea Row Level Security
// Acceso completo a la BD
```

**IMPORTANTE**: Este cliente **NUNCA debe importarse** en componentes 'use client'

#### Cliente Público (Seguro)
```typescript
import { createSupabaseClient } from '@/utils/supabase';  // ✅ Seguro en cliente

const supabase = createSupabaseClient();

// Usa ANON_KEY
// Respeta Row Level Security
// Seguro para frontend
```

---

### 3. **Protección en .gitignore**

**Archivo**: `.gitignore`

```gitignore
# env files (can opt-in for committing if needed)
.env*
```

✅ **Verificado**: Todos los archivos `.env*` están excluidos del control de versiones

**IMPORTANTE**: NUNCA commits archivos `.env` al repositorio

---

## 📊 Análisis de Seguridad

### ✅ Variables Seguras (No Expuestas al Cliente)

| Variable | Ubicación | Estado |
|----------|-----------|--------|
| `SUPABASE_SERVICE_ROLE_KEY` | Solo servidor | ✅ Protegida |
| Tokens de sesión | localStorage (cifrados) | ✅ Aislados |
| Contraseñas | Hasheadas en BD | ✅ Nunca en código |

### ✅ Archivos Verificados

| Archivo | Importa Variables Privadas | Estado |
|---------|----------------------------|--------|
| `app/api/auth/login/route.ts` | ✅ Sí (servidor) | ✅ Seguro |
| `app/api/products/route.ts` | ✅ Sí (servidor) | ✅ Seguro |
| `app/api/config/route.ts` | ✅ Sí (servidor) | ✅ Seguro |
| `utils/supabase.ts` | ✅ Sí (servidor) | ✅ Seguro |
| Componentes de cliente | ❌ No | ✅ Seguro |

### ✅ Verificación de Importaciones

```bash
# Variables privadas SOLO en API routes
grep -r "SUPABASE_SERVICE_ROLE_KEY" app/
# Resultado: Solo en app/api/* ✅

# No hay imports del cliente admin en frontend
grep -r "import.*supabase.*from.*utils/supabase" app/
# Resultado: Solo en app/api/* ✅
```

---

## 🚨 Reglas Críticas de Seguridad

### ❌ NUNCA HACER

1. **NO agregar prefijo `NEXT_PUBLIC_` a variables sensibles**
   ```bash
   # ❌ INCORRECTO - Expondrías la clave al cliente
   NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=...
   ```

2. **NO importar `supabase` (cliente admin) en componentes**
   ```typescript
   // ❌ INCORRECTO - En componente 'use client'
   import { supabase } from '@/utils/supabase';
   ```

3. **NO hacer console.log de variables sensibles**
   ```typescript
   // ❌ INCORRECTO
   console.log(process.env.SUPABASE_SERVICE_ROLE_KEY);
   ```

4. **NO commits archivos .env al repositorio**
   ```bash
   # ❌ INCORRECTO
   git add .env.local
   ```

5. **NO hardcodear credenciales en el código**
   ```typescript
   // ❌ INCORRECTO
   const apiKey = "sk_live_1234567890";
   ```

---

### ✅ SIEMPRE HACER

1. **Usar el validador de entorno**
   ```typescript
   // ✅ CORRECTO - En servidor
   import { getServerEnvVars } from '@/utils/env-validator';
   const { supabaseServiceRoleKey } = getServerEnvVars();
   ```

2. **Usar cliente público en el frontend**
   ```typescript
   // ✅ CORRECTO - En cliente
   import { createSupabaseClient } from '@/utils/supabase';
   const supabase = createSupabaseClient();
   ```

3. **Enmascarar valores en logs**
   ```typescript
   // ✅ CORRECTO
   import { maskSensitiveValue } from '@/utils/env-validator';
   console.log('Token:', maskSensitiveValue(token));
   ```

4. **Verificar .gitignore**
   ```bash
   # ✅ CORRECTO - Verificar antes de commit
   cat .gitignore | grep .env
   ```

5. **Usar variables de entorno**
   ```typescript
   // ✅ CORRECTO
   const apiKey = process.env.API_KEY;
   ```

---

## 🔍 Verificación de Seguridad

### Checklist de Seguridad

- [x] `.env*` en `.gitignore`
- [x] Variables privadas sin prefijo `NEXT_PUBLIC_`
- [x] Validador de entorno implementado
- [x] Cliente Supabase solo en API routes
- [x] No imports de variables privadas en cliente
- [x] Funciones de enmascaramiento para logs
- [x] Documentación de seguridad completa

### Comandos de Verificación

```bash
# 1. Verificar que .env* está ignorado
cat .gitignore | grep -E "^\.env"

# 2. Buscar importaciones peligrosas
grep -r "process.env.SUPABASE_SERVICE_ROLE_KEY" app/
# Debe mostrar SOLO archivos en app/api/*

# 3. Verificar imports del cliente admin
grep -r "import.*supabase.*from.*@/utils/supabase" app/
# Debe mostrar SOLO archivos en app/api/*

# 4. Compilar y verificar bundle
npm run build
# Buscar en .next/static/* que no haya credenciales
```

---

## 🎯 Arquitectura de Seguridad

```
┌─────────────────────────────────────────────┐
│           CLIENTE (BROWSER)                 │
├─────────────────────────────────────────────┤
│                                             │
│  ✅ NEXT_PUBLIC_SUPABASE_URL               │
│  ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY          │
│                                             │
│  ✅ createSupabaseClient()                 │
│     - Respeta RLS                           │
│     - Acceso limitado                       │
│                                             │
└──────────────────┬──────────────────────────┘
                   │ HTTP Requests
                   ▼
┌─────────────────────────────────────────────┐
│        SERVIDOR (API ROUTES)                │
├─────────────────────────────────────────────┤
│                                             │
│  ⚠️  SUPABASE_SERVICE_ROLE_KEY             │
│     (NO expuesta al cliente)                │
│                                             │
│  ⚠️  supabase (cliente admin)              │
│     - Bypasea RLS                           │
│     - Acceso completo                       │
│                                             │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│           SUPABASE DATABASE                 │
└─────────────────────────────────────────────┘
```

---

## 📚 Recursos de Seguridad

### Documentación Oficial
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

### Mejores Prácticas
1. **Principio de mínimo privilegio**: Solo dar acceso necesario
2. **Defense in depth**: Múltiples capas de seguridad
3. **Fail secure**: Si hay error, denegar acceso
4. **Audit logging**: Registrar accesos sensibles

---

## 🚀 En Producción

### Variables de Entorno en Vercel/Netlify

```bash
# En el dashboard de tu proveedor:

# ✅ Environment variables
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# ⚠️ IMPORTANTE:
# - Marcar SUPABASE_SERVICE_ROLE_KEY como "secret"
# - No exponer en logs
# - Rotar periódicamente
```

### Auditorías Recomendadas

1. **Mensual**: Revisar permisos de RLS en Supabase
2. **Trimestral**: Auditoría de código con herramientas SAST
3. **Semestral**: Penetration testing
4. **Anual**: Rotación de credenciales

---

## ✅ Conclusión

**Estado de Seguridad**: ✅ **MÁXIMO**

El proyecto Magu Cerámica implementa múltiples capas de seguridad para proteger las credenciales sensibles:

1. ✅ Validador de variables de entorno
2. ✅ Clientes de Supabase separados (público/privado)
3. ✅ Protección en .gitignore
4. ✅ Documentación completa
5. ✅ Verificaciones automáticas

**Las variables sensibles NUNCA se exponen al frontend.** 🔒

---

**Última actualización**: 2026-01-14
**Responsable de seguridad**: Equipo de desarrollo
