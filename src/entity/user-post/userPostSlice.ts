import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URL} from '../../shared/config/authConfig';
import {apiInstance} from '../../shared/helper/baseApi';
import Post from '../post/model';
import {addPostToStorage} from '../post/postManager';

type Status = 'idle' | 'pending' | 'succeeded' | 'failed';

type UserPostState = {
  total: number;
  page: number;
  limit: number;
  search: string;
  listPost: Post[];
  selectedPost: Post;
  statusList: Status;
  statusDetail: Status;
  errorList: string | null;
  errorDetail: string | null;
};

const initialState = {
  total: 0,
  page: 0,
  limit: 0,
  search: '',
  listPost: [],
  selectedPost: {} as Post,
  statusList: 'idle',
  statusDetail: 'idle',
  errorList: null,
  errorDetail: null,
} as UserPostState;

export const getAllUserPost = createAsyncThunk(
  'userPost/getAllUserPost',
  async ({userId, pageNumber}: {userId: string; pageNumber: number}) => {
    const response = await apiInstance.get(
      `${API_URL}/user/${userId}/post?page=${pageNumber}&limit=20`,
    );
    return response.data;
  },
);

const userPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post>) => {
      console.log(action.payload);
      const data = action.payload;
      addPostToStorage(data);
      state.listPost = state.listPost.map(post => {
        if (post.id === data.id) {
          post.isLike = data.isLike;
        }
        return post;
      });
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      const filteredPosts = state.listPost.filter(post =>
        post.text.toLowerCase().includes(action.payload.toLowerCase()),
      );
      state.listPost = filteredPosts;
    },
    cleanSearch: state => {
      state.search = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllUserPost.pending, state => {
        state.statusList = 'pending';
      })
      .addCase(getAllUserPost.fulfilled, (state, action) => {
        state.statusList = 'succeeded';
        const page = action.payload.page;

        if (page > 0) {
          state.listPost = [...state.listPost, ...action.payload.data];
        } else {
          state.listPost = action.payload.data;
        }

        state.page = page;
        state.total = action.payload.total;
        state.limit = action.payload.limit;
      })
      .addCase(getAllUserPost.rejected, (state, action) => {
        state.statusList = 'failed';
        state.errorList = action.error.message || 'An error occurred';
      });
  },
});

export const {setPost, setSearch, cleanSearch} = userPostSlice.actions;

export default userPostSlice;
