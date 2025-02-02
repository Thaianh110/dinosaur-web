import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncAction'
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
    mes: '',
    currentCart: [],
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.current= null;
      state.token = null;
    },
    clearMessage: (state) => {
      state.mes = ''
    },
    updateCart:(state,action) => {
        const {pid,color,quantity} = action.payload
        const updatingCart = JSON.parse(JSON.stringify(state.currentCart))
        state.currentCart = updatingCart.map(el => {
          if(el.color === color && el.product?._id === pid){
            return{...el,quantity}
          }else return el
        })
    },
  },
  // Code logic xử lý async action
  extraReducers: (builder) => {
    builder.addCase(actions.getCurrent.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.current = action.payload;
      state.isLoggedIn= true
      state.currentCart= action.payload.cart
    });

    builder.addCase(actions.getCurrent.rejected, (state, action) => {
      state.isLoading = false;
      state.current = null;
      state.isLoggedIn = false;
      state.token = null;
      state.mes = 'Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại'
    });
  },
});

export const { login,logout,clearMessage,updateCart} = userSlice.actions;
export default userSlice.reducer;
