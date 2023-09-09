import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URL} from '../../shared/config/authConfig';
import {apiInstance} from '../../shared/helper/baseApi';
import Post from './model';
import {addPostToStorage} from './postManager';

type Status = 'idle' | 'pending' | 'succeeded' | 'failed';

type PostState = {
  total: number;
  page: number;
  limit: number;
  tag: string;
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
  tag: '',
  listPost: [],
  selectedPost: {} as Post,
  statusList: 'idle',
  statusDetail: 'idle',
  errorList: null,
  errorDetail: null,
} as PostState;

export const getAllPost = createAsyncThunk(
  'post/getAllPost',
  async (pageNumber: number) => {
    const response = await apiInstance.get(
      `${API_URL}/post?page=${pageNumber}&limit=20`,
    );
    return response.data;
  },
);

export const getAllPostByTag = createAsyncThunk(
  'post/getAllPostByTag',
  async ({tag, pageNumber}: {tag: string; pageNumber: number}) => {
    const response = await apiInstance.get(
      `${API_URL}/tag/${tag}/post?page=${pageNumber}&limit=20`,
    );
    return response.data;
  },
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post>) => {
      const data = action.payload;
      addPostToStorage(data);
      state.listPost = state.listPost.map(post => {
        if (post.id === data.id) {
          post.isLike = data.isLike;
        }
        return post;
      });
    },
    setTag: (state, action) => {
      state.tag = action.payload;
    },
  },
  extraReducers: builder => {
    builder

      // getAllPost
      .addCase(getAllPost.pending, state => {
        state.statusList = 'pending';
      })
      .addCase(getAllPost.fulfilled, (state, action) => {
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
      .addCase(getAllPost.rejected, (state, action) => {
        state.statusList = 'failed';
        state.errorList = action.error.message || 'An error occurred';
      })

      // getAllPostByTag
      .addCase(getAllPostByTag.pending, state => {
        state.statusList = 'pending';
      })
      .addCase(getAllPostByTag.fulfilled, (state, action) => {
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
      .addCase(getAllPostByTag.rejected, (state, action) => {
        state.statusList = 'failed';
        state.errorList = action.error.message || 'An error occurred';
      });
  },
});

export const {
  setPost,
  setTag,
  // , setSearch, cleanSearch
} = postSlice.actions;

export default postSlice;
