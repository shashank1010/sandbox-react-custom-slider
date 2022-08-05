import { configureStore  } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'

import sliderReducer from "../features/slider/sliderSlice";

export const store = configureStore({
    reducer: {
        slider: sliderReducer,
    }
})

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types


export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
