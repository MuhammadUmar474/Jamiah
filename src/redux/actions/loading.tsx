import {CLEAR_LOADING_STATE, IS_LOADING} from '../types/types';

export const loadingAction = () => async (dispatch: any) => {
  dispatch({
    type: IS_LOADING,
    payload: {isLoading: true},
  });
};

export const clearLoadingAction = () => (dispatch: any) => {
  dispatch({
    type: CLEAR_LOADING_STATE,
  });
};
