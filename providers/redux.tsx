'use client'

import { store, persistor } from '@/state/redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { CircularProgress, Box } from '@mui/material'

type Props = {
    children: React.ReactNode
}

const ReduxProvider = ({ children }: Props) => {
    return (
        <Provider store={store}>
            <PersistGate
                loading={
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                        <CircularProgress />
                    </Box>
                }
                persistor={persistor}
            >
                {children}
            </PersistGate>
        </Provider>
    )
}

export default ReduxProvider