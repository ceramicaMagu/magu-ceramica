import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from './auth'
import shopSlice from './shop'

// Configuración de Redux Persist para auth
const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['user', 'token', 'siteConfig'], // Persistir sesión del admin y configuración
}

// Configuración de Redux Persist para shop
const shopPersistConfig = {
    key: 'shop',
    storage,
    whitelist: ['cart'], // Solo persistir el carrito
}

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authSlice),
    shop: persistReducer(shopPersistConfig, shopSlice),
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector