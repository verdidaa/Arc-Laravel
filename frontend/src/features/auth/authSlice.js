import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'arch-system-session';
const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? 'http://127.0.0.1:8000/api';

const emptyDashboard = {
  notices: {
    orders: 'No orders available.',
    products: 'No products available.',
  },
  orders: [],
  products: [],
  profile: null,
  roles: [],
  stats: [],
};

function loadStoredSession() {
  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return null;
    }

    return JSON.parse(storedValue);
  } catch {
    return null;
  }
}

function persistSession(session) {
  if (!session) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        return rejectWithValue(payload.message || 'Invalid email or password.');
      }

      persistSession(payload);

      return payload;
    } catch {
      return rejectWithValue('Unable to reach the authentication server.');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { getState }) => {
    const token = getState().auth.token;

    try {
      if (token) {
        await fetch(`${API_BASE_URL}/logout`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } finally {
      persistSession(null);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    if (!token) {
      return rejectWithValue('Missing authentication token.');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/me`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const payload = await response.json();

      if (!response.ok) {
        persistSession(null);
        return rejectWithValue({
          clearSession: true,
          message: payload.message || 'Unable to load your session.',
        });
      }

      const session = {
        token,
        user: payload.user,
        dashboard: payload.dashboard ?? emptyDashboard,
      };
      persistSession(session);

      return session;
    } catch {
      return rejectWithValue({
        clearSession: false,
        message: 'Unable to reach the authentication server.',
      });
    }
  }
);

const storedSession = loadStoredSession();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    dashboard: storedSession?.dashboard ?? emptyDashboard,
    error: null,
    isAuthenticated: Boolean(storedSession?.token && storedSession?.user),
    status: 'idle',
    token: storedSession?.token ?? null,
    user: storedSession?.user ?? null,
  },
  reducers: {},
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
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.dashboard = action.payload.dashboard ?? emptyDashboard;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload || 'Unable to sign in.';
        state.dashboard = emptyDashboard;
        state.isAuthenticated = false;
        state.status = 'failed';
        state.token = null;
        state.user = null;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.error = null;
        state.isAuthenticated = true;
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.dashboard = action.payload.dashboard ?? emptyDashboard;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.payload?.clearSession ? null : action.payload?.message;
        state.status = 'idle';

        if (action.payload?.clearSession) {
          state.dashboard = emptyDashboard;
          state.isAuthenticated = false;
          state.token = null;
          state.user = null;
        }
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.error = null;
        state.dashboard = emptyDashboard;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.token = null;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.error = null;
        state.dashboard = emptyDashboard;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.token = null;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
