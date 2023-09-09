import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import userSlice from '../entity/user/userSlice';
import userPostSlice from '../entity/user-post/userPostSlice';
import postSlice from '../entity/post/postSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    userPost: userPostSlice.reducer,
    post: postSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
