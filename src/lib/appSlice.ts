import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    // Можно ли брать в слайсе из локал стораджа (ПРоблема с SSR) !!localStorage.getItem(AUTH_TOKEN)
    isAuth: false,
    error: null as string | null,
  },
  selectors: {
    selectIsAuth: state => state.isAuth,
    selectAppError: state => state.error,
  },
  reducers: creators => ({
    setIsAuth: creators.reducer<{ isAuth: boolean }>((state, action) => {
      state.isAuth = action.payload.isAuth
    }),
    setAppError: creators.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
  }),
})

export const appReducer = appSlice.reducer
export const { selectIsAuth, selectAppError } = appSlice.selectors
export const { setIsAuth, setAppError } = appSlice.actions
