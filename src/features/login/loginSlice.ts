import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface LoginState {
  isLoggedIn: boolean
}

const initialState: LoginState = {
  isLoggedIn: false
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    }
  },
})


export const { setLogin } = loginSlice.actions

export const loginSelector = (state: RootState) => state.login

export default loginSlice.reducer
