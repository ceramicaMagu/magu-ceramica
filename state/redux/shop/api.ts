import instanceAxios from "@/state/axios/config";
import { Product, Category } from "@/types/shop";

// ==========================================
// PRODUCTS APIs
// ==========================================

export interface ProductsResponse {
    success: boolean;
    products: Product[];
}

export interface ProductResponse {
    success: boolean;
    product: Product;
}

export interface DeleteProductResponse {
    success: boolean;
    id: number;
}

/**
 * Obtener todos los productos
 * GET /api/products
 */
export const getProductsApi = () => {
    return instanceAxios.get<ProductsResponse>("/products");
};

/**
 * Crear producto
 * POST /api/products
 */
export const createProductApi = (product: Omit<Product, "id">, token: string) => {
    return instanceAxios.post<ProductResponse>(
        "/products",
        product,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
};

/**
 * Actualizar producto
 * PUT /api/products
 */
export const updateProductApi = (product: Product, token: string) => {
    return instanceAxios.put<ProductResponse>(
        "/products",
        product,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
};

/**
 * Eliminar producto
 * DELETE /api/products?id={id}
 */
export const deleteProductApi = (id: number, token: string) => {
    return instanceAxios.delete<DeleteProductResponse>(
        `/products?id=${id}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
};

// ==========================================
// CATEGORIES APIs
// ==========================================

export interface CategoriesResponse {
    success: boolean;
    categories: Category[];
}

export interface CategoryResponse {
    success: boolean;
    category: Category;
}

export interface DeleteCategoryResponse {
    success: boolean;
    id: number;
}

/**
 * Obtener todas las categorías
 * GET /api/categories
 */
export const getCategoriesApi = () => {
    return instanceAxios.get<CategoriesResponse>("/categories");
};

/**
 * Crear categoría
 * POST /api/categories
 */
export const createCategoryApi = (category: Omit<Category, "id">, token: string) => {
    return instanceAxios.post<CategoryResponse>(
        "/categories",
        category,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
};

/**
 * Actualizar categoría
 * PUT /api/categories
 */
export const updateCategoryApi = (category: Category, token: string) => {
    return instanceAxios.put<CategoryResponse>(
        "/categories",
        category,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
};

/**
 * Eliminar categoría
 * DELETE /api/categories?id={id}
 */
export const deleteCategoryApi = (id: number, token: string) => {
    return instanceAxios.delete<DeleteCategoryResponse>(
        `/categories?id=${id}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
};
