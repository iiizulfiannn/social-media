import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URL} from '../../shared/config/authConfig';
import {apiInstance} from '../../shared/helper/baseApi';

export interface User {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
  gender?: string;
  email?: string;
  dateOfBirth?: string;
  phone?: string;
  location?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    timezone?: string;
  };
  registerDate?: string;
  updatedDate?: string;
}

type Status = 'idle' | 'pending' | 'succeeded' | 'failed';

type UserState = {
  total: number;
  page: number;
  limit: number;
  listUser: User[];
  selectedUser: User;
  statusList: Status;
  statusDetail: Status;
  errorList: string | null;
  errorDetail: string | null;
};

const initialState = {
  total: 0,
  page: 0,
  limit: 0,
  listUser: [],
  selectedUser: {} as User,
  statusList: 'idle',
  statusDetail: 'idle',
  errorList: null,
  errorDetail: null,
} as UserState;

export const getAllUser = createAsyncThunk(
  'user/getAllUser',
  async (pageNumber: number) => {
    const response = await apiInstance.get(
      `${API_URL}/user?page=${pageNumber}&limit=20`,
    );
    return response.data;
  },
);

export const getUser = createAsyncThunk('user/getUser', async (id: string) => {
  const response = await apiInstance.get(`${API_URL}/user/${id}`);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // user
      .addCase(getAllUser.pending, state => {
        state.statusList = 'pending';
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.statusList = 'succeeded';
        const page = action.payload.page;

        if (page > 0) {
          state.listUser = [...state.listUser, ...action.payload.data];
        } else {
          state.listUser = action.payload.data;
        }

        state.page = page;
        state.total = action.payload.total;
        state.limit = action.payload.limit;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.statusList = 'failed';
        state.errorList = action.error.message || 'An error occurred';
      })

      // user/:id
      .addCase(getUser.pending, state => {
        state.statusDetail = 'pending';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.statusDetail = 'succeeded';
        state.selectedUser = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.statusDetail = 'failed';
        state.errorDetail = action.error.message || 'An error occurred';
      });
  },
});

export const {} = userSlice.actions;

export default userSlice;
