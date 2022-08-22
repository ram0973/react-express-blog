import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios/axios";

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (params) => {
    const {data} = await axios.post('/auth/login', params);
    return data;
  }
)

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (params) => {
    const {data} = await axios.post('/auth/register', params);
    return data;
  }
)

export const fetchAuthMe = createAsyncThunk(
  'auth/fetchAuthMe',
  async (params) => {
    const {data} = await axios.get('/auth/me', params);
    return data;
  }
)

const initialState = {
  data: null,
  status: 'loading'
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
    }
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchLogin.rejected]: (state) => {
      state.posts.items = null;
      state.posts.status = 'error';
    },
    [fetchAuthMe.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
    [fetchRegister.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchRegister.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
  }
});

export const selectIsAuth = state => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions;
