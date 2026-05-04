import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const seededAccounts = [
  {
    id: 1,
    email: 'admin@northlane.shop',
    password: 'admin123',
    name: 'Olivia',
    role: 'Store Administrator',
    accessLevel: 'admin',
    completion: 12345,
  },
  {
    id: 2,
    email: 'user@northlane.shop',
    password: 'user123',
    name: 'Marco',
    role: 'Customer',
    accessLevel: 'user',
    completion: 64,
  },
];

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    await new Promise((resolve) => {
      window.setTimeout(resolve, 350);
    });

    const normalizedEmail = email.trim().toLowerCase();
    const account = seededAccounts.find(
      (item) =>
        item.email.toLowerCase() === normalizedEmail && item.password === password
    );

    if (!account) {
      return rejectWithValue('Invalid email or password.');
    }

    const user = Object.fromEntries(
      Object.entries(account).filter(([key]) => key !== 'password')
    );
    return user;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    error: null,
    isAuthenticated: false,
    seededAccounts,
    status: 'idle',
    user: null,
  },
  reducers: {
    logoutUser(state) {
      state.error = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = null;
        state.isAuthenticated = true;
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload || 'Unable to sign in.';
        state.isAuthenticated = false;
        state.status = 'failed';
        state.user = null;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
