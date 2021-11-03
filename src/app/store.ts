import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/login/loginSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>