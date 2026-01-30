-- Migración para agregar soporte de múltiples imágenes a productos
-- Ejecutar en Supabase SQL Editor

-- 1. Agregar columna images (array de strings) a la tabla products
ALTER TABLE products
ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- 2. Migrar datos existentes: copiar la imagen actual al array images
UPDATE products
SET images = ARRAY[image]
WHERE images IS NULL OR array_length(images, 1) IS NULL;

-- Verificar la migración
SELECT id, name, image, images FROM products LIMIT 5;
