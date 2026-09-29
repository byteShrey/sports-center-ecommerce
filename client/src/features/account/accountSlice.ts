import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { authApi } from '../../api/authApi';
import type { AuthUser, LoginRequest } from '../../models/auth';
import type { AppThunk, RootState } from '../../app/store';
import { authStorage } from '../../utils/authStorage';

interface AccountState {
  user: AuthUser | null;
  signingIn: boolean;
  error: string | null;
}

const initialState: AccountState = {
  user: authStorage.get(),
  signingIn: false,
  error: null,
};

export const signIn = createAsyncThunk<AuthUser, LoginRequest, { rejectValue: string }>(
  'account/signIn',
  async (request, { rejectWithValue }) => {
    try {
      const user = await authApi.login(request);
      authStorage.save(user);
      return user;
    } catch (error) {
      const invalid = axios.isAxiosError(error) && error.response?.status === 401;
      return rejectWithValue(invalid ? 'Invalid username or password' : 'Sign in failed. Is the API running?');
    }
  },
);

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    signedOut(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.signingIn = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.signingIn = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.signingIn = false;
        state.error = action.payload ?? 'Sign in failed';
      });
  },
});

const { signedOut } = accountSlice.actions;

export const signOut = (): AppThunk => (dispatch) => {
  authStorage.clear();
  dispatch(signedOut());
};

export const validateSession = createAsyncThunk<void, void, { state: RootState }>(
  'account/validateSession',
  async (_, { getState, dispatch }) => {
    if (!getState().account.user) return;
    try {
      await authApi.currentUser();
    } catch (error) {
      // Only an explicit 401 means the token is expired; keep the session through network hiccups.
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        dispatch(signOut());
      }
    }
  },
);

export const accountReducer = accountSlice.reducer;
