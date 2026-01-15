import { useDispatch } from 'react-redux';
import { refreshStateAuth, refreshStatusAuth } from '@/state/redux/auth';
import { refreshStateShop, refreshStatusShop } from '@/state/redux/shop';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@/state/redux/store';

const useReduxActions = () => {
    const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch()

    const refreshAllStates = () => {
        dispatch(refreshStateAuth())
        dispatch(refreshStateShop())
    }

    const refreshAllStatus = () => {
        dispatch(refreshStatusAuth())
        dispatch(refreshStatusShop())
    }

    return {
        refreshAllStates,
        refreshAllStatus,
    }
};

export default useReduxActions;