import { createSlice } from '@reduxjs/toolkit';

const initialLogin = JSON.parse(sessionStorage.getItem('')) || { 
    isAuth: false,
    isAdmin: false,
    user: undefined,
  }

  
export const authSlice = createSlice({
    name: 'auth',
    initialState: initialLogin,
    reducers: {
       onLogin: (state, action) => {
        state.isAuth=true;
        state.isAdmin= action.payload.isAdmin;
        state.user= action.payload.user;
       },

       onLogout: (state, action) => {
        state.isAuth= false;
        state.isAdmin= null;
        state.user= undefined;
       },
    }
});


// Action creators are generated for each case reducer function
export const { onLogin, onLogout } = authSlice.actions;