import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../interfaces/redux';
import store from '../redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
